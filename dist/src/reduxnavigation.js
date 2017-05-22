'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
//import {Screen} from './Screen'


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactNativeNavigation = require('react-native-navigation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NativeRouter = function () {
  function NativeRouter() {
    _classCallCheck(this, NativeRouter);

    this.initialState = {
      routeName: '',
      data: {},
      params: {},
      routeStore: {}
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

  _createClass(NativeRouter, [{
    key: 'connect',
    value: function connect(store) {
      this.store = store;
      //load data if store has been set later.
      if (this.loadDefaultRoute) {
        this.loadDefaultRoute();
      }
    }
  }, {
    key: 'setRoutes',
    value: function setRoutes(routesToSet, defaultRoute, defaultRouteParams, defaultRouteData) {
      var router = this;
      this.routes = routesToSet;
      this.processRoutes();
      //load data if store has been set earlier
      if (this.store) {
        router.loadRouteData(defaultRoute, defaultRouteParams, defaultRouteData);
      } else {
        //create a function for delayed loading
        this.loadDefaultRoute = function () {
          router.loadRouteData(defaultRoute, defaultRouteParams, defaultRouteData);
        };
      }
    }
  }, {
    key: 'loadRouteData',
    value: function loadRouteData(routeName, params, data) {
      var navigationAction = {
        type: '@@reduxnativenavigation/LOCATION_CHANGE',
        payload: {
          routeName: routeName,
          data: data,
          params: params
        }
      };
      this.store.dispatch(navigationAction);
    }
  }, {
    key: 'startSingleScreenApp',
    value: function startSingleScreenApp(routeName) {
      var route = this.getRoute(routeName);
      var routeProps = Object.assign({}, route, { screen: routeName });
      console.log("starting single screen app", route);
      _reactNativeNavigation.Navigation.startSingleScreenApp({ screen: routeProps });
    }
  }, {
    key: 'redirect',
    value: function redirect(routeName, context) {
      //  this.director.setRoute(routeName);
    }
  }, {
    key: 'processRoutes',
    value: function processRoutes() {
      var routeNames = Object.keys(this.routes);
      for (var index in routeNames) {
        var routeName = routeNames[index];
        var route = this.routes[routeName];
        this.addRoute(routeName, route);
      }
    }
  }, {
    key: 'getComponent',
    value: function getComponent(routeName, route, store) {
      return function (_React$Component) {
        _inherits(_class, _React$Component);

        function _class() {
          _classCallCheck(this, _class);

          return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        _createClass(_class, [{
          key: 'render',
          value: function render() {
            return route.component(route, this.props.navigator, store);
          }
        }]);

        return _class;
      }(_react2.default.Component);
    }
  }, {
    key: 'addRoute',
    value: function addRoute(routeName, route) {
      var _this2 = this;

      var router = this;
      var genFunc = function genFunc() {
        return _this2.getComponent(routeName, route, _this2.store);
      };
      _reactNativeNavigation.Navigation.registerComponent(routeName, genFunc, this.store, _reactRedux.Provider);
    }
  }, {
    key: 'getRoute',
    value: function getRoute(routeName) {
      if (this.routes) {
        return this.routes[routeName];
      }
      return null;
    }

    //change redux state as per route reducers

  }, {
    key: 'changeRouteStore',
    value: function changeRouteStore(newRoute, action) {
      var route = this.getRoute(newRoute);
      if (route) {
        if (route.reducer) {
          this.routeStoreReducer = route.reducer;
        } else if (route.reducers && Object.keys(route.reducers).length > 0) {
          this.routeStoreReducer = (0, _redux.combineReducers)(route.reducers);
        }
        if (this.routeStoreReducer) {
          return this.routeStoreReducer({}, action);
        }
      }
      return {};
    }
  }, {
    key: 'getRouteStore',
    value: function getRouteStore(state, action) {
      if (this.routeStoreReducer) {
        return this.routeStoreReducer(state, action);
      }
      return state;
    }
  }]);

  return NativeRouter;
}();

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
exports.router = routeInstance;