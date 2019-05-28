import React from "react";
import { Route, Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ConnectedTaskDetail } from "./TaskDetail";
import { ConnectedDashboard } from "./Dashboard";
import { ConnectedNavigation } from "./Navigation";
import { ConnectedLogin } from "./Login";
// import { ConnectedSignup } from "./Signup";
import { store } from "../store";
import { history } from "../store/history";
import { Redirect } from "react-router";

const RouteGuard = Component => ({ match }) => {
  console.info("RouteGuard", match);
  if (!store.getState().session.authenticated) {
    return <Redirect to="/" />;
  } else {
    return <Component match={match} />;
  }
};

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <div>
        <ConnectedNavigation />
        <Route exact path="/" component={ConnectedLogin} />
        {/* <Route exact path="/signup" component={ConnectedSignup} /> */}
        <Route
          exact
          path="/dashboard"
          render={RouteGuard(ConnectedDashboard)}
        />

        <Route
          exact
          path="/task/:id"
          render={RouteGuard(ConnectedTaskDetail)}
        />
      </div>
    </Provider>
  </Router>
);
