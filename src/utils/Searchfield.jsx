import React, { useState, useEffect } from "react";

import "./Searchfield.scss";

const Searchfield = props => {
  const [filterdDropdown, setFilterdDropdown] = useState(props.dropdownItems);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setFilterdDropdown(props.dropdownItems);
  }, [props.dropdownItems]);

  const onChange = e => {
    setSearchTerm(e.target.value);
    setFilterdDropdown(
      props.dropdownItems.filter(item =>
        item.value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const onClickHandler = item => {
    setSearchTerm(item.value);

    props.onSearch(item);
  };

  return (
    <div className="searchfield">
      <div className="title">{props.title}</div>
      <div className="input">
        <input
          type="text"
          placeholder={props.placeholder}
          onChange={onChange}
          value={searchTerm}
        />
        {/* <button type="button">Suchen</button> */}
      </div>
      <div className="dropdown">
        {filterdDropdown.map(item => {
          return (
            <div key={item.key} onClick={() => onClickHandler(item)}>
              {item.icon != null && <span className="icon">{item.icon}</span>}
              {item.value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Searchfield;
