# kirjanpito_mari

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/TeemuSo/kirjanpito_mari-website)

## Quick Deploy

**Option 1: One-click deploy (Easiest)**
1. Click the deploy button above
2. Authorize Netlify to access your GitHub account
3. Site deploys automatically!

**Option 2: Manual setup**
1. Create a Netlify site manually
2. Connect this GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Image Optimization 🖼️

This site includes automatic image optimization that:

- **Compresses JPEG/PNG images** by 40-70% without visible quality loss
- **Creates WebP versions** for modern browsers (even smaller file sizes)
- **Automatically updates HTML** to use optimized images with WebP fallbacks

### How it works:
1. Add images to `src/` directory
2. Reference them normally in HTML: `<img src="your-image.jpg" alt="...">`
3. During build, images are optimized and moved to `dist/images/`
4. HTML is updated to use optimized versions with WebP fallbacks

### Test optimization locally:
```bash
npm run build:local  # Builds and serves optimized site on localhost:8081
```

### Performance benefits:
- **Faster loading times** - Images are 40-70% smaller
- **Better SEO** - Google prefers fast-loading sites
- **Modern format support** - WebP images for browsers that support them
- **Automatic fallbacks** - JPEG/PNG for older browsers

## Project Structure

- `src/` - Source files (edit these)
  - Add images here (they'll be automatically optimized)
- `dist/` - Built files (auto-generated)
  - `dist/images/` - Optimized images with WebP versions
- `scripts/` - Build optimization scripts
- Push to main → auto-deploy via GitHub Actions

---

Built with [FastWebsites](https://github.com/teemuso/fastwebsites)
