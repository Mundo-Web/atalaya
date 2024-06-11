import React from 'react'
import RigthBar from './RightBar'
import NavBar from './NavBar'
import Menu from './Menu'
import Footer from './Footer'

const Adminto = ({ session, children, title , can}) => {
  return (<>
    <div id="wrapper">
      <NavBar session={session} title={title} can={can} />
      <Menu session={session} can={can} />
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            {children}
          </div>
        </div>
        <Footer/>

      </div>
    </div>
    <RigthBar />
    <div className="rightbar-overlay"></div>
  </>)
}

export default Adminto