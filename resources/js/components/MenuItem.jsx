import React from 'react'

const MenuItem = ({ href, icon, children }) => {
  return (
    <li>
      <a href={href}>
        <i className={icon}></i>
        <span> {children} </span>
      </a>
    </li>
  )
}

export default MenuItem