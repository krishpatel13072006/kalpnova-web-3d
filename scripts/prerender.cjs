const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
const fs = require('fs');

const routes = [
  '/', 
  '/about', 
  '/services', 
  '/products', 
  '/contact', 
  '/insidekalpnova', 
  '/showcase', 
  '/vision', 
  '/pavilion', 
  '/portfolio',
  '/portfolio/8',
  '/portfolio/9',
  '/portfolio/10',
  '/portfolio/12',
  '/portfolio/13',
  '/portfolio/14',
  '/portfolio/15',
  '/portfolio/16',
  '/portfolio/17',
  '/portfolio/18',
  '/portfolio/19'
];

async function prerender() {
  const app = express();
  const distPath = path.join(__dirname, '../dist');
  
  if (!fs.existsSync(distPath)) {
    console.error('Error: dist folder not found. Run npm run build first.');
    process.exit(1);
  }

  app.use(express.static(distPath));
  
  // For SPA support during pre-rendering
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
    const page = await browser.newPage();

    for (const route of routes) {
      console.log(`Prerendering: ${route}`);
      
      // Navigate to the route
      await page.goto(`http://localhost:3000${route}`, {
        waitUntil: 'networkidle2',
        timeout: 0 // Disable timeout for CI environments
      });

      // Wait for the custom render trigger event
      try {
        await page.waitForFunction(() => {
          return window.__PRERENDER_READY__ || true; // Fallback to true if we didn't set the flag
        }, { timeout: 5000 });
      } catch (e) {
        console.warn(`Timeout waiting for custom trigger on ${route}, capturing anyway.`);
      }

      const content = await page.content();
      
      // Determine the output path
      let outputPath;
      if (route === '/') {
        outputPath = path.join(distPath, 'index.html');
      } else {
        const dirPath = path.join(distPath, route);
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }
        outputPath = path.join(dirPath, 'index.html');
      }

      fs.writeFileSync(outputPath, content);
    }

    await browser.close();
    server.close(() => {
      console.log('Prerendering complete and server closed.');
      process.exit(0);
    });
  });
}

prerender();
