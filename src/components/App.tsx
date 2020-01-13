import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import showUrlQueryError from "../urlQueryErrors";
import Layout from "./layout/Layout";
import { Home } from "./Home";
import { Campaign } from "./Campaign";
import { New } from "./New";

export const App = (props: {}) => {
  showUrlQueryError();
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/campaigns/:id" component={Campaign} />
          <Route exact path={["/campaigns", "/"]}>
            <Home />
          </Route>
          <Route exact path="/new">
            <New />
          </Route>
          <Route>
            <h1>404: Page not found</h1>
          </Route>
        </Switch>
      </Layout>
      <ToastContainer
        enableMultiContainer
        containerId={"global"}
        autoClose={4000}
        position="bottom-right"
      />
    </Router>
  );
};
