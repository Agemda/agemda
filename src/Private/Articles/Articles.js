import React, { Component, Fragment } from "react";

import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";
import { NavLink } from "react-router-dom";
import {
  LoadingComponent,
  NotificationComponent
} from "@ludovicgueth/react-components/";

class Articles extends Component {
  state = {};
  render() {
    if (this.props.data.loading) return <LoadingComponent />;
    if (this.props.data.error)
      return <NotificationComponent className="is-danger" />;
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <NavLink to="newArticle" className="button is-link">
              <span className="icon">
                <i className="fa fa-plus" aria-hidden="true" />
              </span>
              <span> Creer un nouvel article</span>
            </NavLink>
          </div>
        </section>
        <section className="section">
          <div className="columns" style={{ flexWrap: "wrap" }}>
            {this.props.data.allArticles.map(article => {
              return (
                <div className="column is-3" key={article.id}>
                  <div className="box">
                    <figure className="image is-4by3">
                      <img src={article.image.url} alt="" />
                    </figure>
                    <NavLink to={"article/" + article.id}>
                      {article.title}
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </Fragment>
    );
  }
}

const ALL_ARTICLES_QUERY = gql`
  query {
    allArticles(orderBy: createdAt_DESC) {
      id
      title
      description
      image {
        id
        url
      }
    }
  }
`;

export default compose(graphql(ALL_ARTICLES_QUERY))(Articles);
