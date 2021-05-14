import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Index from './pages';
import About from './pages/about';
import Fallback from './pages/fallback';
import SignIn from './pages/sign-in';

const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/about" component={About} />
      <Route exact path="/sign-in" component={SignIn} />
      <Route exact path="/" component={Index} />
      <Route component={Fallback} />
    </Switch>
  </div>
);

export default Routes;
