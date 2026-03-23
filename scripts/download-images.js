import fetch from 'node-fetch';
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
      const response = await fetch(image.url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const buffer = await response.buffer();
      const filepath = path.join(imageDir, image.filename);
      fs.writeFileSync(filepath, buffer);
      console.log(`[v0] Saved ${image.filename}`);
    } catch (error) {
      console.error(`[v0] Error downloading ${image.filename}:`, error.message);
    }
  }

  console.log('[v0] Image download complete');
}

downloadImages();
