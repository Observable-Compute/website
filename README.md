# Observable Compute Foundation — Website

Source code for [observablecompute.org](https://observablecompute.org), the public website of Observable Compute Foundation, a South Dakota 501(c)(3) nonprofit advancing independent AI research, rural technology access, and workforce readiness.

## Tech Stack

- **[Eleventy 3](https://www.11ty.dev/)** — static site generator
- **[Nunjucks](https://mozilla.github.io/nunjucks/)** — templating
- **[Tailwind CSS](https://tailwindcss.com/)** — styling (compiled in `docs/assets/css/`)
- **Hosted on [Hostinger](https://www.hostinger.com/)**

## Project Structure

```
src/                  # Eleventy source (templates, data, layouts)
  _data/site.json     # Global site config (name, URL, GTM, etc.)
  _includes/          # Shared layouts: header, footer, layout
  css/                # Source CSS
  js/                 # Source JS
  index.njk           # Homepage
  about/              # About & team pages
  lexicon/            # Terminology database
  framework/          # Framework pages
  reports/            # Reports section
  tools/              # Tools section
  community/          # Community page
  api/                # API page
dist/                 # Build output (eleventy → dist/)
docs/                 # Production static files served by Hostinger
  assets/papers/      # Publication PDFs
  assets/images/      # Site images
  assets/css/         # Compiled Tailwind CSS
```

## Development

> [!WARNING]
> **DO NOT** run `npm run build` and overwrite the `docs/` directory. 
> The templates under `src/` are currently out of sync (they represent the legacy January 2026 Terminology version of the site). The live website is maintained as static files directly under the `docs/` directory. All edits to the live website must be made directly in the `docs/` directory to avoid destroying the live Workforce Readiness layout.

```bash
npm install
npm start          # Local dev server with hot reload
# DO NOT COPY dist/ TO docs/ WITHOUT REWRITING THE src/ TEMPLATES FIRST!
```

## Publications

PDFs are stored in `docs/assets/papers/` (production) and synced to `dist/assets/papers/` (build output). Current publications:

| Paper | File |
|-------|------|
| Workforce Readiness v5.1 | `workforce-readiness-v5.1.pdf` |
| Midwest Workforce Readiness v1.0 | `OCF_Midwest_WorkforceReadiness_v1.0.pdf` |
| SD Workforce Readiness v3.0 | `OCF_SouthDakota_WorkforceReadiness_v3.0.pdf` |
| SD AI Workforce Impact Report v1.0 | `South_Dakota_AI_Workforce_Impact_Report_OCF_v1.0.pdf` |
| Observable Function v3.0 | `observable-function-v3.0.pdf` |
| The Denial Protocol v3.1 | `denial-protocol-v3.1.pdf` |
| RPE Standard | `RPE_Standard_Stratmeyer_2026.pdf` |
| RPE Standard v4.0 | `OCF_RPE_Standard_v4.0.pdf` |
| Helpfulness Is All You Need v2.3 | `helpfulness-is-all-you-need-v2.3.pdf` |
| Knowledge Gradient Framework v2.0 (SSRN) | `ssrn-6285123.pdf` |
| Knowledge Gradient Framework v2.3 | `KGF_v2.3_Stratmeyer_Analytica (2).pdf` |
| OCF Schema v1 | `ocf_schema_v1.pdf` |
| OCF Style Guide v1 | `OCF_StyleGuide_v1.pdf` |

## License

Content is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Contact

- **Web:** [observablecompute.org](https://observablecompute.org)
- **Email:** contact@observablecompute.org
- **Research:** research@observablecompute.org
- **SSRN:** [SSRN Author Profile](https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=6285123)
