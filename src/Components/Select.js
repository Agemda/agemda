import React, { Component } from "react";

const Select = ({ label = null, className = "", children, name = "" }) => {
  return (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <div className="control">
        <div className={"select" + className}>
          <select name={name}>{children}</select>
        </div>
      </div>
    </div>
  );
};

export default Select;
