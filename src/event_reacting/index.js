import AmpersandEvents from 'ampersand-events';

// This enables the automatic refreshing of the browser after a change.
new EventSource('/esbuild').addEventListener('change', () => location.reload());

console.log("let's react to events")

// creating globalEventEmitter object
globalThis.globalEventEmitter = {};
AmpersandEvents.createEmitter(globalThis.globalEventEmitter);

// creating a globalListener
const globalListener = {}
AmpersandEvents.createEmitter(globalListener)

// instantiating all globalEventEmitter events
globalThis.globalEventEmitter.on('animate', (timestamp) => console.log(timestamp));
globalThis.globalEventEmitter.on('refresh', (refresh) => console.log(refresh))

// // listening to all events coming from globalEventEmitter once
globalListener.listenTo(globalThis.globalEventEmitter, 'all', (eventName, ...args) => console.log(eventName, args) )

setInterval(()=> globalThis.globalEventEmitter.trigger('animate',`UNIX Timestamp: ${Date.now()}`), 2000)

// click on the screen to start/stop reacting to the 'animate' event in the globalEventEmitter
let currentListeningState = false;  

const stopListening = () => {
  // globalListener.stopListening(null, 'animate'); // does not work
  // globalListener.stopListening(globalThis.globalEventEmitter, 'animate'); // also does not work
  globalListener.stopListening(globalThis.globalEventEmitter); // only one that works
  console.log('I am NOT listening.');
}; 

const resumeListening = () => {
  globalListener.listenTo(globalThis.globalEventEmitter, 'all', (eventName, ...args) => console.log(eventName, args))
  console.log('I am listening.')
}

const onOff = () => {
  if (currentListeningState) {
    stopListening()    
    currentListeningState = false;
  } else {
    resumeListening()  
    currentListeningState = true
  }
  console.log('clicking toggles the listening')
}

document.addEventListener('click', () => onOff());

// listening once to the 'ping' event from localEventEmitter

const localEventEmitter = {}
AmpersandEvents.createEmitter(localEventEmitter)

const localListener = {}
AmpersandEvents.createEmitter(localListener)

localEventEmitter.on('ping', (ping) => console.log(ping))
localListener.listenToOnce(localEventEmitter, 'ping', () => console.log(`listening to ping`))
localEventEmitter.trigger('ping', 'PINGING ALING')
