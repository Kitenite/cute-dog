bun install --save-text-lockfile
bun run build

cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
cp bun.lock .next/standalone/bun.lock

API_KEY=XQs9p4UhJn2PPvHdKXM3HP-8C4PcDju2cuaBLshNix4AZ2LA7p61bMVGpU61ekWtCLF bun run deploy/deploy.ts
