import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Index from './pages';
import About from './pages/about';

const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/about" component={About} />
      <Route path="/" component={Index} />
    </Switch>
  </div>
);

export default Routes;
