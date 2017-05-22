'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = undefined;

var _reduxnavigation = require('./reduxnavigation');

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _reduxnavigation.router.initialState;
  var action = arguments[1];

  switch (action.type) {
    case '@@reduxnativenavigation/LOCATION_CHANGE':
      var newState = Object.assign({}, action.payload);
      newState.routeStore = _reduxnavigation.router.changeRouteStore(newState.routeName, action);
      return newState;
    default:
      var routeStore = _reduxnavigation.router.getRouteStore(state.routeStore, action);
      if (routeStore == state.routeStore) {
        return state;
      } else {
        return Object.assign({}, state, {
          routeStore: routeStore
        });
      }
  }
};
exports.reducer = reducer;