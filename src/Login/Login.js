import React, { Component } from "react";

import { Redirect } from "react-router";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";

import Input from "../Components/Input";

class Login extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
    error: false
  };

  async signinUser() {
    try {
      const { data } = await this.props.signinUser({
        variables: {
          email: this.state.email,
          password: this.state.password
        }
      });
      return data.signinUser;
    } catch (e) {
      throw e;
    }
  }

  async onSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true, error: false });
    try {
      const { token } = await this.signinUser();
      localStorage.setItem("token", token);
      window.location.reload();
    } catch (e) {
      this.setState({
        error: true
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    const { loading, error, user } = this.props.data;
    if (loading) return <div>loading...</div>;
    if (error) return <div>error...</div>;
    if (user) return <Redirect to="/" />;
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half is-offset-one-quarter">
              <h2 className="title is-2">Se connecter</h2>
              <form onSubmit={e => this.onSubmit(e)}>
                <Input
                  label="Login"
                  name="login"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
                <Input
                  label="Mot de passe"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                />
                <button
                  className={
                    this.state.loading
                      ? "button is-info is-fullwidth is-loading"
                      : "button is-info is-fullwidth"
                  }
                  type="submit"
                >
                  Connexion
                </button>
              </form>
              {this.state.error && (
                <div
                  className="notification is-danger"
                  style={{ marginTop: 20 }}
                >
                  Mauvais mot de passe
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
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

const SIGNIN_USER_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
    }
  }
`;

export default compose(
  graphql(USER_QUERY),
  graphql(SIGNIN_USER_MUTATION, {
    name: "signinUser"
  })
)(Login);
