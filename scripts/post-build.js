const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

async function postBuild() {
  console.log('🔧 Running post-build optimizations...');
  
  try {
    // Find all HTML files in dist
    const htmlFiles = await glob('dist/**/*.html');
    
    for (const htmlFile of htmlFiles) {
      let content = fs.readFileSync(htmlFile, 'utf8');
      let modified = false;
      
      // Replace image src paths to point to optimized images
      const imageRegex = /<img([^>]*)\ssrc=["']([^"']*\.(jpg|jpeg|png|JPG|JPEG|PNG))["']([^>]*)>/gi;
      
      content = content.replace(imageRegex, (match, beforeSrc, imagePath, extension, afterSrc) => {
        // Extract just the filename from the path
        const filename = path.basename(imagePath);
        
        // Check if optimized version exists
        const optimizedPath = path.join('dist/images', filename);
        const webpPath = path.join('dist/images', filename.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, '.webp'));
        
        if (fs.existsSync(optimizedPath)) {
          modified = true;
          
          // Create picture element with WebP fallback if WebP exists
          if (fs.existsSync(webpPath)) {
            const webpFilename = filename.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, '.webp');
            return `<picture>
  <source srcset="images/${webpFilename}" type="image/webp">
  <img${beforeSrc} src="images/${filename}"${afterSrc}>
</picture>`;
          } else {
            // Just update the src to point to optimized image
            return `<img${beforeSrc} src="images/${filename}"${afterSrc}>`;
          }
        }
        
        return match; // Return original if no optimized version found
      });
      
      if (modified) {
        fs.writeFileSync(htmlFile, content);
        console.log(`   Updated image references in ${path.basename(htmlFile)}`);
      }
    }
    
    // Remove original images from dist that are now in dist/images
    const originalImages = await glob('dist/*.{jpg,jpeg,png,JPG,JPEG,PNG}');
    for (const imagePath of originalImages) {
      const filename = path.basename(imagePath);
      const optimizedPath = path.join('dist/images', filename);
      
      if (fs.existsSync(optimizedPath)) {
        fs.unlinkSync(imagePath);
        console.log(`   Removed original ${filename} (optimized version available)`);
      }
    }
    
    console.log('✅ Post-build optimization complete!');
    
  } catch (error) {
    console.error('❌ Error in post-build:', error);
    process.exit(1);
  }
}

postBuild(); 