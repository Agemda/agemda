import React, { Component } from "react";

import { graphql } from "react-apollo";
import gql from "graphql-tag";

import Editor from "../Editor/Editor";
import NotificationComponent from "@ludovicgueth/react-components/lib/Components/NotificationComponent";

class EditContent extends Component {
  state = {
    content: this.props.content,
    loading: false,
    error: false
  };

  async updateArticle() {
    try {
      const { data } = await this.props.updateArticle({
        variables: {
          id: this.props.id,
          content: this.state.content
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
    if (this.state.content === "") {
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
            <h2 className="title is-2">Modifier le contenu de l'article</h2>
            <Editor
              model={this.state.content}
              onModelChange={e => {
                console.log(e);
                this.setState({ content: e });
              }}
            />
            <button
              type="submit"
              className={
                this.state.loading
                  ? "button is-info is-fullwidth is-loading"
                  : "button is-info is-fullwidth"
              }
              style={{ marginTop: 30, marginBottom: 30 }}
            >
              Modifier le contenu
            </button>
            {this.state.error && (
              <NotificationComponent className="is-danger">
                Vous ne pouvez pas modifier l'article.
              </NotificationComponent>
            )}
          </form>
        </div>
      </section>
    );
  }
}

const UPDATE_ARTICLE_CONTENT = gql`
  mutation updateArticle($id: ID!, $content: String!) {
    updateArticle(id: $id, content: $content) {
      id
    }
  }
`;

export default graphql(UPDATE_ARTICLE_CONTENT, {
  name: "updateArticle"
})(EditContent);
