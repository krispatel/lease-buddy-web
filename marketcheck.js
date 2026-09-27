/**
 * marketcheck.js — MarketCheck OEM Incentives API Utility
 * Lease Buddy / Testing Phase
 *
 * Purpose:
 *   Fetch live lease incentive data from MarketCheck's OEM Incentives endpoint
 *   and transform it into the shape the Lease Buddy app needs.
 *
 * Tier: Free — 500 calls/month. No caching. Every call hits the API directly.
 *
 * Response shape (confirmed from live API 2026-09-27):
 *   { num_found: N, listings: [{ id, offer: { offer_type, vehicles, amounts, msrp, ... } }] }
 *
 * Usage (Node.js):
 *   node marketcheck.js
 *   node marketcheck.js Toyota RAV4 2026 LE
 *
 * Usage (as a module):
 *   import { fetchLeaseOffer } from './marketcheck.js';
 *   const offer = await fetchLeaseOffer({ make: 'Toyota', model: 'RAV4', year: 2026 });
 */

const API_KEY = 'mc_live_nWsMnHd2UBpMneMVY9Hww8Lx61tcqYtJ';
const BASE_URL = 'https://api.marketcheck.com/v2/search/car/incentive/oem';

/**
 * Build the query URL from search params.
 */
function buildUrl({ make, model, year, trim, zip, rows = 10 }) {
  const params = new URLSearchParams({ api_key: API_KEY, make, model, year, rows });
  if (trim) params.set('trim', trim);
  if (zip)  params.set('zip', zip);
  return `${BASE_URL}?${params.toString()}`;
}

/**
 * Derive residual percent from dollar amount and MSRP.
 * API returns lease_end_purchase_price (USD), app needs a percentage.
 *
 * @returns {number|null} e.g. 76.0 for a $25,456 residual on $33,495 MSRP
 */
function deriveResidualPercent(residualValue, msrp) {
  if (!residualValue || !msrp || msrp === 0) return null;
  return parseFloat(((residualValue / msrp) * 100).toFixed(2));
}

/**
 * Derive money factor from advertised monthly payment.
 * MarketCheck does NOT return money_factor directly.
 * Approximation: MF = (payment - depreciation/month) / (msrp + residual)
 *
 * Note: OEM payments may include rolled-in fees — treat as estimate only.
 * @returns {number|null} e.g. 0.00125
 */
function deriveMoneyFactor(monthlyPayment, msrp, residualValue, term) {
  if (!monthlyPayment || !msrp || !residualValue || !term) return null;
  const depreciationPerMonth = (msrp - residualValue) / term;
  const mf = (monthlyPayment - depreciationPerMonth) / (msrp + residualValue);
  return parseFloat(mf.toFixed(6));
}

/**
 * Extract and normalize the first LEASE offer from the API listings array.
 * Filters on offer_type === 'lease' and pulls fields from the nested offer object.
 *
 * Confirmed field paths (from live API 2026-09-27):
 *   listing.offer.offer_type                  → 'lease'
 *   listing.offer.lease_end_purchase_price     → residual value in USD
 *   listing.offer.amounts[0].monthly           → monthly payment
 *   listing.offer.amounts[0].term              → term in months
 *   listing.offer.msrp                         → MSRP in USD
 *   listing.offer.down_payment                 → down payment
 *   listing.offer.mileage_limit                → miles/year
 *   listing.offer.over_mileage_fee             → $/mile overage charge
 *   listing.offer.due_at_signing               → total due at signing
 *   listing.offer.acquisition_fee              → acquisition fee
 *   listing.offer.net_cap_cost                 → net cap cost
 *   listing.offer.valid_from / valid_through   → offer dates
 *
 * @param {Object[]} listings - Raw listings array from API response
 * @returns {Object|null} Normalized lease offer, or null
 */
function extractFirstLeaseOffer(listings) {
  if (!Array.isArray(listings) || listings.length === 0) return null;

  // Filter to lease-type offers only
  const leaseListing = listings.find(item =>
    item.offer && item.offer.offer_type === 'lease'
  );

  if (!leaseListing) {
    // Fallback: take first listing with any offer if no typed lease found
    const fallback = listings.find(item => item.offer);
    if (!fallback) return null;
    console.warn('[marketcheck] No offer_type=lease found — using first offer as fallback');
    return normalizeOffer(fallback.id, fallback.offer);
  }

  return normalizeOffer(leaseListing.id, leaseListing.offer);
}

/**
 * Normalize a raw offer object into the Lease Buddy shape.
 * @param {string} listingId
 * @param {Object} offer
 * @returns {Object}
 */
function normalizeOffer(listingId, offer) {
  const msrp            = offer.msrp ?? null;
  const residualValue   = offer.lease_end_purchase_price ?? null;
  const firstAmount     = offer.amounts?.[0] ?? {};
  const monthlyPayment  = firstAmount.monthly ?? null;
  const term            = firstAmount.term    ?? null;

  return {
    // Core lease fields
    residual_value:        residualValue,
    monthly_payment:       monthlyPayment,
    down_payment:          offer.down_payment     ?? null,
    term,
    mileage_limit:         offer.mileage_limit    ?? null,
    excess_mileage_charge: offer.over_mileage_fee ?? null,
    msrp,

    // Additional context fields (useful for UI)
    due_at_signing:  offer.due_at_signing  ?? null,
    acquisition_fee: offer.acquisition_fee ?? null,
    net_cap_cost:    offer.net_cap_cost    ?? null,
    valid_from:      offer.valid_from      ?? null,
    valid_through:   offer.valid_through   ?? null,

    // Derived fields
    residual_percent: deriveResidualPercent(residualValue, msrp),
    money_factor:     deriveMoneyFactor(monthlyPayment, msrp, residualValue, term),

    // Metadata
    _source:         'marketcheck_oem',
    _raw_listing_id: listingId ?? null,
    _offer_type:     offer.offer_type ?? null,
  };
}

/**
 * Main fetch function — call the OEM Incentives API and return a normalized lease offer.
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
    console.error('Network error:', err.message);
    throw err;
  }

  if (!response.ok) {
    const text = await response.text();
    console.error(`API error ${response.status}:`, text);
    throw new Error(`MarketCheck API returned ${response.status}: ${text}`);
  }

  const data = await response.json();

  // Log full raw payload — intentional during testing phase
  console.log('=== RAW API RESPONSE ===');
  console.log(JSON.stringify(data, null, 2));
  console.log(`======================== (num_found: ${data.num_found})\n`);

  const listings = data.listings ?? [];
  const offer = extractFirstLeaseOffer(listings);

  if (!offer) {
    console.warn('No lease offer found for:', params);
    return null;
  }

  console.log('=== NORMALIZED LEASE OFFER ===');
  console.log(JSON.stringify(offer, null, 2));
  console.log('===============================\n');

  return offer;
}

// ---------------------------------------------------------------------------
// CLI runner: node marketcheck.js [make] [model] [year] [trim]
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
