'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = exports.Reducer = undefined;

var _reduxnavigation = require('./reduxnavigation');

var _reducer = require('./reducer');

//import {routerView} from './RouterView';
var Reducer = _reducer.reducer;
//const View=routerView
var Router = _reduxnavigation.router;

exports.Reducer = Reducer;
//export {View}

exports.Router = Router;