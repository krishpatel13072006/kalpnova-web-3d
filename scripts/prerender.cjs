const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
const fs = require('fs');

const routes = [
  '/', '/about', '/services', '/products', '/contact', 
  '/insidekalpnova', '/showcase', '/vision', '/pavilion', '/portfolio',
  '/portfolio/8', '/portfolio/9', '/portfolio/10', '/portfolio/12', 
  '/portfolio/13', '/portfolio/14', '/portfolio/15', '/portfolio/16', 
  '/portfolio/17', '/portfolio/18', '/portfolio/19'
];

const CONCURRENCY_LIMIT = 3;

async function renderRoute(browser, route, distPath) {
  const page = await browser.newPage();
  try {
    console.log(`Prerendering: ${route}`);

    // OPTIMIZATION: Block heavy assets (we only need the HTML text for Google SEO)
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const type = request.resourceType();
      const url = request.url();
      if (['image', 'media', 'font'].includes(type) || url.match(/\.(glb|gltf|mp4|webm)$/i)) {
        request.abort();
      } else {
        request.continue();
      }
    });

    // Navigate and just wait for the DOM structure, not all the network requests
    await page.goto(`http://localhost:3000${route}`, {
      waitUntil: 'domcontentloaded',
      timeout: 15000
    }).catch(e => console.warn(`Note: Goto timeout for ${route}`));

    // Wait for React to render something inside #root
    try {
      await page.waitForFunction(() => {
        const root = document.querySelector('#root');
        return root && root.children.length > 0;
      }, { timeout: 10000 });
      
      // Give React 1 more second to settle any immediate state updates
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.warn(`Note: React render timeout on ${route}`);
    }

    const content = await page.content();
    let outputPath = route === '/' 
      ? path.join(distPath, 'index.html') 
      : path.join(distPath, route, 'index.html');

    const dirPath = path.dirname(outputPath);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

    fs.writeFileSync(outputPath, content);
  } finally {
    await page.close();
  }
}

async function prerender() {
  const app = express();
  const distPath = path.join(__dirname, '../dist');
  
  if (!fs.existsSync(distPath)) {
    console.error('Error: dist folder not found. Run npm run build first.');
    process.exit(1);
  }

  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method === 'GET' && req.accepts('html')) {
      res.sendFile(path.join(distPath, 'index.html'));
    } else {
      next();
    }
  });

  const server = app.listen(3000, async () => {
    console.log('Temporary server listening on port 3000');
    const browser = await puppeteer.launch({ 
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    try {
      // Process routes in batches
      for (let i = 0; i < routes.length; i += CONCURRENCY_LIMIT) {
        const batch = routes.slice(i, i + CONCURRENCY_LIMIT);
        console.log(`Processing batch: ${batch.join(', ')}`);
        await Promise.all(batch.map(route => renderRoute(browser, route, distPath)));
      }
    } finally {
      await browser.close();
      server.close(() => {
        console.log('Prerendering complete and server closed.');
        process.exit(0);
      });
    }
  });
}

prerender();
