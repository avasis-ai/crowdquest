# CrowdQuest domain cutover

Canonical product origin: `https://crowdquest.avasis.ai`.

The `avasis.ai` zone is hosted at GoDaddy. A wildcard CNAME currently sends otherwise-unconfigured subdomains to the Avasis CloudFront marketing distribution, so CrowdQuest requires an explicit record that overrides the wildcard:

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| A | `crowdquest` | `100.31.237.141` | 600 seconds |

Do not change the `*.avasis.ai` wildcard. It serves other product placeholders.

The VPS Caddy configuration must contain the product-specific block from `deploy/host.Caddyfile.example`. Keep `vps.avasis.ai` during migration because its `/kit-api` handler belongs to another Avasis service.

After DNS propagation, verify:

```bash
dig +short crowdquest.avasis.ai A
curl -fsSI https://crowdquest.avasis.ai/
curl -fsS https://crowdquest.avasis.ai/healthz | jq '{status,databaseReady}'
```

The A lookup must return `100.31.237.141`, the public page must include the CrowdQuest Content Security Policy, and health must report `databaseReady: true`.
