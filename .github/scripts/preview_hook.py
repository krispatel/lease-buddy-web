#!/usr/bin/env python3
"""
preview_hook.py

Called by GitHub Actions to provision/teardown previews on PR events.

Usage:
  python3 preview_hook.py provision --project leasebuddy --pr 42
  python3 preview_hook.py teardown  --project leasebuddy --pr 42
  python3 preview_hook.py provision-staging --project leasebuddy

The controller API is the public, token/IP-gated preview-api.kap-marketing.com
endpoint (b2: bearer token + GitHub Actions IP allow-list). This script is the
client that POSTs to the controller's /api/* endpoints.

Auth: the controller may require PREVIEW_CONTROLLER_TOKEN. Pass it via env or
the GitHub secret GH_PREVIEW_TOKEN.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.request

# Controller URL: reachable over the tailnet from the Actions runner (which must
# itself be on the tailnet) OR via a localhost SSH tunnel. Default to the host.
CONTROLLER_URL = os.environ.get(
    "PREVIEW_CONTROLLER_URL",
    "https://preview-api.kap-marketing.com",
)
TOKEN = os.environ.get("PREVIEW_CONTROLLER_TOKEN", os.environ.get("GH_PREVIEW_TOKEN", ""))


def call(path: str, payload: dict) -> dict:
    data = json.dumps(payload).encode()
    req = urllib.request.Request(
        f"{CONTROLLER_URL}{path}",
        data=data,
        method="POST",
        headers={
            "Content-Type": "application/json",
            # A normal browser-ish User-Agent avoids Cloudflare Bot Fight Mode
            # issuing a 1010 JS challenge to the runner's bare urllib client.
            "User-Agent": "Mozilla/5.0 (compatible; GitHub-Actions/1.0; +https://github.com/features/actions)",
        },
    )
    if TOKEN:
        req.add_header("Authorization", f"Bearer {TOKEN}")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        return {"error": f"http {e.code}", "detail": e.read().decode()}


def main():
    p = argparse.ArgumentParser()
    p.add_argument("action", choices=["provision", "teardown", "provision-staging"])
    p.add_argument("--project", required=True)
    p.add_argument("--pr", default="")
    args = p.parse_args()

    if args.action == "provision":
        r = call("/api/provision/preview", {"action": "provision", "project": args.project, "pr": args.pr})
    elif args.action == "teardown":
        r = call("/api/teardown/preview", {"action": "teardown", "project": args.project, "pr": args.pr})
    else:
        r = call("/api/provision/staging", {"action": "provision", "project": args.project})

    print(json.dumps(r))
    # exit non-zero on error so the workflow fails loudly
    if r.get("error"):
        sys.exit(1)


if __name__ == "__main__":
    main()
