// This enables the automatic refreshing of the browser after a change.
// new EventSource('/esbuild').addEventListener('change', () => location.reload());

console.log('Ampersand Routing')

import Router from './router/router.js';

const router = new Router();

router.history.start({root: '/z_complex_routes/'})