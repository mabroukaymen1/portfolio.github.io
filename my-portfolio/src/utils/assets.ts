/**
 * Returns the correct URL for assets in the public directory.
 * Prepends Vite's BASE_URL so paths work correctly on GitHub Pages
 * (where the site is served from a subdirectory like /portfolio.github.io/).
 *
 * Usage: getAssetUrl('image/profile.png') → '/portfolio.github.io/image/profile.png'
 */
export function getAssetUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  // Avoid double slashes: BASE_URL always ends with '/'
  return `${base}${path.startsWith('/') ? path.slice(1) : path}`;
}
