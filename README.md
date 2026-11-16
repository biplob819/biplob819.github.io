# biplob819.github.io

Portfolio of Biplob Chakraborty: product manager, co-founder, builder, and India international in modern pentathlon.
Astro, static, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Add a project from the command line

Every project page uses one format (`src/content.config.ts`). The `portfolio` CLI writes it for you.

```bash
npm install && npm link              # once: puts `portfolio` on your PATH

cd ~/my-new-project
portfolio init                       # writes portfolio.yml + docs/case-study.md into the project repo
# fill them in: tagline, headline number, links, and the case study under the fixed headings
portfolio add .                      # creates or refreshes src/content/projects/<slug>.md in this site
portfolio publish -m "add my-new-project"   # validate, build, commit, push; Pages deploys in ~1 min
```

Other commands:

| Command | What it does |
| --- | --- |
| `portfolio add owner/repo` | Import a public repo without cloning it |
| `portfolio new <slug> --kind product` | A page for something with no repo (a company, a prototype) |
| `portfolio sync` | Refresh every page from its repo (set `PORTFOLIO_REPOS=~` to read local clones) |
| `portfolio list` / `validate` | See every project and its status; check every page against the schema |
| `portfolio cv` | Save the CV Google Doc as `public/cv.pdf` |
| `--dry-run` | Print what would be written, write nothing |

A repo without `portfolio.yml` still imports: the CLI builds an honest "being built in public" page from the README and GitHub description. Once a page exists, re-importing a README never overwrites its hand-edited text; a `portfolio.yml` does, because the repo is then the source of truth.

## Where things live

- `src/site.config.ts`: name, roles, proof lines, ledger numbers, work history, sport, Now. Lines marked `CONFIRM` need sign-off.
- `src/content/projects/*.md`: one page per project (frontmatter = card, body = case study).
- `templates/`: what `portfolio init` writes into a project repo.
- `/llms.txt`: a plain-text version of the site for AI agents.

## Develop

```bash
npm run dev      # http://localhost:4321
npm run check    # validate pages + production build
```
