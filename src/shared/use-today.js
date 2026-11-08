import { useSyncExternalStore } from 'react';

const DAY = 24 * 60 * 60 * 1000;

// Pages are pre-rendered at build time, so hydrate with the build date
// (injected by vite.config.js) then switch to today, rather than letting
// the two disagree once the year rolls over
const buildDay = Math.floor(Date.parse(__BUILD_DATE__) / DAY);
const getToday = () => Math.floor(Date.now() / DAY);
const getBuildDay = () => buildDay;
const subscribe = () => () => {};

/** Today's date (to the day), safe to render in pre-rendered pages */
const useToday = () =>
  new Date(useSyncExternalStore(subscribe, getToday, getBuildDay) * DAY);

export default useToday;
