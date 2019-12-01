import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Home } from './Home';
import { Campaign } from './Campaign';
import { New } from './New';
import { Login } from './Login';
import { Signup } from './Signup';

export const App = (props: {}) => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/campaigns/:id" component={Campaign} />
          <Route exact path={['/campaigns', '/']}>
            <Home />
          </Route>
          <Route exact path="/new">
            <New />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route>
            <h1>404: Page not found</h1>
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};
