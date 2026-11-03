/**
 * Utility to resolve public asset paths correctly across root domains and subpath deployments (e.g. GitHub Pages)
 */
export const assetUrl = (path: string): string => {
  const base = ((import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL || './');
  const cleanPath = path.replace(/^\/+/, '');
  if (base.endsWith('/')) {
    return `${base}${cleanPath}`;
  }
  return `${base}/${cleanPath}`;
};
