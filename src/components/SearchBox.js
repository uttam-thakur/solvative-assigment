import React from "react";
import "../styles/search-box.css";
const SearchBox = (props) => {
  const { placeholder, name, value, onChange } = props;
  return (
    <div className="search-box">
      <input
        name={name}
        className="search-field"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBox;
