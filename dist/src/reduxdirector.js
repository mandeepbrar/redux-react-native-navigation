/*import {
  Router
} from 'director';
import {combineReducers} from 'redux';
class DirectorRouter {

  constructor() {
    this.initialState = {
      url: '',
      pattern: '',
      routeName: '',
      data:{},
      params: {},
      routeStore:{}
    };
    this.connect = this.connect.bind(this);
    this.getUrl = this.getUrl.bind(this);
    this.addRoute = this.addRoute.bind(this);
    this.setRoutes = this.setRoutes.bind(this);
    this.dispatch = this.dispatch.bind(this);
    this.redirect = this.redirect.bind(this);
    this.getRoute = this.getRoute.bind(this);
    this.handleRoute = this.handleRoute.bind(this);
    this.processRoutes = this.processRoutes.bind(this);
    this.getRouteStore = this.getRouteStore.bind(this);
    this.changeRouteStore = this.changeRouteStore.bind(this);
    this.loadRouteData = this.loadRouteData.bind(this);
    this.loadDefaultRoute = null;
  }

  connect(store) {
    this.store = store;
    //load data if store has been set later.
    if(this.loadDefaultRoute) {
      this.loadDefaultRoute()
    }
  }

  setRoutes(routesToSet, defaultRoute, defaultRouteParams, defaultRouteData, directorConfig) {
    let router = this;
    this.director = new Router();
    if (!directorConfig) {
      directorConfig = {
        html5history: false,
        run_handler_in_init: false,
        convert_hash_in_init: true
      }
    }
    this.routes = routesToSet;
    this.processRoutes()
    //load data if store has been set earlier
    if(this.store) {
      router.loadRouteData(defaultRoute, defaultRouteParams, defaultRouteData)
      this.director.init().configure(directorConfig);
    } else {
      //create a function for delayed loading
      this.loadDefaultRoute = () => {
        router.loadRouteData(defaultRoute, defaultRouteParams, defaultRouteData)
        this.director.init().configure(directorConfig);
      }
    }
  }

  handleRoute(pattern, params, handler) {
    var middlewares = [];
    var i = 1;
    var ctx = {};
    ctx.params = {};
    ctx.url = '';
    for (i = 2; i < arguments.length; i++) {
      middlewares.push(arguments[i]);
    }
    let router = this;
    this.director.on(pattern, function() {
      var index = 0;
      var args = [];
      ctx.state = router.store.getState();
      ctx.url = router.getUrl();
      for (i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
        ctx.params[params[i]] = arguments[i];
      }

      var middlewareHandler = function(i) {
        if (index < middlewares.length - 1) {
          middlewares[i].call(router, ctx, next);
        } else {
          args.unshift(ctx);
          middlewares[middlewares.length - 1].apply(router, args);
        }
      };
      var next = function() {
        index++;
        middlewareHandler(index);
      };

      middlewareHandler(0);
    });
  };

  addRoute(pattern, routeName, data, middlewares = []) {
    let router = this;
    var params = (pattern.match(/:[^\s/]+/g) || []).map(function(param) {
      return param.substr(1);
    });
    this.handleRoute.apply(null, [pattern, params, ...middlewares, (ctx) => {
      router.loadRouteData(routeName, ctx.params, data, pattern,  ctx.url)
    }]);
  }

  loadRouteData(routeName, params, data, pattern, url) {
    let navigationAction = {
      type: '@@reduxdirector/LOCATION_CHANGE',
      payload: {
        url: url,
        routeName: routeName,
        pattern: pattern,
        data: data,
        params: params
      }
    };
    this.store.dispatch(navigationAction);
  }

  changeRouteStore(newRoute, action) {
    let route = this.getRoute(newRoute);
    if(route) {
      if(route.reducer) {
        this.routeStoreReducer = route.reducer
      } else if(route.reducers && Object.keys(route.reducers).length >0) {
        this.routeStoreReducer = combineReducers(route.reducers)
      }
      if(this.routeStoreReducer) {
        return this.routeStoreReducer({}, action)
      }
    }
    return {};
  }

  getRouteStore(state, action) {
    if(this.routeStoreReducer) {
      return this.routeStoreReducer(state, action);
    }
    return state;
  }

  redirect(url) {
    this.director.setRoute(url);
  }

  dispatch(path) {
    return this.director.dispatch(path);
  }

  processRoutes() {
    let routeNames = Object.keys(this.routes);
    for (var index in routeNames) {
      let routeName = routeNames[index];
      let route = this.routes[routeName];
      let data = route.data;
      if(!data) {
        data = {}
      }
      this.addRoute(route.pattern, routeName, data, route.middlewares);
    }
  }

  getRoute(routeName) {
    if (this.routes) {
      return this.routes[routeName];
    }
    return null;
  }

  getUrl() {
    if (this.director) {
      return this.director.getRoute().join('/');
    }
    return null;
  };
}

var routeInstance = new DirectorRouter();
export {routeInstance as router};
*/
"use strict";