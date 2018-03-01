import React, { Component, Fragment } from "react";

import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { NavLink } from "react-router-dom";

class Categories extends Component {
  state = {};
  render() {
    if (this.props.data.loading) return <div>...loading</div>;
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <NavLink to="newCategory" className="button is-link">
              <span className="icon">
                <i className="fa fa-plus" aria-hidden="true" />
              </span>
              <span>Creer une nouvelle catégorie</span>
            </NavLink>
          </div>
        </section>
        <section className="section">
          <div className="container">
            {this.props.data.allCategories.map(category => {
              return (
                <div className="box" key={category.id}>
                  <NavLink to={"category/" + category.id}>
                    {category.name}
                  </NavLink>
                </div>
              );
            })}
          </div>
        </section>
      </Fragment>
    );
  }
}

const ALL_CATEGORIES_QUERY = gql`
  query {
    allCategories {
      id
      name
    }
  }
`;

export default graphql(ALL_CATEGORIES_QUERY)(Categories);
