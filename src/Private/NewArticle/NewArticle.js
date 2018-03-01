import React, { Component } from "react";

import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";

import "../../Components/Textarea";
import {
  FileInput,
  Input,
  Select,
  Textarea,
  LoadingComponent,
  NotificationComponent
} from "@ludovicgueth/react-components/lib";

import Editor from "../Editor/Editor";

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

class NewArticle extends Component {
  state = {
    model: "",
    name: "",
    description: "",
    categoryId: "",
    file: "null",
    loading: false,
    error: false,
    fileId: null
  };

  async createArticle(fileId) {
    try {
      const { data } = await this.props.createArticle({
        variables: {
          content: this.state.model,
          title: this.state.name,
          description: this.state.description,
          imageId: fileId,
          categoryId: this.state.categoryId
        }
      });
      return data.createArticle;
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
    const { name, description, content, file, categoryId } = this.state;
    if (
      name === "" ||
      description === "" ||
      content === "" ||
      file === null ||
      categoryId === ""
    ) {
      this.setState({
        loading: false,
        error: true
      });
      console.log(this.state);
      return;
    }
    try {
      const { id } = await uploadFile(this.state.file);
      const data = await this.createArticle(id);
      console.log("data", data);
      this.setState({
        loading: false
      });
      window.location.replace("/articles");
    } catch (e) {
      console.error(e);
      this.setState({
        loading: false,
        error: true
      });
    }
  }

  render() {
    if (this.props.data.loading) return <LoadingComponent />;
    if (this.props.data.error)
      return (
        <NotificationComponent type="is-danger">
          Une erreur est survenue. Contacter l'administrateur.
        </NotificationComponent>
      );
    return (
      <section className="section">
        <div className="container">
          <h2 className="title is-2">Créer un nouvel article</h2>
          <form onSubmit={e => this.onSubmit(e)}>
            <div className="columns">
              <div className="column is-half">
                <Input
                  label="Nom de l'article"
                  name="name"
                  value={this.state.name}
                  onChange={e =>
                    this.setState({
                      name: e.target.value
                    })
                  }
                />
                <Select
                  label="Catégorie"
                  value={this.state.categoryId}
                  onChange={e => this.setState({ categoryId: e.target.value })}
                >
                  <option value="null">Selectionner une catégorie</option>
                  {this.props.data.allCategories.map(category => {
                    return (
                      <option value={category.id} key={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </Select>

                <Textarea
                  label="Description"
                  name="description"
                  value={this.state.description}
                  onChange={e => this.setState({ description: e.target.value })}
                />
              </div>
              <div className="column is-half">
                <FileInput
                  label="Selectionner une image"
                  fileName={this.state.file ? this.state.file.name : ""}
                  fileLabel=""
                  onChange={e => {
                    this.setState({
                      file: e.target.files[0]
                    });
                  }}
                />
              </div>
            </div>

            <div className="column">
              <figure className="image is-256x256">
                {/* image preview */}
                {/* <img
                        src="https://www.w3schools.com/howto/img_fjords.jpg"
                        alt=""
                      /> */}
              </figure>
            </div>
            <Editor
              model={this.state.model}
              onModelChange={e =>
                this.setState({
                  model: e
                })
              }
            />
            <button
              style={{ marginTop: 30 }}
              className={
                this.state.loading
                  ? "button is-link is-fullwidth is-loading"
                  : "button is-link is-fullwidth"
              }
            >
              Créer l'article
            </button>
          </form>
          {this.state.error && (
            <NotificationComponent className="is-danger">
              Impossible de créer l'article. Vérifiez les champs
            </NotificationComponent>
          )}
        </div>
      </section>
    );
  }
}

const CATEGORIES_QUERY = gql`
  query {
    allCategories {
      id
      name
    }
  }
`;

const CREATE_ARTICLE = gql`
  mutation createArticle(
    $title: String!
    $description: String!
    $imageId: ID!
    $categoryId: ID!
    $content: String!
  ) {
    createArticle(
      title: $title
      description: $description
      imageId: $imageId
      categoryId: $categoryId
      content: $content
    ) {
      id
      title
    }
  }
`;

export default compose(
  graphql(CATEGORIES_QUERY),
  graphql(CREATE_ARTICLE, {
    name: "createArticle"
  })
)(NewArticle);
