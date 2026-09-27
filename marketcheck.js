/**
 * marketcheck.js — MarketCheck OEM Incentives API Utility
 * Lease Buddy / Testing Phase
 *
 * Purpose:
 *   Fetch live lease incentive data from MarketCheck's OEM Incentives endpoint
 *   and transform it into the shape the Lease Buddy app needs.
 *
 * Tier: Free — 500 calls/month. No caching. Every call hits the API directly.
 * Use this during testing/validation only.
 *
 * Usage (Node.js):
 *   node marketcheck.js
 *   node marketcheck.js Toyota RAV4 2026 "LE"
 *
 * Usage (as a module):
 *   import { fetchLeaseOffer } from './marketcheck.js';
 *   const offer = await fetchLeaseOffer({ make: 'Toyota', model: 'RAV4', year: 2026 });
 */

const API_KEY = 'mc_live_nWsMnHd2UBpMneMVY9Hww8Lx61tcqYtJ';
const BASE_URL = 'https://api.marketcheck.com/v2/search/car/incentive/oem';

/**
 * Build the query URL from search params.
 * @param {Object} params
 * @param {string} params.make   - e.g. "Toyota"
 * @param {string} params.model  - e.g. "RAV4"
 * @param {number} params.year   - e.g. 2026
 * @param {string} [params.trim] - e.g. "LE" (optional)
 * @param {string} [params.zip]  - e.g. "90210" (optional)
 * @param {number} [params.rows] - Max results, default 10 (API cap)
 * @returns {string} Full URL with query params
 */
function buildUrl({ make, model, year, trim, zip, rows = 10 }) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    make,
    model,
    year,
    rows,
  });

  // Optional filters — only append if provided
  if (trim) params.set('trim', trim);
  if (zip)  params.set('zip', zip);

  return `${BASE_URL}?${params.toString()}`;
}

/**
 * Derive residual percent from dollar amount and MSRP.
 * MarketCheck returns residual_value in USD, not as a %.
 * The app needs a percentage for its calculations.
 *
 * @param {number} residualValue - Buyout price in USD
 * @param {number} msrp          - Vehicle MSRP in USD
 * @returns {number} Residual as a percentage (e.g. 62.4), or null if inputs invalid
 */
function deriveResidualPercent(residualValue, msrp) {
  if (!residualValue || !msrp || msrp === 0) return null;
  return parseFloat(((residualValue / msrp) * 100).toFixed(2));
}

/**
 * Derive money factor from advertised monthly payment.
 * MarketCheck does NOT return money_factor directly.
 * This is an approximation based on the standard lease formula.
 *
 * Formula: MF = (payment - depreciation_per_month) / (msrp + residual_value)
 * where depreciation_per_month = (msrp - residual_value) / term
 *
 * Note: This will differ from the actual bank MF because OEM payments
 * may include rolled-in fees or adjusted cap cost. Treat as an estimate only.
 *
 * @param {number} monthlyPayment - OEM advertised monthly payment
 * @param {number} msrp           - Vehicle MSRP
 * @param {number} residualValue  - Residual (buyout) in USD
 * @param {number} term           - Lease term in months
 * @returns {number} Approximate money factor, or null if inputs invalid
 */
function deriveMoneyFactor(monthlyPayment, msrp, residualValue, term) {
  if (!monthlyPayment || !msrp || !residualValue || !term) return null;
  const depreciationPerMonth = (msrp - residualValue) / term;
  const mf = (monthlyPayment - depreciationPerMonth) / (msrp + residualValue);
  return parseFloat(mf.toFixed(6)); // MF is typically ~0.00100–0.00300
}

/**
 * Extract and normalize the first lease offer from the API response.
 * Returns null if no lease-type incentive is found in the payload.
 *
 * @param {Object[]} listings - Raw API response listings array
 * @param {number} msrpFallback - MSRP to use for % calculations if not in listing
 * @returns {Object|null} Normalized lease offer, or null
 */
