import eventHub from '../common/eventHub';
export default {
    router: [],
    route:{
        path: '',
        params: {},
        query: {},
        index: 0
    },
    done(scope){
        eventHub.$on('router:change',scope['router:change:eventHandler'] = (v) => {
            // console.log('router:change:geted');
            scope.$router.router.splice(0,v.router.length,...v.router);
            this.router.splice(0,v.router.length,...v.router);
            Object.assign(scope.$route,v.route);
            Object.assign(this.route,v.route);
            // console.log('route:changed',scope.$route,scope);
        });
        eventHub.$on('router:offsetChange',scope['router:offsetChange:eventHandler'] = (v) => {
            Object.assign(scope.$route,this.router[this.router.length - 1 + v]);
            Object.assign(this.route,this.router[this.router.length - 1 + v]);
        });
    },
    disDone(scope){
        eventHub.$off('$store:change',scope['router:change:eventHandler']);
        eventHub.$off('router:offsetChange',scope['router:offsetChange:eventHandler']);
    },
    go(offset){
        eventHub.$emit('router:offsetChange',offset);
    },
    getCurrentPath(){
        return this.router[this.router.length - 1]
    },
    push(route){
        if(Object.prototype.toString.call(route) == "[object String]"){
            this.route.path = route;
            this.router.push({
                path : route
            })
        }else if(Object.prototype.toString.call(route) == "[object Object]"){
            this.route.path = route.path;
            this.router.push(route);
        }
        // console.log('router:push:emit');
        eventHub.$emit('router:change',this);
    }
}