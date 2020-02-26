import { Provider } from 'react-redux'
import React from "react";
import { HashRouter as Router, Route } from 'react-router-dom'

import Dashboard from './containers/Dashboard';
import GroupXSchool from './containers/GroupXSchool';

export default ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/groupXschool" component={GroupXSchool} />
    </Router>
  </Provider>
)