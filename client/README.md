# Issues Tracker – Client

Simple steps to run the front-end locally.

## Prerequisites

- Node.js 18+ (or any LTS)  
- npm (ships with Node)
- The API must be running at `http://localhost:5000` (adjust via `VITE_API_BASE_URL` if needed).

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

3. Open the URL shown in your terminal (usually `http://localhost:5173`).

## Environment variables (optional)

Create `.env` if you want to point to a different backend:
```
VITE_API_BASE_URL=http://your-api-url
```

## Useful scripts

- `npm run dev` – start local dev server with HMR
- `npm run build` – compile production bundle
- `npm run preview` – preview the production build locally
- `npm run lint` – run ESLint checks

That’s it! 🎉
