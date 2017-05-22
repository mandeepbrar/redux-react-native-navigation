/*import React from 'react';
import { connect } from 'react-redux';
import {router} from './reduxnavigation';

class RouterViewComp extends React.Component {
    getChildContext () {
      return { route: this.props.route };
    }
    render() {
      return this.props.method?this.props.method(this.props.route):null
    }
}
RouterViewComp.childContextTypes = {
  route: React.PropTypes.object,
};

const RouterView = connect(
    (state, props) => {
        if(state.router && state.router.routeName) {
            let route = router.getRoute(state.router.routeName)
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

export {RouterView as routerView}
*/
