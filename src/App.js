import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/layout/Home";
import Navbar from "./components/layout/Navbar";
import Routes from "./components/routing/Routes";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ScrollToTop from "./utils/ScrollToTop";

import "./App.css";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

toast.configure();

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <Fragment>
            <ScrollToTop />
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route component={Routes} />
            </Switch>
          </Fragment>
        </ThemeProvider>
      </Router>
    </Provider>
  );
};

export default App;
