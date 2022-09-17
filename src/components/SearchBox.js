import React, { useState } from "react";
import "../styles/search-box.css";
const SearchBox = (props) => {
  const { placeholder, name, value, onChange } = props;
  const [focus, setFocus] = useState(false);
  return (
    <div className="search-box">
      <input
        name={name}
        className={focus ? "search-field focus" : "search-field"}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={()=>{setFocus(false)}}
      />
    </div>
  );
};

export default SearchBox;
