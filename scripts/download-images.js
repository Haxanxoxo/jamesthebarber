import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
  {
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TzelzmW3jGiCHw3AFj5Ubmh6EcDruc.png',
    filename: 'testimonial-marcus.png'
  },
  {
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rYjZoSveorTcXsw4h8NbQ0zAXmaXAb.png',
    filename: 'testimonial-rebecca.png'
  },
  {
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xPfK5wO6wQwI2w8RZBj6elxUYqrRZj.png',
    filename: 'testimonial-harold.png'
  },
  {
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fZP234mM3iajgD5qF1gvsHhYP7FpAd.png',
    filename: 'testimonial-tommy.png'
  },
  {
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MIJW6hesSBQcbh8wInhAVxhfFCjIPJ.png',
    filename: 'testimonial-kyle.png'
  },
  {
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-F49KcjcyZ2MSWqCX4Mw94bXmxD2XQk.png',
    filename: 'testimonial-derek.png'
  },
  {
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AZqV7MSANC89VZIdPpXtfEmrho1exY.png',
    filename: 'testimonial-andre.png'
  },
  {
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-B1dsy8Ea6TNCcrejDXA46WUzFBEgpy.png',
    filename: 'testimonial-chris.png'
  },
  {
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Tyb4mMUQ6OvBlXOU8U2WEmjOKIvOPo.png',
    filename: 'testimonial-ryan.png'
  },
  {
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OQ4dlgcg2U6WdQYzxHyXjYpADBImYp.png',
    filename: 'testimonial-brian.png'
  }
];

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

async function downloadImages() {
  const imageDir = path.join(__dirname, '../images');
  
  // Create images directory if it doesn't exist
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
    console.log('[v0] Created images directory');
  }

  for (const image of images) {
    try {
      console.log(`[v0] Downloading ${image.filename}...`);
      const filepath = path.join(imageDir, image.filename);
      await downloadImage(image.url, filepath);
      console.log(`[v0] Saved ${image.filename}`);
    } catch (error) {
      console.error(`[v0] Error downloading ${image.filename}:`, error.message);
    }
  }

  console.log('[v0] Image download complete');
}

downloadImages();
