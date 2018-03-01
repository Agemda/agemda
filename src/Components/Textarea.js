import React from "react";

const Textarea = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  row = 3,
  className
}) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <textarea
          name={name}
          className={"textarea " + className}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={row}
        />
      </div>
    </div>
  );
};

export default Textarea;
