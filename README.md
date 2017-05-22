# redux-director
Redux bindings to [director](https://github.com/flatiron/director). This has been inspired from [redux-router-director](https://www.npmjs.com/package/redux-router-director)

##Installation

npm install director --save

npm install redux-director --save

##Usage

### Step 1: Connect the router to the store
Connect the router to the store. in the app file. 

index.js
```
import React from 'react';
import App from './containers/App';
//import the router here
import {Router} from 'redux-director';

const store = configureStore();
Router.connect(store);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

```

### Step 2: Create placeholders for route components
Create an app file with view placeholders. In the following example, we are creating two views named 'sidebar' and 'main'. Sidebar will be replaced by the sidebar component of current route. Main will be replaced by 'main' component of the selected route.

app.js

```
..//other imports
import {View} from 'redux-director';
//we placed routes in a separate file
import '../components/Routes';

class App extends Component {
  render() {
    const {actions} = this.props;
    return(
      <div>
        <View name="sidebar"/>
        <View name="main"/>
      </div>
    )
  }
}

```

### Step 3: Declare routes 

Set up the routes in a file. The routes are named and defined as a json below. The route name roughly acts like a state in angular ui router. Whenever a route is matched using "pattern" for the route, the components of the route are displayed in their View placeholders. e.g. In the below case View placeholder named "main" will display the components specified during the definition of routes. When the state of the router is "home", The view placholder named "main" will display Home component

routes.js
```
import {Contact} from './Contact';
import {Home} from './Home';
import {MyPage} from './MyPage';
import {Sidebar} from './Sidebar';
import {Router} from 'redux-director';

function sidebar() {
  return (
    <Sidebar/>
  )
}

//middleware for a route
const mymw = (ctx, next) => {
  console.log("store state", ctx.state, ctx);
  next();
}

// define the routes
//route starts with the name of the router e.g. home, contact below
//route contains the patter that should be matched by director
//route contains the components that need to be displayed by the views.
//eg. View named main will display the component Home whenever route "home" is matched.
// View named contact will display the component Contact whenever route "contact is matched.
// This is somewhat similar to angular ui router.. 
const routes= {

  //define the home route.. 
  "home": {
    pattern:"",
    components:{
      main: () => {
        return (
          <Home/>
        )
      },
      sidebar:sidebar
    }
  },
  
  
  "myvariableroute": { //define a route which matches a pattern with a variable var
    pattern:"/route/:var",
    components:{
      main: (routerstate) => {
        console.log(routerstate.params.var) //returns myval when you visit #/route/myval
        console.log(routerstate.data.myfield)
        return (
          <MyPage var={routerstate.params.var} ></MyPage> // use var as a property to your component
        )
      },
      sidebar:sidebar //sidebar is also available
    },
    data: {
      myfield:"myvalue"
    }
  },
  
  
  "contact": { //define another contact route..
    pattern:"/contact",
    middlewares: [mymw],
    components:{
      main: () => {
        return (
          <Contact/>
        )
      },
      sidebar: sidebar,
      reducers: {
      	myreducer
      }
    }
  }
};

//set the routes to the router
//default route can be provided if there is default reducer state that needs to be loaded by default e.g. reducer for state 'home' will be loaded by default in the case below
Router.setRoutes(routes, 'home');

```
#### Single component in page

If there is only one view in a page that changes on a route. It can be specified using a simpler way as follows. This component will be displayed on the View.
```
const routes= {
  "home": {
    pattern:"",
    component: () => {
        return (
          <Home/>
        )
    }
  },

```

#### Accessing variables and route state
A route state object is passed to the component. This state object contains route parameters that can be referenced using routestate.params. The routestate also contains any data that you would like to pass from the route definition to the component.

#### Route Store
Route specific reducers can be specified by using the 'reducers' for a route. Data is stored in router.routeStore and lost/destroyed on every route change.

####Middleware
Middleware can be added to the definition of routes by specifiying middlewares in the route. Please refer doc of redux-router-director for more info. 

```
//middleware for a route
const mymw = (ctx, next) => {
  console.log("store state", ctx.state, ctx);
  next();
}

// in the definition of the route.. include it as below
"contact": { //define another contact route..
    pattern:"/contact",
    middlewares: [mymw],

```

#### Listening to the events
The change events are available using event type '@@reduxdirector/LOCATION_CHANGE' for a reducer or saga. 

### Step 4: Add routes to the reducer
Add the router reducer to the list of reducers for the application. The router reducer should be added at the highest level with the name router.i.e. the state of the router should be accessible with state.router

stores/index.js
```
import { combineReducers } from 'redux';
import {Reducer} from 'redux-director';

//router reducer should be always named router
const reducers = {
  router: Reducer

};
module.exports = combineReducers(reducers);
```
### Step 5: Navigation
Navigation through the app is possible through simple <a> links. e.g. a Sidebar can contain links to different pages as below. Clicking on these links changes the state of the router.

```
import React from 'react';

const Sidebar =(props) =>(
  <div>
    Sidebar
    <ul>
      <li>
        <a href="#/">home</a>
      </li>
      <li>
        <a href="#/contact">contact</a>
      </li>
      <li>
        <a href="#/route/Title">MyPage-Main</a>
      </li>
      <li>
        <a href="#/route/Listing">MyPage-Listing</a>
      </li>
    </ul>
  </div>
)

export {Sidebar as Sidebar};

```


##Other methods
Other methods like redirect and getUrl are available on the router.

redirect(url)

dispatch(url)

##License
MIT
