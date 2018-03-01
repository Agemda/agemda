import React, { Component } from "react";

import { NavLink } from "react-router-dom";

export default class Navigation extends Component {
  state = {};
  _logout = () => {
    window.localStorage.removeItem("token");
    window.location.reload();
  };

  _toggleMenu() {
    const menuIcon = document.getElementById("menuIcon");
    const menu = document.getElementById("menu");
    if (menuIcon.classList.contains("is-active")) {
      menuIcon.classList.remove("is-active");
      menu.classList.remove("is-active");
    } else {
      menuIcon.classList.add("is-active");
      menu.classList.add("is-active");
    }
  }

  render() {
    return (
      <div className="navbar">
        <div className="navbar-brand">
          <a href="/" className="navbar-item">
            <img src="https://www.aurlom.com/wp-content/uploads/2011/04/EM_Strasbourg_Business_School-1024x397.png" />
          </a>
          <div
            className="navbar-burger"
            id="menuIcon"
            onClick={() => this._toggleMenu()}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div
          className="navbar-menu"
          id="menu"
          onClick={() => this._toggleMenu()}
        >
          {this.props.pages.map((page, key) => {
            return (
              <NavLink
                key={key}
                to={page.url}
                className="navbar-item"
                activeClassName="is-active"
                exact
              >
                {page.name}
              </NavLink>
            );
          })}
          <div className="navbar-end">
            <a className="navbar-item" onClick={this._logout}>
              <span className="icon">
                <i className="fa fa-power-off" aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
