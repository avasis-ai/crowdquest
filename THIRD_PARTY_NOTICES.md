# Third-party notices

CrowdQuest uses open-source software. The package lockfiles are the authoritative inventory of direct and transitive dependencies; each package remains subject to its own license.

## Principal frontend dependencies

| Project | License | Project page |
| --- | --- | --- |
| Next.js | MIT | <https://nextjs.org> |
| React | MIT | <https://react.dev> |
| Tailwind CSS | MIT | <https://tailwindcss.com> |
| Radix UI | MIT | <https://radix-ui.com/primitives> |
| Lucide | ISC | <https://lucide.dev> |
| vinext | MIT | <https://github.com/cloudflare/vinext> |
| Cloudflare Vite plugin | MIT | <https://github.com/cloudflare/workers-sdk/tree/main/packages/vite-plugin-cloudflare> |
| class-variance-authority | Apache-2.0 | <https://github.com/joe-bell/cva> |
| clsx | MIT | <https://github.com/lukeed/clsx> |
| tailwind-merge | MIT | <https://github.com/dcastil/tailwind-merge> |

The local primitives under `components/ui/` follow public shadcn/ui conventions and are maintained as source inside this repository. shadcn/ui is MIT licensed: <https://github.com/shadcn-ui/ui>.

## Principal orchestrator dependencies

| Project | License | Project page |
| --- | --- | --- |
| Fastify | MIT | <https://fastify.dev> |
| `@fastify/cors` | MIT | <https://github.com/fastify/fastify-cors> |
| Zod | MIT | <https://zod.dev> |
| node-postgres (`pg`) | MIT | <https://node-postgres.com> |
| TypeScript | Apache-2.0 | <https://www.typescriptlang.org> |

The isolated `tools/txline` activation utility follows TxLINE's official examples and uses Anchor, Solana Web3.js, SPL Token, and TweetNaCl. It is not installed in or shipped with the web or API containers.

## Fonts

The interface uses Geist and Geist Mono through the Next.js font integration. Geist is distributed under the SIL Open Font License 1.1: <https://github.com/vercel/geist-font>.

## Design references

The `/design-system` page credits three public references used for product-design research:

- Paperpillar, “Football Live Score App UI” — <https://dribbble.com/shots/26660059-Football-Live-Score-App-UI>
- Lumio, “Data-driven prediction companion” — <https://dribbble.com/shots/27525997-Lumio-Data-driven-prediction-companion>
- Lebi, “Sports Prediction App” — <https://dribbble.com/shots/25928190-Lebi-Sports-Prediction-App>

Those links are acknowledgements of design influence only. Their artwork is not included in this repository.

## Services and trademarks

TxLINE/TxODDS, Polar, Coinbase, Solana, Superteam, Cloudflare, PostgreSQL, and all other product names are trademarks of their respective owners. Their mention describes an integration boundary or event context and does not imply endorsement.

The local flag SVGs are simple geometric renderings of national flags. The CrowdQuest wordmark, interface layout, copy, and favicon in this repository are locally implemented.
