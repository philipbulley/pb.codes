// Keep in sync with the media queries in the CSS modules
export const breakpoint = {
  sm: 768,
  md: 992,
  lg: 1200,
};

export const minWidth = Object.fromEntries(
  Object.entries(breakpoint).map(([key, px]) => [key, `(min-width: ${px}px)`])
);

export const matches = query => window.matchMedia(query).matches;
