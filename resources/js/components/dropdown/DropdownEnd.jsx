import React from "react"

const DropdownEnd = ({ children }) => {
  return <div class="dropdown float-end">
    <a href="#" class="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="mdi mdi-dots-vertical"></i>
    </a>
    <div class="dropdown-menu dropdown-menu-end">
      {children}
    </div>
  </div>
}

export default DropdownEnd