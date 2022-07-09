import './polyfill';
import React from "react";
import ReactDom from "react-dom";
import App from "./App.js";
import './index.css';
import {Provider} from 'react-redux';
import { Route,Switch } from "react-router-dom"
import store from "./redux/store";
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_BACKEND;



axios.defaults.headers.common['Content-Type'] =  'application/json';

export class Routing extends React.Component {
  render() {
     return (
        <>
      
           <Switch>
              <Route exact path="/" component={App}></Route>
           </Switch>


        </>
     );
  }
}
ReactDom.render(
<React.StrictMode>
   <Provider store={store}>
			<App />
         </Provider>
	</React.StrictMode>
  
, 
document.getElementById('root'));