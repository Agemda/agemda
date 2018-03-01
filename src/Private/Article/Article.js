import React, { Component, Fragment } from "react";

import { graphql } from "react-apollo";
import gql from "graphql-tag";

import CategorySelector from "./CategorySelector";
import { Input, Textarea, FileInput } from "@ludovicgueth/react-components";

import EditInformations from "./EditInformations";
import EditContent from "./EditContent";

class Article extends Component {
  state = {
    selectedCategoryId: null,
    title: "",
    description: "",
    content: ""
  };

  renderHtml(data) {
    return {
      __html: data
    };
  }

  async updateArticle() {
    try {
      const { data } = this.props.updateArticle({
        variables: {
          title: this.state.title,
          description: this.state.description,
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
      loading: true
    });
    const { title, description, content, categoryId } = this.state;
    if (
      title === "" ||
      description === "" ||
      content === "" ||
      categoryId === "" ||
      categoryId === null
    ) {
      this.setState({
        loading: false,
        error: true
      });
    }
    try {
      //
    } catch (e) {
      console.error(e);
      this.setState({
        loading: false,
        error: true
      });
    }
  }

  render() {
    if (this.props.data.loading) return <div>loading...</div>;
    return (
      <Fragment>
        <EditInformations article={this.props.data.Article} />
        <EditContent
          content={this.props.data.Article.content}
          id={this.props.data.Article.id}
        />
      </Fragment>
    );
  }
}

const ARTICLE_QUERY = gql`
  query article($id: ID!) {
    Article(id: $id) {
      id
      title
      description
      content
      category {
        id
        name
      }
      image {
        id
        url
        name
      }
    }
  }
`;

export default graphql(ARTICLE_QUERY, {
  options: ({ match }) => {
    return {
      variables: {
        id: match.params.id
      }
    };
  }
})(Article);
