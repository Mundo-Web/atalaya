import React from "react";

const DropdownItem = ({ onClick, children }) => {
  return <li className="dropdown-item">
    <a style={{ cursor: 'pointer' }} onClick={onClick}>{children}</a>
  </li>
}

export default DropdownItem