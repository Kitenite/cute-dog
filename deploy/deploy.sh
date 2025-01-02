bun install --save-text-lockfile
bun run build

cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
cp bun.lock .next/standalone/bun.lock

API_KEY=MY_API_KEY bun run deploy/deploy.ts
