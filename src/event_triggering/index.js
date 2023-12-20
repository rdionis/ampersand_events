// This enables the automatic refreshing of the browser after a change.
new EventSource('/esbuild').addEventListener('change', () => location.reload());
 
import AmpersandEvents from 'ampersand-events';

// localEventEmitter
const localEventEmitter = {};
AmpersandEvents.createEmitter(localEventEmitter)

// globalEventEmitter
globalThis.globalEventEmitter = {};
AmpersandEvents.createEmitter(globalThis.globalEventEmitter)

// endless loop with 'ping' event
localEventEmitter.on('ping', (ping) => console.log(ping))
const infinitePing = () => localEventEmitter.trigger('ping', 'PINGALING')
setInterval(infinitePing, 500)

// endless loop with requestAnimationFrame on the globalEventEmitter
function refreshAndAnimate() {    
    globalThis.globalEventEmitter.on('animate', (timestamp) => console.log(timestamp));
    globalThis.globalEventEmitter.trigger('animate',`UNIX Timestamp: ${Date.now()}`)

    globalThis.globalEventEmitter.on('refresh', (refresh) => console.log(refresh))

    setInterval(
        () => globalThis.globalEventEmitter.trigger('refresh', 'refresh every two seconds'),
        2000
    )

    requestAnimationFrame(refreshAndAnimate)
}
requestAnimationFrame(refreshAndAnimate)

// listening to all events from localEventEmitter
const localListener = {}
AmpersandEvents.createEmitter(localListener)

localListener.listenTo(localEventEmitter, 'all', (eventName, ...args) => console.log(eventName, args))

// listening to all events from globalEventEmitter
const globalListener = {}
AmpersandEvents.createEmitter(globalListener)

globalListener.listenTo(globalThis.globalEventEmitter, 'all', (eventName, ...args) => console.log(eventName, args))