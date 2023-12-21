import AmpersandRouter from 'ampersand-router';

export default AmpersandRouter.extend({
    routes: {
        'a': 'handleRouteA', // #a
        'b': 'handleRouteB', // #b
    },
  
    handleRouteA () {
        console.log(this.handleRouteA.name)
    },
    
    handleRouteB (){
        console.log(this.handleRouteB.name)
    },
});