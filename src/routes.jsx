import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/private-route';
import Index from './pages';
import About from './pages/about';
import Fallback from './pages/fallback';
import SignIn from './pages/sign-in';
import Profile from './pages/profile';

const Routes = () => {
  // eslint-disable-next-line no-unused-vars
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/sign-in" component={SignIn} />
          <PrivateRoute exact path="/" component={Index} auth={!!currentUser} />
          <PrivateRoute
            exact
            path="/profile"
            component={Profile}
            auth={!!currentUser}
          />
          <Route component={Fallback} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
