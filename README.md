# Karina Vetlugina — Portfolio

Personal portfolio site for an aspiring Business Analyst: education, projects (interactive folder UI), resume/cover links (envelope interaction), and contact.

## Tech stack

- HTML5
- CSS3 (custom properties, no preprocessor)
- Vanilla JavaScript (mobile nav, accordion folders, header height for scroll offset, optional Brittany Signature font fallback)

## Fonts

- [Montserrat](https://fonts.google.com/specimen/Montserrat) & [Cedarville Cursive](https://fonts.google.com/specimen/Cedarville+Cursive) (Google Fonts)
- [Brittany Signature](https://www.cdnfonts.com/brittany-signature.font) (CDNFonts)

## Run locally

Clone or download the project, then open `index.html` in a browser, or serve the folder with any static server, for example:

```bash
cd portfolio
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Structure

```
portfolio/
├── index.html       # single page; Open Graph + theme-color in <head>
├── styles.css
├── main.js
└── assets/          # images referenced from index.html only
```

To reduce weight, recompress PNGs (e.g. [Oxipng](https://github.com/shssoichiro/oxipng)) or lower JPEG quality on `hero-portrait.jpg` (~80–85%).

## License

Content and design © Karina Vetlugina unless otherwise noted.
