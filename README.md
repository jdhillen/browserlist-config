# @jdhillen/browserslist-config

A curated browserslist configuration for optimizing CSS and JavaScript compilation across different browser targets.

## Requirements

- Node.js >= 20.0.0
- Browserslist ^4.22.2

## Installation

1. Install the package:

```bash
npm install -D @jdhillen/browserslist-config-test
```

2. Run the setup command:

```bash
npx setup-browserslist-config
```

This will prompt you to choose between three configuration profiles:

- **Default**: Balanced support for modern and legacy browsers
- **Modern**: Latest versions of modern browsers only
- **Legacy**: Extended support for older browsers

## Manual Configuration

If you prefer to set up manually, add to your `package.json`:

### Default Configuration

```json
{
  "browserslist": [
    "extends @jdhillen/browserslist-config-test"
  ]
}
```

### Modern Configuration

```json
{
  "browserslist": [
    "extends @jdhillen/browserslist-config-test/modern"
  ]
}
```

### Legacy Configuration

```json
{
  "browserslist": [
    "extends @jdhillen/browserslist-config-test/legacy"
  ]
}
```

## Configuration Profiles

### Default Profile

Balanced configuration for modern web applications:

```javascript
[
  "last 2 chrome versions",     // Chrome (~70% market share)
  "last 2 firefox versions",    // Firefox (~5% market share)
  "last 2 safari versions",     // Safari (~15% desktop share)
  "last 2 edge versions",       // Microsoft Edge
  "last 2 opera versions",      // Opera (~2% market share)
  "last 2 ios versions",        // iOS Safari/Chrome
  "last 2 android versions",    // Android browsers
  "last 2 samsung versions",    // Samsung Internet
  "> 0.5%",                    // Browsers with >0.5% global usage
  "not dead",                  // Only maintained browsers
  "not IE 11"                  // No IE11 support
]
```

### Modern Profile

Latest browsers for modern features and smaller bundles:

```javascript
[
  "last 1 chrome version",
  "last 1 firefox version",
  "last 1 safari version",
  "last 1 edge version",
  "defaults"
]
```

### Legacy Profile

Extended support for enterprise environments:

```javascript
[
  "last 4 chrome versions",
  "last 4 firefox versions",
  "last 4 safari versions",
  "last 4 edge versions",
  "last 4 opera versions",
  "firefox esr",              // Enterprise support
  "maintained node versions", // Active Node.js versions
  "> 1%",                    // Browsers with >1% usage
  "not dead",
  "not IE 11"
]
```

## Tool Integration

### PostCSS

```javascript
// postcss.config.js
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    autoprefixer
  ]
};
```

### Babel

```javascript
// babel.config.js
export default {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: 3
    }]
  ]
};
```

## Browser Market Share

- Desktop: Chrome (70%), Safari (15%), Firefox (5%)
- Mobile: ~60% of global web traffic
- Edge: Growing since Chromium adoption

## Resources

- [Browserslist Docs](https://github.com/browserslist/browserslist)
- [Can I Use](https://caniuse.com/)
- [Browser Stats](https://gs.statcounter.com/)
