/**
 * The sticky header's sizes, measured from the page rather than copied from
 * header.module.css, so the CSS stays the one place they're set (in any
 * units: computed values come back in px).
 */

/** Marks the sticky header so other code can find and measure it */
export const STICKY_HEADER_ATTRIBUTE = 'data-sticky-header';

export interface HeaderSize {
  /** Full height, before it collapses */
  maxHeight: number;
  /** Height left showing once collapsed */
  minHeight: number;
  /** How far it scrolls away before sticking: its negative sticky `top` */
  collapseDistance: number;
}

export const measureHeader = (header: HTMLElement): HeaderSize => {
  const maxHeight = header.offsetHeight;
  const collapseDistance = Math.max(
    -parseFloat(getComputedStyle(header).top) || 0,
    0,
  );
  return {
    maxHeight,
    minHeight: maxHeight - collapseDistance,
    collapseDistance,
  };
};

/** Measures the sticky header wherever it's rendered, if it is */
export const measureStickyHeader = (): HeaderSize | null => {
  const header = document.querySelector<HTMLElement>(
    `[${STICKY_HEADER_ATTRIBUTE}]`,
  );
  return header ? measureHeader(header) : null;
};
