import React from "react"
import Tippy from "@tippyjs/react"
import 'tippy.js/dist/tippy.css';

const TippyButton = ({ title, className, onClick, children }) => {
  return <Tippy content={title} arrow={true}>
    <button className={className} onClick={onClick}>
      {children}
    </button>
  </Tippy>
}

export default TippyButton