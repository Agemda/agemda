import React, { Component } from "react";

import { graphql } from "react-apollo";
import gql from "graphql-tag";

import Input from "../../Components/Input";

class NewCategory extends Component {
  state = {
    name: "",
    loading: false,
    error: false
  };

  async createCategory() {
    try {
      const { data } = await this.props.createCategory({
        variables: {
          name: this.state.name
        }
      });
      return data.createCategory;
    } catch (e) {
      throw e;
    }
  }

  async onSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: true,
      error: false
    });
    try {
      const category = await this.createCategory();
    } catch (e) {
      this.setState({
        error: true
      });
      window.location.replace("/categories");
    } finally {
      this.setState({
        loading: false
      });
      window.location.replace("/categories");
    }
  }
  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <form onSubmit={e => this.onSubmit(e)}>
                <h2 className="title is-2">Creer une nouvelle catégorie</h2>
                <Input
                  label="Nom de la catégorie"
                  name="name"
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                />
                <button
                  className={
                    this.state.loading
                      ? "button is-info is-loading"
                      : "button is-info"
                  }
                  type="submit"
                >
                  Créer la catégorie
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const CREATE_CATEGORY_MUTATION = gql`
  mutation createCategory($name: String!) {
    createCategory(name: $name) {
      id
      name
    }
  }
`;

export default graphql(CREATE_CATEGORY_MUTATION, {
  name: "createCategory"
})(NewCategory);
