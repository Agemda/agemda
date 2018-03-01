import React from "react";
import ReactDOM from "react-dom";

import registerServiceWorker from "./registerServiceWorker";

import { Router, Route, Switch } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";

import "bulma/css/bulma.css";
import "./index.css";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";

import Login from "./Login/Login";
import Private from "./Private/Private";

const history = createBrowserHistory();

const httpLink = createHttpLink({
  uri: "https://api.graph.cool/simple/v1/cj5d00pfwhkbq01220oq1ul7i"
});

const middlewareLink = setContext(async () => ({
  headers: {
    authorization: "Bearer " + localStorage.getItem("token") || null
  }
}));

const concatenedLink = middlewareLink.concat(httpLink);

const client = new ApolloClient({
  link: concatenedLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/" component={Private} />
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
