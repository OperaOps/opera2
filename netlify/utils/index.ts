// Utility functions
export function createPageUrl(pageName: string): string {
  // Convert camelCase to kebab-case
  const kebabCase = pageName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
  
  return `/${kebabCase}`;
}

