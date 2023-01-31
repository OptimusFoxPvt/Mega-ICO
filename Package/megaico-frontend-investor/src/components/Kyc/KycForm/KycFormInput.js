import React from "react";

const KycFormInput = ({
  require,
  name,
  label,
  type,
  value,
  error,
  onChange,
  min,
  max,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        max={max}
        min={min}
        required={require}
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type={type}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default KycFormInput;
