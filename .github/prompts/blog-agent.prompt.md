---
agent: 'agent'
description: 'Create a complete new blog post: writes the article, creates the HTML file, updates posts.json and sitemap.xml.'
---

# Create a New Blog Post

## Inputs

- **Title:** ${input:title:e.g. "How I Built a Multi-Agent RAG System with LangChain and Pinecone"}
- **What it's about:** ${input:description:2–3 sentences describing the problem solved and approach taken}
- **Primary technologies:** ${input:technologies:e.g. Claude 3.5 Sonnet, LangChain, AWS Bedrock, FastAPI}
- **Model (writer):** ${input:model:e.g. Claude 3.5 Sonnet, GPT-4o, Gemini 2.0 Flash}
- **Tags (2–4):** ${input:tags:e.g. AI, RAG, LangChain, Python}
- **Publish date:** ${input:date:Leave blank to use today's date}

## Context Files

Read before doing anything else:

- [_POST_TEMPLATE.html](../../blog/_POST_TEMPLATE.html)
- [posts.json](../../blog/posts.json)

## Steps

1. Read `blog/_POST_TEMPLATE.html`. Stop and inform the user if missing.
2. Read `blog/posts.json`. If missing, treat the posts array as empty.
3. Derive slug (lowercase, hyphens, ≤ 60 chars). Append `-2` if conflict. Use today's date if none provided. Estimate read time: `ceil(wordCount / 200)`, minimum 5.
4. Write the article following the voice, structure, and standards in `blog-agent.instructions.md`. Make sure the article uses clear `<h2>` headings so the generated table of contents is useful.
5. Create `blog/{slug}/index.html` — fill every `{{PLACEHOLDER}}` using the placeholder table in `blog-agent.instructions.md`, including `{{REFERENCES_LIST_ITEMS}}` with relevant link items. Scan for any remaining `{{` before saving.
6. Prepend new entry to `blog/posts.json`. Validate JSON before writing.
7. Add `<url>` to `sitemap.xml` before `<!-- ADD NEW POSTS HERE -->` marker if present, otherwise before `</urlset>`. Inform user if file missing.

## Completion Checklist

- ✅ `blog/{slug}/index.html` — no `{{PLACEHOLDER}}` remaining
- ✅ `blog/posts.json` — new entry at index 0, valid JSON
- ✅ `sitemap.xml` — new `<url>` added
- 📖 `https://mirzailhami.com/blog/{slug}/`
