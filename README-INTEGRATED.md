# VR Real Estate — Netlify-ready integrated build

This package keeps the existing VR Real Estates frontend and exposes the existing API router through a Netlify Function.

## Local development

Run `npm install`, then `npm run api` in one terminal and `npm run dev` in another.

## Netlify

The included `netlify.toml` deploys the Vite app from `dist`, deploys `netlify/functions/api.js`, and rewrites `/api/*` to that function.

Required server environment variables are listed in `.env.example`. Never commit `.env` or secret keys.
