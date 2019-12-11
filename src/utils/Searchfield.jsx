import React, { useState, useEffect } from "react";

import { ReactComponent as XIcon } from "../assets/FontAwesome/times-solid.svg";
import "./Searchfield.scss";

const Searchfield = props => {
  const [filterdDropdown, setFilterdDropdown] = useState(props.dropdownItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showClear, setShowClear] = useState(false);

  useEffect(() => {
    setFilterdDropdown(props.dropdownItems);
  }, [props.dropdownItems]);

  const onChange = e => {
    if (!showDropdown && props.dropdownItems != null) setShowDropdown(true);
    if (!showClear) setShowClear(true);

    setSearchTerm(e.target.value);
    if (props.dropdownItems != null) {
      setFilterdDropdown(
        props.dropdownItems.filter(item =>
          item.value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (props.onChange) props.onChange(e.target.value);
  };

  const onClickHandler = item => {
    setSearchTerm(item.value);
    setShowDropdown(false);

    props.onSearch(item);
  };

  const onClearClickHandler = () => {
    setSearchTerm("");
    setShowDropdown(false);
    setShowClear(false);
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
        {showClear && (
          <button type="reset" className="clear" onClick={onClearClickHandler}>
            <XIcon />
          </button>
        )}
      </div>
      {showDropdown && (
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
      )}
    </div>
  );
};

export default Searchfield;
