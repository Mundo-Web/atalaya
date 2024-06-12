import Tippy from "@tippyjs/react"
import React from "react"

const Dropdown = ({ className, title, icon = {}, children, tippy }) => {
  if (!tippy) {
    return <div className="btn-group">
      <button className={`${className} dropdown-toggle`} data-bs-toggle="dropdown">
        {icon?.icon ? <i className={icon?.icon} style={{ color: icon?.color ?? '#343a40' }}></i> : ''} {title}
      </button>
      <ul className="dropdown-menu">
        {children}
      </ul>
    </div>
  }
  return <Tippy content={tippy} arrow={true}>
    <div className="btn-group">
      <button className={`${className} dropdown-toggle`} data-bs-toggle="dropdown">
        {icon?.icon ? <i className={icon?.icon} style={{ color: icon?.color ?? '#343a40' }}></i> : ''} {title}
      </button>
      <ul className="dropdown-menu">
        {children}
      </ul>
    </div>
  </Tippy>
}

export default Dropdown