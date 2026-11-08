# pb.codes

[![Netlify Status](https://api.netlify.com/api/v1/badges/2b717559-3ea7-4f48-93cc-0898039e45f0/deploy-status)](https://app.netlify.com/sites/pbcodes/deploys)

My portfolio website. It can be viewed at [https://pb.codes](https://pb.codes)

## Stack

[React Router](https://reactrouter.com) in framework mode (on [Vite](https://vite.dev)), with every page pre-rendered to static HTML at build time. Styling is CSS Modules, animation is [Motion](https://motion.dev), and it's all TypeScript.

## Development

Uses the Node version in `.nvmrc`:

```sh
nvm use
npm install
npm run dev
```

| Script            | What it does                             |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Dev server with hot reloading            |
| `npm run build`   | Pre-renders the site into `build/client` |
| `npm run preview` | Serves the production build locally      |
| `npm run check`   | Typechecks, lints and checks formatting  |
| `npm run format`  | Formats everything with Prettier         |

A pre-commit hook lints and formats staged files, and typechecks the project.

While developing, <kbd>⌘</kbd> <kbd>;</kbd> toggles a grid overlay, and <kbd>⌘</kbd> <kbd>'</kbd> tints it to show the active breakpoint.

## Deployment

Netlify builds and deploys the site using the settings in `netlify.toml`, which override any build settings in the Netlify UI.
