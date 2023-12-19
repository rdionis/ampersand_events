// This enables the automatic refreshing of the browser after a change.
new EventSource('/esbuild').addEventListener('change', () => location.reload());
 
import AmpersandEvents from 'ampersand-events';

// creating two instances of AmpersandEvents

// one assigned as a local variable 'localEventEmitter'

const localEventEmitter = {};
AmpersandEvents.createEmitter(localEventEmitter)

// one assigned as a 'globalEventEmitter' property of the 'globalThis' object

globalThis.globalEventEmitter = {}
AmpersandEvents.createEmitter(globalThis.globalEventEmitter)

// outputting both events to the console

console.log('localEventEmitter:', localEventEmitter);
console.log('globalThis.globalEventEmitter:', globalThis.globalEventEmitter);