function extractFirstLeaseOffer(listings, msrpFallback = null) {
  if (!Array.isArray(listings) || listings.length === 0) return null;

  // Find first result that looks like a lease offer
  // (has residual_value or monthly_payment — API may mix incentive types)
  const leaseOffer = listings.find(item =>
    item.residual_value != null || item.monthly_payment != null
  );

  if (!leaseOffer) return null;

  const msrp = leaseOffer.msrp || msrpFallback;
  const residualValue = leaseOffer.residual_value;
  const monthlyPayment = leaseOffer.monthly_payment;
  const term = leaseOffer.term;

  return {
    // Core lease fields from API
    residual_value:        residualValue,
    monthly_payment:       monthlyPayment,
    down_payment:          leaseOffer.down_payment          ?? null,
    term:                  term                             ?? null,
    mileage_limit:         leaseOffer.mileage_limit         ?? null,
    excess_mileage_charge: leaseOffer.excess_mileage_charge ?? null,
    msrp:                  msrp                             ?? null,

    // Derived fields (not in raw API response)
    residual_percent: deriveResidualPercent(residualValue, msrp),
    money_factor:     deriveMoneyFactor(monthlyPayment, msrp, residualValue, term),

    // Metadata — useful for debugging/logging
    _source: 'marketcheck_oem',
    _raw_listing_id: leaseOffer.id ?? null,
  };
}

/**
 * Main fetch function. Calls the MarketCheck OEM Incentives API
 * and returns the first matching lease offer in normalized form.
 *
 * @param {Object} params
 * @param {string} params.make
 * @param {string} params.model
 * @param {number} params.year
 * @param {string} [params.trim]
 * @param {string} [params.zip]
 * @returns {Promise<Object|null>} Normalized lease offer, or null if none found
 */
async function fetchLeaseOffer(params) {
  const url = buildUrl(params);

  console.log('\n--- MarketCheck OEM Incentives API Call ---');
  console.log('URL:', url.replace(API_KEY, 'mc_live_***REDACTED***'));
  console.log('Params:', { ...params });
  console.log('-------------------------------------------\n');

  let response;
  try {
    response = await fetch(url);
  } catch (err) {
    console.error('Network error calling MarketCheck API:', err.message);
    throw err;
  }

  if (!response.ok) {
    const text = await response.text();
    console.error(`API error ${response.status}:`, text);
    throw new Error(`MarketCheck API returned ${response.status}: ${text}`);
  }

  const data = await response.json();

  // Log the full raw payload for inspection — intentional during testing phase
  console.log('=== RAW API RESPONSE ===');
  console.log(JSON.stringify(data, null, 2));
  console.log('========================\n');

  // MarketCheck v2 returns results in a `listings` array
  // Fallback to other common shapes in case the incentive endpoint differs
  const listings = data.listings ?? data.results ?? data.data ?? data ?? [];

  const offer = extractFirstLeaseOffer(listings);

  if (!offer) {
    console.warn('No lease offer found in response for:', params);
    return null;
  }

  console.log('=== NORMALIZED LEASE OFFER ===');
  console.log(JSON.stringify(offer, null, 2));
  console.log('===============================\n');

  return offer;
}

// ---------------------------------------------------------------------------
// CLI runner — execute directly with: node marketcheck.js [make model year trim]
// ---------------------------------------------------------------------------
const isMain = process.argv[1]?.endsWith('marketcheck.js');

if (isMain) {
  const [,, make = 'Toyota', model = 'RAV4', year = '2026', trim] = process.argv;

  fetchLeaseOffer({ make, model, year: parseInt(year, 10), trim })
    .then(offer => {
      if (!offer) {
        console.log('No lease offer returned.');
        process.exit(0);
      }
      console.log('Done. Offer extracted successfully.');
    })
    .catch(err => {
      console.error('Fatal error:', err.message);
      process.exit(1);
    });
}

// ---------------------------------------------------------------------------
// Exports — for use as a module inside the app
// ---------------------------------------------------------------------------
export { fetchLeaseOffer, deriveResidualPercent, deriveMoneyFactor };
