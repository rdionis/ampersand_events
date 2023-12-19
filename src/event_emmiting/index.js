// This enables the automatic refreshing of the browser after a change.
new EventSource('/esbuild').addEventListener('change', () => location.reload());
 
import AmpersandEvents from 'ampersand-events';

const localEventEmitter = {};
AmpersandEvents.createEmitter(localEventEmitter)

console.log('localEventEmitter:', localEventEmitter);

globalThis.globalEventEmitter = {}
AmpersandEvents.createEmitter(globalThis.globalEventEmitter)

console.log('globalThis.globalEventEmitter:', globalThis.globalEventEmitter);