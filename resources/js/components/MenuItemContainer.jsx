import React from 'react'

const MenuItemContainer = ({ title, icon, children }) => {
  const id = `item-${crypto.randomUUID()}`
  return (
    <li>
      <a href={`#${id}`} data-bs-toggle="collapse">
        <i className={icon}></i>
        <span> {title} </span>
        <span className="menu-arrow"></span>
      </a>
      <div className="collapse" id={id}>
        <ul className="nav-second-level">
          {children}
        </ul>
      </div>
    </li>
  )
}

export default MenuItemContainer