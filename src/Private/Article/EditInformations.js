import React, { Component } from "react";

import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";

import { Input, Textarea, FileInput } from "@ludovicgueth/react-components";
import { Select } from "@ludovicgueth/react-components/lib";

import CategorySelector from "./CategorySelector";

const uploadFile = file => {
  let data = new FormData();
  data.append("data", file);
  return new Promise((resolve, reject) => {
    fetch("https://api.graph.cool/file/v1/cj5d00pfwhkbq01220oq1ul7i", {
      method: "POST",
      body: data
    })
      .then(response => {
        return response.json();
      })
      .then(file => {
        resolve(file);
      })
      .catch(e => {
        reject(e);
      });
  });
};

class EditInformations extends Component {
  state = {
    title: this.props.article.title,
    description: this.props.article.description,
    categoryId: this.props.article.category.id,
    file: this.props.article.image,
    loading: false,
    error: false,
    imageModalOpen: false
  };

  async updateArticle() {
    try {
      const { data } = await this.props.updateArticle({
        variables: {
          id: this.props.article.id,
          title: this.state.title,
          description: this.state.description,
          categoryId: this.state.categoryId,
          imageId: this.state.file.id
        }
      });
      return data.updateArticle;
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
    const { title, description, categoryId } = this.state;
    if (title === "" || description === "" || categoryId === null) {
      this.setState({
        loading: false,
        error: true
      });
      return;
    }
    try {
      const data = await this.updateArticle();
      this.setState({
        loading: false
      });
      window.location.reload();
    } catch (e) {
      console.error(e);
      this.setState({
        loading: false,
        error: true
      });
    }
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <form onSubmit={e => this.onSubmit(e)}>
            <h2 className="title is-2">
              Modifier les informations de l'article
            </h2>
            <div className="columns">
              <div className="column is-half">
                <Input
                  name="title"
                  label="Titre de l'article"
                  value={this.state.title}
                  onChange={e => {
                    this.setState({ title: e.target.value });
                  }}
                />
                <CategorySelector
                  categoryId={this.state.categoryId}
                  setCategoryId={e => {
                    this.setState({ categoryId: e.target.value });
                  }}
                />
                <Textarea
                  label="Description"
                  name="description"
                  value={this.state.description}
                  onChange={e => {
                    this.setState({ description: e.target.value });
                  }}
                />
              </div>
              <div className="column is-half">
                <FileInput
                  label="Changer l'image"
                  fileName={this.state.file.name}
                  fileLabel=""
                  onChange={e => {
                    uploadFile(e.target.files[0]).then(data => {
                      console.log(data);
                      this.setState({
                        file: data
                      });
                    });
                  }}
                />
                <figure
                  className="image is-128x128"
                  style={{ maxHeight: "100%" }}
                  onClick={() => {
                    this.setState({
                      imageModalOpen: !this.state.imageModalOpen
                    });
                  }}
                >
                  <img src={this.state.file.url} alt="article image" />
                </figure>
                <div
                  className={
                    this.state.imageModalOpen ? "modal is-active" : "modal"
                  }
                  onClick={() =>
                    this.setState({
                      imageModalOpen: !this.state.imageModalOpen
                    })
                  }
                >
                  <div className="modal-background" />
                  <div className="modal-content">
                    <p className="image is-4by3">
                      <img src={this.state.file.url} alt="" />
                    </p>
                  </div>
                  <button className="modal-close is-large" aria-label="close" />
                </div>
              </div>
            </div>
            <div className="buttons">
              <button className="button is-info" type="submit">
                Mettre à jour les informations
              </button>
              <button
                className="button is-danger"
                onClick={e => {
                  e.preventDefault();
                  let r = window.confirm(
                    "Etes-vous sûr de vouloir supprimer cet article " +
                      this.state.title +
                      " ?"
                  );
                  if (r) {
                    this.props
                      .deleteArticle({
                        variables: {
                          id: this.props.article.id
                        }
                      })
                      .then(data => {
                        window.location.replace("/articles");
                      });
                  }
                }}
              >
                Supprimer l'article
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

const UPDATE_ARTICLE = gql`
  mutation updateArticle(
    $id: ID!
    $title: String!
    $description: String!
    $imageId: ID
    $categoryId: ID!
  ) {
    updateArticle(
      id: $id
      title: $title
      description: $description
      imageId: $imageId
      categoryId: $categoryId
    ) {
      id
    }
  }
`;

const DELETE_ARTICLE = gql`
  mutation deleteArticle($id: ID!) {
    deleteArticle(id: $id) {
      id
    }
  }
`;

export default compose(
  graphql(UPDATE_ARTICLE, {
    name: "updateArticle"
  }),
  graphql(DELETE_ARTICLE, {
    name: "deleteArticle"
  })
)(EditInformations);
