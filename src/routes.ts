import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('projects', 'routes/projects.tsx'),
  route('about', 'routes/about.tsx'),
  route('contact', 'routes/contact.tsx'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
