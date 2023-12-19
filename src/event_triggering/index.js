// This enables the automatic refreshing of the browser after a change.
new EventSource('/esbuild').addEventListener('change', () => location.reload());
 
import AmpersandEvents from 'ampersand-events';

// localEventEmitter
const localEventEmitter = {};
AmpersandEvents.createEmitter(localEventEmitter)

localEventEmitter.on('localEventEmitterIsReady', (timestamp)=> console.log(timestamp))
localEventEmitter.trigger('localEventEmitterIsReady', Date.now())

// globalEventEmitter
globalThis.globalEventEmitter = {};
AmpersandEvents.createEmitter(globalThis.globalEventEmitter)

globalThis.globalEventEmitter.on('globalEventEmitterIsReady', (timestamp) => console.log(timestamp))
globalThis.globalEventEmitter.trigger('globalEventEmitterIsReady', Date.now())

// endless loop with 'ping' event
localEventEmitter.on('ping', (ping) => console.log(ping))
const infinitePing = () => localEventEmitter.trigger('ping', 'PINGALING')
setInterval(infinitePing, 500)

// endless loop with requestAnimationFrame


function smoothAnimation() {
    // animtion
    requestAnimationFrame(smoothAnimation)
}
requestAnimationFrame(smoothAnimation)

window.requestAnimationFrame(() => console.log('ANIMATION'))

// let lastRefresh = 0;

// function refreshWithAnimationFrame(timestamp) {
//   if (timestamp - lastRefresh > 60000) {
//     lastRefresh = timestamp;
//     console.log('timestamp', timestamp)
//     globalThis.globalEventEmitter.trigger('refresh', timestamp);
//   }

//   globalThis.globalEventEmitter.trigger('animate', timestamp);
//   requestAnimationFrame(refreshWithAnimationFrame);
// }

// requestAnimationFrame(refreshWithAnimationFrame);





// console.log('Solution for lesson 5 – task 2');

// // TASK 2 – Trigger events and react to them (trigger, listenTo)

// import AmpersandEvents from 'ampersand-events';

// // creating an instance of AmpersandEvents as a local variable named 'localEventEmitter'

// const localEventEmitter = {};
// AmpersandEvents.createEmitter(localEventEmitter);


// // creating a 'localListener' object to listen to all events originating from the 'localEventEmitter'

// const localListener = {};
// AmpersandEvents.createEmitter(localListener);


// // using the 'listenTo' method on the 'localListener' object to listen to all events from 'localEventEmitter'
// // and output both the event and the passed arguments via console.log

// localListener.listenTo(localEventEmitter, 'all', (eventName, ...args) => {
//   console.log(`
//     Event: ${eventName}
//     Arguments: ${args}
//   `);  
// });

// // creating the event 'localEventEmitterIsReady' on the 'localEventEmitter'
// // with the current UNIX timestamp as the first argument

// localEventEmitter.on('localEventEmitterIsReady', function (timestamp) {
//     console.log('localEventEmitterIsReady event has been triggered on localEventEmitter with timestamp:', timestamp);
// });

// localEventEmitter.trigger('localEventEmitterIsReady', Date.now());


// // creating one instance of AmpersandEvents as the property 'globalEventEmitter' of the 'globalThis' object

// globalThis.globalEventEmitter = {};
// AmpersandEvents.createEmitter(globalThis.globalEventEmitter);


// // creating a 'globalListener' object to listen to all events originating from the 'globalThis.globalEventEmitter'

// const globalListener = {};

// AmpersandEvents.createEmitter(globalListener);


// // using the 'listenTo' method on the 'globalListener' to listen to all events from 'globalEventEmitter'
// // and output both the event and the passed arguments via console.log

// globalListener.listenTo(globalThis.globalEventEmitter, 'all', (eventName, ...args) => {
//   console.log(`
//     Event: ${eventName}
//     Arguments: ${args}
//   `);  
// });

// // creating the event 'globalEventEmitterIsReady' on the 'globalEventEmitter'
// // with the current UNIX timestamp as the first argument

// globalThis.globalEventEmitter.on('globalEventEmitterIsReady', function (timestamp) {
//     console.log('globalEventEmitterIsReady event has been triggered on globalEventEmitter with timestamp:', timestamp);
// });

// globalThis.globalEventEmitter.trigger('globalEventEmitterIsReady', Date.now());


// // creating an infinite loop that:
// // triggers the 'ping' event on the 'localEventEmitter' object
// // waits 500 milliseconds

// localEventEmitter.on('ping', () => console.log('PING'));

// const infinitePing = () => localEventEmitter.trigger('ping');

// setInterval(infinitePing, 500) // repeat the loop after 500 milliseconds


// // creating an infinite loop with requestAnimationFrame that:
// // triggers the 'animate' event on the 'globalEventEmitter' object
// // with the current UNIX timestamp as the first argument
// // triggers the 'refresh' event every 60 seconds

// globalThis.globalEventEmitter.on('animate', (timestamp) => console.log(`Animating the ${timestamp}!`));
// globalThis.globalEventEmitter.on('refresh', (timestamp) => console.log(`Refreshing the ${timestamp}!`));

// let lastRefresh = 0;

// function refreshWithAnimationFrame(timestamp) {
//   if (timestamp - lastRefresh > 60000) {
//     lastRefresh = timestamp;
//     console.log('timestamp', timestamp)
//     globalThis.globalEventEmitter.trigger('refresh', timestamp);
//   }

//   globalThis.globalEventEmitter.trigger('animate', timestamp);
//   requestAnimationFrame(refreshWithAnimationFrame);
// }

// requestAnimationFrame(refreshWithAnimationFrame);
