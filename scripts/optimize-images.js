const sharp = require('sharp');
const { glob } = require('glob');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  console.log('🖼️  Optimizing images with Sharp...');
  
  // Create dist/images directory if it doesn't exist
  const distImagesDir = 'dist/images';
  if (!fs.existsSync(distImagesDir)) {
    fs.mkdirSync(distImagesDir, { recursive: true });
  }

  try {
    // Find all images in src directory
    const imageFiles = await glob('src/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}');
    
    if (imageFiles.length === 0) {
      console.log('No images found to optimize');
      return;
    }

    console.log(`Found ${imageFiles.length} images to optimize`);

    let originalSize = 0;
    let optimizedSize = 0;
    let webpSize = 0;

    // Process each image
    for (const imagePath of imageFiles) {
      const filename = path.basename(imagePath);
      const nameWithoutExt = path.parse(filename).name;
      const ext = path.parse(filename).ext.toLowerCase();
      
      const originalStats = fs.statSync(imagePath);
      originalSize += originalStats.size;
      
      console.log(`  Processing: ${filename} (${(originalStats.size / 1024).toFixed(1)}KB)`);
      
      // Output paths
      const optimizedPath = path.join(distImagesDir, filename);
      const webpPath = path.join(distImagesDir, `${nameWithoutExt}.webp`);
      
      try {
        // Optimize original format (JPEG/PNG)
        if (ext === '.jpg' || ext === '.jpeg') {
          await sharp(imagePath)
            .jpeg({ 
              quality: 85, 
              progressive: true,
              mozjpeg: true // Use mozjpeg encoder if available
            })
            .toFile(optimizedPath);
        } else if (ext === '.png') {
          await sharp(imagePath)
            .png({ 
              quality: 85,
              compressionLevel: 9,
              adaptiveFiltering: true
            })
            .toFile(optimizedPath);
        }
        
        // Create WebP version (always high quality since WebP is very efficient)
        await sharp(imagePath)
          .webp({ 
            quality: 90,
            effort: 6 // Max compression effort
          })
          .toFile(webpPath);
        
        // Calculate sizes
        if (fs.existsSync(optimizedPath)) {
          const optimizedStats = fs.statSync(optimizedPath);
          optimizedSize += optimizedStats.size;
        }
        
        if (fs.existsSync(webpPath)) {
          const webpStats = fs.statSync(webpPath);
          webpSize += webpStats.size;
        }
        
      } catch (error) {
        console.error(`    ❌ Failed to process ${filename}:`, error.message);
      }
    }

    // Calculate and display savings
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    const webpSavings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
    
    const originalMB = (originalSize / 1024 / 1024).toFixed(2);
    const optimizedMB = (optimizedSize / 1024 / 1024).toFixed(2);
    const webpMB = (webpSize / 1024 / 1024).toFixed(2);

    console.log(`\n✅ Image optimization complete!`);
    console.log(`📊 Results:`);
    console.log(`   Original size:     ${originalMB} MB`);
    console.log(`   Optimized JPEG/PNG: ${optimizedMB} MB (${savings}% smaller)`);
    console.log(`   WebP versions:     ${webpMB} MB (${webpSavings}% smaller)`);
    console.log(`   🚀 Total bandwidth saved: ${((originalSize - webpSize) / 1024 / 1024).toFixed(2)} MB per page load!`);

  } catch (error) {
    console.error('❌ Error optimizing images:', error);
    process.exit(1);
  }
}

optimizeImages(); 