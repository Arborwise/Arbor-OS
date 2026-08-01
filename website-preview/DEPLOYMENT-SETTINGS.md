# Arborwise Public Website Deployment Settings

Use these exact settings when creating the separate Vercel project.

- Project name: `arborwise-website`
- Git repository: `Arborwise/Arbor-OS`
- Production branch: `website-seo-rebuild`
- Root directory: `website-preview`
- Framework preset: `Other`
- Build command: leave blank
- Output directory: leave blank
- Install command: leave blank

Important:
- Do not connect this project to the ArborOS board domain or board deployment.
- Do not use `main` as the production branch for this website project.
- Keep the preview protected from indexing until the production cutover is approved.
- When the production domain is moved, remove the `X-Robots-Tag: noindex, nofollow` header before launch.
