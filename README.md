# Karina Vetlugina — Portfolio

A single-page professional portfolio for **Karina Vetlugina**, an aspiring Business Analyst and Advanced Diploma student in **Computer Programming and Analysis** at George Brown Polytechnic. The site presents personal background, academic credentials, capstone-style projects, work experience, and contact information.

**Live site:** [karinavetlugina.com](https://karinavetlugina.com)

---

## Highlights

- **Responsive layout** with a collapsible navigation menu on smaller viewports.
- **Accessible patterns:** skip link, semantic sections, ARIA where appropriate, and reduced-motion–aware behavior.
- **Academic projects** shown as an interactive stacked “folder” UI (`<details>` / summary) with keyboard support and single-open accordion behavior (opening a folder closes the previous one).
- **Resume & cover letter** access through a styled envelope interaction (hover on desktop, tap on touch).
- **Fixed header** with scroll-direction behavior: hides when scrolling down, returns when scrolling up (disabled when `prefers-reduced-motion` is set or when the mobile menu is open).
- **Open Graph** metadata (`og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:site_name`) for link previews on social apps and messengers.

---

## Tech stack

| Area        | Details |
|------------|---------|
| Markup     | HTML5 (single `index.html`) |
| Styling    | CSS3 with custom properties; no preprocessor |
| Scripting  | Vanilla JavaScript (modular IIFEs in `main.js`) |
| Hosting    | Static files only — suitable for any static host (e.g. Vercel, Netlify, GitHub Pages) |

---

## Repository layout

```
portfolio/
├── index.html      # Full page content and document head (meta, Open Graph)
├── styles.css      # Global styles and component layout
├── main.js         # Nav, envelope (touch), accordion folders, header height, scroll-direction hide, font fallback
├── assets/         # Images (hero, envelope, folders, thank-you)
├── LICENSE         # MIT License (see below)
└── README.md
```

---

## Local development

Open `index.html` directly in a browser, or serve the project root with any static file server:

```bash
cd portfolio
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

---

## Typography

- **[Montserrat](https://fonts.google.com/specimen/Montserrat)** — UI and body text (Google Fonts).
- **[Cedarville Cursive](https://fonts.google.com/specimen/Cedarville+Cursive)** — signature fallback (Google Fonts).
- **[Brittany Signature](https://www.cdnfonts.com/brittany-signature.font)** — primary hero signature (CDNFonts); if it fails to load, a class-based fallback is applied via `main.js`.

---

## License

The **source code** in this repository (HTML, CSS, and JavaScript) is released under the [MIT License](LICENSE).

Copyright © 2026 Karina Vetlugina.

**Portfolio content** (biographical text, résumé-style copy, and original site imagery) is not covered by the MIT License and remains reserved unless stated otherwise. Third-party assets (e.g. fonts from Google Fonts and CDNFonts) follow their respective licenses.
