import React from "react";

const DropdownItem = ({ onClick, children }) => {
  return <li className="dropdown-item p-0">
    <a className="px-2 py-1 d-block" style={{ cursor: 'pointer' }} onClick={onClick}>{children}</a>
  </li>
}

export default DropdownItem