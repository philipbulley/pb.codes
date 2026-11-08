const defaultAccent = '#000';

// Each section of the site has its own accent colour
const accents = {
  '/projects': '#2850AD',
  '/about': '#FCCC0A',
  '/contact': '#EE352E',
};

export const getAccentColor = pathname =>
  Object.entries(accents).find(([path]) => pathname.startsWith(path))?.[1] ??
  defaultAccent;
