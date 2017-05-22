import React from 'react';
import {combineReducers} from 'redux';
import {Provider} from 'react-redux'
import { Navigation } from 'react-native-navigation';
//import {Screen} from './Screen'
import { connect } from 'react-redux';

class NativeRouter {

  constructor() {
    this.initialState = {
      routeName: '',
      data:{},
      params: {},
      routeStore:{}
    };
    this.connect = this.connect.bind(this);
    this.addRoute = this.addRoute.bind(this);
    this.setRoutes = this.setRoutes.bind(this);
    this.redirect = this.redirect.bind(this);
    this.getRoute = this.getRoute.bind(this);
    this.processRoutes = this.processRoutes.bind(this);
    this.getRouteStore = this.getRouteStore.bind(this);
    this.getComponent = this.getComponent.bind(this);
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

  setRoutes(routesToSet, defaultRoute, defaultRouteParams, defaultRouteData) {
    let router = this;
    this.routes = routesToSet;
    this.processRoutes()
    //load data if store has been set earlier
    if(this.store) {
      router.loadRouteData(defaultRoute, defaultRouteParams, defaultRouteData)
    } else {
      //create a function for delayed loading
      this.loadDefaultRoute = () => {
        router.loadRouteData(defaultRoute, defaultRouteParams, defaultRouteData)
      }
    }
  }


  loadRouteData(routeName, params, data) {
    let navigationAction = {
      type: '@@reduxnativenavigation/LOCATION_CHANGE',
      payload: {
        routeName: routeName,
        data: data,
        params: params
      }
    };
    this.store.dispatch(navigationAction);
  }

  startSingleScreenApp(routeName) {
    let route = this.getRoute(routeName)
    let routeProps = Object.assign({}, route, {screen:routeName})
    console.log("starting single screen app", route)
    Navigation.startSingleScreenApp({screen: routeProps})
  }

  redirect(routeName, context) {
  //  this.director.setRoute(routeName);
  }

  processRoutes() {
    let routeNames = Object.keys(this.routes);
    for (var index in routeNames) {
      let routeName = routeNames[index];
      let route = this.routes[routeName];
      this.addRoute(routeName, route);
    }
  }

  getComponent(routeName, route, store) {
    return class extends React.Component {
      render() {
        return route.component(route, this.props.navigator, store)
      }
    }
  }

  addRoute(routeName, route) {
    let router = this;
    let genFunc = () => this.getComponent(routeName, route, this.store)
    Navigation.registerComponent(routeName, genFunc, this.store, Provider);
  }


  getRoute(routeName) {
    if (this.routes) {
      return this.routes[routeName];
    }
    return null;
  }

  //change redux state as per route reducers
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

}

var routeInstance = new NativeRouter();

/*
class RouterViewComp extends React.Component {
    getChildContext () {
      return { route: this.props.route };
    }
    render() {
      console.log("render router view")
      return null;// this.props.method?this.props.method(this.props.route):null
    }
}
RouterViewComp.childContextTypes = {
  route: React.PropTypes.object,
};

const RouterView = connect(
    (state, props) => {
        console.log("render route 1 view", state, props)
        if(state.router && state.router.routeName) {
            let route = routeInstance.getRoute(state.router.routeName)
            if(route.component) {
                return {
                  method: route.component,
                  route: state.router
                }
            }
            if(route.components) {
                let compMethod = route.components[props.name]
                if(compMethod) {
                    return {
                        method: compMethod,
                        route: state.router
                    }
                }
            }
        }
        return {}
    }, null)(RouterViewComp);

*/
export {routeInstance as router};
