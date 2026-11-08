import { index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.jsx'),
  route('projects', 'routes/projects.jsx'),
  route('about', 'routes/about.jsx'),
  route('contact', 'routes/contact.jsx'),
  route('*', 'routes/not-found.jsx'),
];
