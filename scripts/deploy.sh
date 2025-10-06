#!/usr/bin/env bash
set -e
echo "Running prisma generate and migrate..."
npx prisma generate
if [ -z "$DATABASE_URL" ]; then
  echo "DATABASE_URL not set. Skipping migrate. Seed will not run."
else
  npx prisma migrate deploy
  node prisma/seed.js
fi
echo "Building Next.js..."
npm run build:vercel
echo "Done. You can now start with npm run start:prod or deploy to Vercel."
