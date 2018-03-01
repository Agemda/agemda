import React from "react";

const Input = ({
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  className
}) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input
          className={"input " + className}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Input;

{
  /* const Input = ({
  name,
  label,
  type,
  value,
  onChange,
  placeholder,
  onlyInput,
  isDanger = false
}) => {
  if (onlyInput) {
    return (
      <input
        name={name}
        className={isDanger ? "input is-danger" : "input"}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  }
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input
          name={name}
          className={isDanger ? "input is-danger" : "input"}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default Input; */
}
