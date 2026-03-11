# mirzailhami.github.io

Personal portfolio and blog for Mirza Ilhami, built as a static site and deployed with GitHub Pages.

## Overview

This repository contains:

- A single-page portfolio homepage
- A blog index and per-post HTML pages under `blog/`
- Client-side loading for GitHub repositories, Topcoder stats, and blog post cards
- GitHub Pages deployment via GitHub Actions
- Copilot prompt and instruction files for generating new blog posts in the site format

## Stack

- HTML, CSS, and vanilla JavaScript
- GitHub Pages for hosting
- GitHub Actions for deployment
- GitHub API for repository data
- Topcoder v6 API for profile stats

## Project Structure

```text
.
├── index.html
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── script.js
│   ├── style.css
│   └── ...
├── blog/
│   ├── _POST_TEMPLATE.html
│   ├── index.html
│   └── posts.json
└── .github/
	├── instructions/
	├── prompts/
	└── workflows/
```

## Blog Workflow

Blog posts are managed as static HTML pages and registered in `blog/posts.json`.

When adding a post, update:

1. `blog/{slug}/index.html`
2. `blog/posts.json`
3. `sitemap.xml`

The repository also includes Copilot customization files to generate new posts in the correct structure and voice:

- `.github/instructions/blog-agent.instructions.md`
- `.github/prompts/blog-agent.prompt.md`

## Local Preview

Because this is a static site, you can preview it with any simple HTTP server.

Example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Notes

- The homepage blog section reads from `blog/posts.json`
- GitHub project cards and technology tags are populated client-side
- Topcoder stats are fetched from the public v6 endpoint at runtime
- If external APIs fail, the UI falls back to static placeholder content where available

## Deployment

Changes pushed to the default branch are deployed through GitHub Actions to GitHub Pages.
