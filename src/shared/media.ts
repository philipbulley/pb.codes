// Keep in sync with the media queries in the CSS modules
export const breakpoint = {
  sm: 768,
  md: 992,
  lg: 1200,
} as const;

type Breakpoint = keyof typeof breakpoint;

export const minWidth = Object.fromEntries(
  Object.entries(breakpoint).map(([key, px]) => [key, `(min-width: ${px}px)`]),
) as Record<Breakpoint, string>;

export const matches = (query: string) => window.matchMedia(query).matches;
