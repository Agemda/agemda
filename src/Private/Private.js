import React, { Component } from "react";

import { Redirect, Switch, Route } from "react-router";

import { graphql } from "react-apollo";
import gql from "graphql-tag";

import Navigation from "./Navigation/Navigation";
import Articles from "./Articles/Articles";
import Article from "./Article/Article";
import NewArticle from "./NewArticle/NewArticle";
import Categories from "./Categories/Categories";
import Category from "./Category/Category";
import newCategory from "./NewCategory/NewCategory";

import {
  LoadingComponent,
  NotificationComponent
} from "@ludovicgueth/react-components";

const pages = [
  {
    name: "Articles",
    url: "/articles"
  },
  {
    name: "Categories",
    url: "/categories"
  }
];

class Private extends Component {
  state = {};
  render() {
    if (this.props.data.loading) return <LoadingComponent />;
    if (this.props.data.error)
      return (
        <NotificationComponent type="is-danger">
          Une erreur s'est produite. Contacter l'administrateur.
        </NotificationComponent>
      );
    if (!this.props.data.user) return <Redirect to="/login" />;
    return (
      <div className="main">
        <Navigation pages={pages} />
        <Switch>
          <Route path="/" exact component={Articles} />
          <Route path="/articles" exact component={Articles} />
          <Route path="/article/:id" exact component={Article} />
          <Route path="/newArticle" exact component={NewArticle} />
          <Route path="/categories" exact component={Categories} />
          <Route path="/category/:id" exact component={Category} />
          <Route path="/newCategory" exact component={newCategory} />
        </Switch>
      </div>
    );
  }
}

const USER_QUERY = gql`
  query {
    user {
      id
      email
    }
  }
`;

export default graphql(USER_QUERY)(Private);
