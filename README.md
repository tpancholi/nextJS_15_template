# Next.js Code Evolution

A Next.js project set up for evolving code patterns, structure exploration, and rapid front-end development. Built with Next.js 15, React 19, and modern tooling including TypeScript, Tailwind CSS, Prettier, ESLint, and Husky.

## Project Structure

```
src/
  app/
    favicon.ico      # App icon
    globals.css      # Global styles (typically TailwindCSS)
    layout.tsx       # Root layout
    page.tsx         # Main landing page
public/
  *.svg              # Static assets
```

## Getting Started

Install dependencies (suggested: pnpm):

```bash
pnpm install
```

Start development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm dev`     – Start Next.js in development mode (using Turbopack)
- `pnpm build`   – Build app for production (with Turbopack)
- `pnpm start`   – Start production server
- `pnpm lint`    – Lint all files
- `pnpm lint:fix`– Lint and fix issues
- `pnpm format`  – Formats all supported files in the project
- `pnpm format:check` – Checks for formatting issues without changing files, exiting with an error if any are found.

## Tooling

This project includes:
- **TypeScript** for static typing
- **Tailwind CSS** for utility-first styling
- **Prettier** and plugins for code formatting
- **ESLint** and plugins for linting JS/TS/React/Accessibility/Security
- **Husky** and **lint-staged** for pre-commit enforcement

## Customization & Extensions
- Edit `src/app/page.tsx` to change the main page.
- Add your own components/pages under `src/app/`.
- Place static files/assets in `public/`.
- Adjust styles in `src/app/globals.css`.
- Environment-specific configuration can go in `.env.local`.

## License

Refer [here](./LICENSE)
