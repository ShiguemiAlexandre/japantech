import { createServer } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function prerender() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'warn',
  });

  try {
    const { render } = await vite.ssrLoadModule('/entry-server.tsx');
    const appHtml = render();

    const distIndexPath = path.resolve(__dirname, 'dist/index.html');
    const template = fs.readFileSync(distIndexPath, 'utf-8');

    const html = template.replace(
      `<div id="root"></div>`,
      `<div id="root">${appHtml}</div>`
    );

    fs.writeFileSync(distIndexPath, html);
    console.log('✓ Pre-render: dist/index.html');
  } finally {
    await vite.close();
  }
}

prerender().catch((err) => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
