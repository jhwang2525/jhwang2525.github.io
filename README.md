# Jun Hwang — Portfolio

Personal portfolio for Jun Hwang, Shopify developer and front-end engineer.

**Live site:** https://jhwang2525.github.io/

Built with React 18, Tailwind CSS and react-scroll. Deployed to GitHub Pages.

## Run locally

```bash
npm install
npm start
```

Opens at http://localhost:3000.

## Update content

All text, links, experience and projects live in **`src/data/portfolio.js`**. Edit that file to change anything on the site; the components don't need to be touched.

- **Add a project:** add an object to `projects` with `name`, `category` (`Shopify`, `Full-Stack` or `Front-End`), `description`, `tags`, `code` and optionally `demo` and `image`.
- **Add a screenshot:** put the image in `src/assets/projects/`, import it at the top of `portfolio.js`, and set it as the project's `image`. Client sites without an image (Waycaps, AGA Nature) show a branded cover until a screenshot is added.
- **Resume:** replace `src/assets/resume.pdf`.

## Deploy

```bash
npm run deploy
```

Builds the site and publishes the `build` folder to the `gh-pages` branch.

## Structure

```
src/
  data/portfolio.js      all site content
  components/            Navbar, Home, About, Experience, ShopifyWork, Projects, Contact, Footer
  assets/                avatar, resume, fonts, project screenshots
```
