# INJECT-RESPECT website

A static website for **The INJECT-RESPECT Tool** (version 3.3), an interview guide for clinicians taking a history of injection drug use practices, focusing on infectious and non-infectious harms.

Authors: Edward C. Traver, Sarah A. Schmalzle, Christopher Welsh, and Sarah Kattakuzhy.
The INJECT-RESPECT Tool © 2026 is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).

## What's on the site

- The 13-letter mnemonic, each letter linking to its domain
- The tool's instructions and guidance on setting up the conversation
- The interview guide: every domain shows its Quick interview and Detailed interview questions
- Glossary terms linked from the questions, plus a searchable glossary
- A print layout for the guide, glossary and references
- Authors, license, copyable attribution, references, and the original PDF for download
- Light and dark themes; keyboard and screen-reader friendly
- Google Analytics (tag `G-ZGHD5GY416`) on `index.html` and `404.html`

Each domain has its own anchor for direct links, e.g. `#d-reversal`.

## Files

```
index.html              page structure
404.html                not-found page
site.webmanifest        app/icon metadata
.nojekyll               tells GitHub Pages to serve files as-is
assets/css/styles.css   all styles, including print
assets/js/data.js       all tool content (questions, glossary, references)
assets/js/app.js        rendering and interactions
assets/img/             favicon and app icons (SVG + PNG)
assets/fonts/           Atkinson Hyperlegible Next (SIL Open Font License), self-hosted
assets/INJECT-RESPECT_Tool.pdf   the tool (v3.3); downloads as The_INJECT-RESPECT_Tool_v3.3.pdf
```

## Editing content

All wording lives in `assets/js/data.js`. To highlight a question, change it from a string to an object:

```js
quick: [
  { text: "When was your most recent injection drug use?", priority: true },
  "How frequently do you usually inject drugs?"
]
```

Priority questions display in bold with a small "Priority" marker.

## Deploying on GitHub Pages

1. Create a repository on GitHub (for example `inject-respect`).
2. Upload the contents of this folder to the repository root, including the hidden `.nojekyll` file. From a terminal:
   ```sh
   git init
   git add .
   git commit -m "INJECT-RESPECT website"
   git branch -M main
   git remote add origin https://github.com/USERNAME/inject-respect.git
   git push -u origin main
   ```
3. In the repository, go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
4. After a minute or two the site is live at `https://USERNAME.github.io/inject-respect/`.
5. Optional: in `index.html`, change the `og:image` value to the full URL of `assets/img/icon-512.png` so link previews show the icon.

To use a custom domain, add it under **Settings → Pages → Custom domain** and follow GitHub's DNS instructions.

## Previewing locally

Open `index.html` in a browser, or run a small server from this folder:

```sh
python3 -m http.server 8000
```

then visit http://localhost:8000.

## Updating to a new version of the tool

1. Replace `assets/INJECT-RESPECT_Tool.pdf` with the new PDF, keeping that file name so existing links keep working.
2. Update the wording in `assets/js/data.js`, including `version`.
3. In `index.html`, update the version number in the `download="…"` file names and in the About section.
