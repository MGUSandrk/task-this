// generate-icons.js
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const INPUT_SVG = 'public/icon.svg';
const OUTPUT_DIR = 'public/';

// Tamaños requeridos por el estándar PWA
const sizes = [192, 512];

async function generateIcons() {
  // Verificar que existe el SVG
  if (!fs.existsSync(INPUT_SVG)) {
    console.error(`❌ Error: No se encontró ${INPUT_SVG}`);
    process.exit(1);
  }

  console.log('⚙️ Generando iconos PWA desde SVG...');

  for (const size of sizes) {
    const outputPath = path.join(OUTPUT_DIR, `pwa-${size}x${size}.png`);
    
    try {
      await sharp(INPUT_SVG)
        .resize(size, size) // Redimensionar
        .png() // Convertir a PNG
        .toFile(outputPath); // Guardar
      
      console.log(`✅ Creado: ${outputPath}`);
    } catch (error) {
      console.error(`❌ Error creando icono de ${size}px:`, error);
    }
  }

  console.log('🎉 ¡Iconos generados con éxito!');
}

generateIcons();