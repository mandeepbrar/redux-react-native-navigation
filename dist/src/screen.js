/*import React from 'react';

class Screen extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
  }
  render() {
    console.log("rendering route ", this.props)
    return null
  }
}
export {Screen as Screen}


/*



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

*/
"use strict";