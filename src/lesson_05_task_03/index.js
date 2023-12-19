import AmpersandEvents from 'ampersand-events';

// This enables the automatic refreshing of the browser after a change.
new EventSource('/esbuild').addEventListener('change', () => location.reload());
console.log('Solution for lesson 5 – task 3');

// TASK 3 – Respond to events (listenToOnce, listenTo, listenToAndRun, stopListening)

const localEventEmitter = {};
const localListener = {};
globalThis.globalEventEmitter = {};
const globalListener = {};

AmpersandEvents.createEmitter(localEventEmitter);
AmpersandEvents.createEmitter(localListener);
AmpersandEvents.createEmitter(globalThis.globalEventEmitter);
AmpersandEvents.createEmitter(globalListener);

// Triggering and listening to the 'ping' event on the 'localEventEmitter' object once
localEventEmitter.on('ping', () => console.log('PING'));
localEventEmitter.trigger('ping');
localListener.listenToOnce(
  localEventEmitter,
  'ping',
  () => { console.log('The \'ping\' event:', localEventEmitter._events.ping)}
);  

// Making sure the globalEventEmitter is ready
globalThis.globalEventEmitter.on('globalEventEmitterIsReady', function (timestamp) {
    console.log('globalEventEmitterIsReady event has been triggered on globalEventEmitter with timestamp:', timestamp);
});
globalThis.globalEventEmitter.trigger('globalEventEmitterIsReady', Date.now());

let lastRefresh = 0;

globalListener.listenTo(globalThis.globalEventEmitter, 'refresh', (timestamp) => console.log('Refreshing the ' + timestamp + '!'));

function refreshWithAnimationFrame(timestamp) {
  globalThis.globalEventEmitter.trigger('animate', timestamp);

  if (timestamp - lastRefresh > 5000) {
    lastRefresh = timestamp;
    globalThis.globalEventEmitter.trigger('refresh', timestamp);
  }
}

// Trigger an infinite loop of events
setInterval(() => requestAnimationFrame(refreshWithAnimationFrame), 1000);

// Toggle listening to the 'animate' event on the 'globalEventEmitter' object
const startListening = () => {
  globalListener.listenTo(globalThis.globalEventEmitter, 'animate', (timestamp) => console.log('Animating the ' + timestamp + '!'));
  console.log('Now I am reacting to animate events.');
};

const stopListening = () => {
  globalListener.stopListening(globalThis.globalEventEmitter, 'animate');
  console.log('Now I am NOT reacting to animate events.');
};

let currentListeningState = false;

const toggleListeningFunction = () => {
  if (currentListeningState) {
    stopListening();
    currentListeningState = false;
  } else {
    startListening();
    currentListeningState = true;
  };
};

document.addEventListener('click', () => toggleListeningFunction());