import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Full from 'containers/Full';
import Simple from 'containers/Simple';

import Dashboard from 'views/Dashboard';
import Login from 'views/Login';
import Example from 'views/Example';
import Identificacao from 'views/Identificacao';

export default (
  <Router history={hashHistory}>
    <Route path="/" component={Simple}>
      <IndexRoute component={Login} />
    </Route>
    <Route path="dashboard" name="Dashboard" component={Full}>
      <IndexRoute name="dashboard" component={Dashboard}/>
      <Route path="example" name="Example" component={Example}/>
      <Route path="identificacao" name="Identificação" component={Identificacao}/>
    </Route>
  </Router>
);
