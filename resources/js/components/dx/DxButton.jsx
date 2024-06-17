import Tippy from "@tippyjs/react";
import React, { useEffect, useRef } from "react";

const DxButton = ({ eRef, className, title, children, onClick, ...props }) => {

  eRef.current = $('<div>')
    .dxButton({
      icon: 'fa fa-pen',
      elementAttr: {
        class: className,
        title: title,
        ...props
      },
      onClick: onClick
    }).html(children)


    return eRef.current
  //   .appendTo(container);
}

export default DxButton