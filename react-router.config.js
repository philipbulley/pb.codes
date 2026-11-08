/** @type {import('@react-router/dev/config').Config} */
export default {
  appDirectory: 'src',
  // Static hosting (Netlify): no runtime server. SPA mode for now;
  // pre-rendering is enabled once styled-components is gone, as its
  // generated class names don't match between server and client.
  ssr: false,
};
