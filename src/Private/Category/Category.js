import React, { Component, Fragment } from "react";

import { NavLink } from "react-router-dom";

import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";

import Input from "../../Components/Input";

class CategoryForm extends Component {
  state = {
    name: this.props.category.name
  };

  async updateCategory() {
    try {
      const { data } = await this.props.updateCategory({
        variables: {
          id: this.props.category.id,
          name: this.state.name
        }
      });
      return data.updateCategory;
    } catch (e) {
      throw e;
    }
  }

  async onSubmit(e) {
    e.preventDefault();
    if (this.state.name === "" || this.state.name == null) {
      return;
    }
    try {
      const update = await this.updateCategory();
    } catch (e) {
      throw e;
    }
  }
  render() {
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <Input
          label="Modifier le nom de la catégorie"
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <div className="buttons">
          <button className="button is-info" type="submit">
            Modifier le nom
          </button>
          <button
            className="button is-danger"
            onClick={e => {
              e.preventDefault();
              let r = window.confirm(
                "Etes-vous sûr de vouloir supprimer la catégorie ?"
              );
              if (r) {
                this.props
                  .deleteCategory({
                    variables: {
                      id: this.props.category.id
                    }
                  })
                  .then(data => {
                    window.location.replace("/categories");
                  })
                  .catch(e => {
                    throw e;
                  });
              }
            }}
          >
            Supprimer la catégorie
          </button>
        </div>
      </form>
    );
  }
}

class Category extends Component {
  render() {
    if (this.props.data.loading) return <div>loading...</div>;
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-half">
                <h2 className="title is-2">
                  Catégorie : {this.props.data.Category.name}
                </h2>
                <CategoryForm
                  category={this.props.data.Category}
                  deleteCategory={this.props.deleteCategory}
                  updateCategory={this.props.updateCategory}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h2 className="title is-2">
              Articles de la catégorie {this.props.data.Category.name}
            </h2>
            <div className="columns" style={{ flexWrap: "wrap" }}>
              {this.props.data.Category.articles.map(article => {
                return (
                  <div className="column is-3" key={article.id}>
                    <div className="box">
                      <NavLink to={"/article/" + article.id}>
                        {article.title}
                      </NavLink>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

const CATEGORY_QUERY = gql`
  query category($id: ID!) {
    Category(id: $id) {
      id
      name
      articles {
        id
        title
      }
    }
  }
`;

const UPDATE_CATEGORY_MUTATION = gql`
  mutation updateCategory($id: ID!, $name: String!) {
    updateCategory(id: $id, name: $name) {
      id
      name
    }
  }
`;

const DELETE_CATEGORY_MUTATION = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      id
    }
  }
`;

export default compose(
  graphql(CATEGORY_QUERY, {
    options: ({ match }) => {
      return {
        variables: {
          id: match.params.id
        }
      };
    }
  }),
  graphql(UPDATE_CATEGORY_MUTATION, { name: "updateCategory" }),
  graphql(DELETE_CATEGORY_MUTATION, { name: "deleteCategory" })
)(Category);
