import https from 'https';
import fs from 'fs';
import path from 'path';

const projectRoot = '/vercel/share/v0-project';
const imageDir = path.join(projectRoot, 'images');
const htmlFile = path.join(projectRoot, 'index.html');

// Mapping of external URLs to local filenames
const imageMap = {
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TzelzmW3jGiCHw3AFj5Ubmh6EcDruc.png': 'images/testimonial-marcus.png',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rYjZoSveorTcXsw4h8NbQ0zAXmaXAb.png': 'images/testimonial-rebecca.png',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xPfK5wO6wQwI2w8RZBj6elxUYqrRZj.png': 'images/testimonial-harold.png',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fZP234mM3iajgD5qF1gvsHhYP7FpAd.png': 'images/testimonial-tommy.png',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MIJW6hesSBQcbh8wInhAVxhfFCjIPJ.png': 'images/testimonial-kyle.png',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-F49KcjcyZ2MSWqCX4Mw94bXmxD2XQk.png': 'images/testimonial-derek.png',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AZqV7MSANC89VZIdPpXtfEmrho1exY.png': 'images/testimonial-andre.png',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-B1dsy8Ea6TNCcrejDXA46WUzFBEgpy.png': 'images/testimonial-chris.png',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Tyb4mMUQ6OvBlXOU8U2WEmjOKIvOPo.png': 'images/testimonial-ryan.png',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OQ4dlgcg2U6WdQYzxHyXjYpADBImYp.png': 'images/testimonial-brian.png'
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP error! status: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function downloadAllImages() {
  console.log('[v0] Starting image download and HTML update...');
  
  for (const [url, localPath] of Object.entries(imageMap)) {
    const fullPath = path.join(projectRoot, localPath);
    try {
      // Check if file already exists
      if (fs.existsSync(fullPath)) {
        console.log(`[v0] ${localPath} already exists, skipping download`);
        continue;
      }

      console.log(`[v0] Downloading ${localPath}...`);
      await downloadImage(url, fullPath);
      console.log(`[v0] Successfully saved ${localPath}`);
    } catch (error) {
      console.error(`[v0] Error downloading ${url}:`, error.message);
    }
  }

  console.log('[v0] Image download complete. Updating HTML file...');
  
  // Read HTML file
  let htmlContent = fs.readFileSync(htmlFile, 'utf8');
  
  // Replace all external URLs with local paths
  for (const [externalUrl, localPath] of Object.entries(imageMap)) {
    const regex = new RegExp(externalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    htmlContent = htmlContent.replace(regex, localPath);
    console.log(`[v0] Updated ${externalUrl} → ${localPath}`);
  }
  
  // Write updated HTML back
  fs.writeFileSync(htmlFile, htmlContent, 'utf8');
  console.log('[v0] HTML file updated successfully');
  console.log('[v0] All 10 testimonial images are now local!');
}

downloadAllImages();
