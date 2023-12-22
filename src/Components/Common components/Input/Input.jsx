/* eslint-disable react/prop-types */
// import React from 'react';

// eslint-disable-next-line react/prop-types
const Input = ({
  id,
  name,
  className,
  type,
  value,
  placeholder,
  style,
  onInput,
  accept,
  required,
}) => {
  return (
    <>
      <input
        name={name}
        type={type}
        id={id}
        className={className}
        value={value}
        placeholder={placeholder}
        onInput={onInput}
        accept={accept}
        style={{ ...style }}
        required={required}
      ></input>
    </>
  );
};

export default Input;
