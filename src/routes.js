import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Full from './containers/Full';

import Dashboard from 'views/Dashboard';
import Example from 'views/Example';
import Identificacao from 'views/Identificacao';

export default (
  <Router history={hashHistory}>
    <Route path="/" name="Home" component={Full}>
      <IndexRoute component={Dashboard}/>
      <Route path="example" name="Example" component={Example}/>
      <Route path="identificacao" name="Identificacao" component={Identificacao}/>
    </Route>
  </Router>
);
