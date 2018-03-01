import React, { Component } from "react";

import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { Select } from "@ludovicgueth/react-components";
import { LoadingComponent } from "@ludovicgueth/react-components/lib";

class CategorySelector extends Component {
  state = {};
  render() {
    if (this.props.data.loading) return <LoadingComponent />;
    return (
      <Select
        label="Catégorie"
        value={this.props.categoryId}
        onChange={e => this.props.setCategoryId(e)}
      >
        {this.props.data.allCategories.map(category => {
          return (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          );
        })}
      </Select>
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

export default graphql(CATEGORIES_QUERY)(CategorySelector);
