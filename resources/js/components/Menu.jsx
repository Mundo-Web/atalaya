import React from 'react'
import Logout from '../actions/Logout'
import MenuItem from './MenuItem'
import MenuItemContainer from './MenuItemContainer'
import Tippy from '@tippyjs/react'

const Menu = ({ session, can }) => {
  const mainRole = session.roles[0]
  return (<div className="left-side-menu">

    <div className="h-100" data-simplebar>


      <div className="user-box text-center">

        <img src="/assets/img/user-404.svg" alt={session.name} title={session.name}
          className="rounded-circle img-thumbnail avatar-md" style={{ backgroundColor: 'unset', borderColor: '#98a6ad' }} />
        <div className="dropdown">
          <a href="#" className="user-name dropdown-toggle h5 mt-2 mb-1 d-block" data-bs-toggle="dropdown"
            aria-expanded="false">{session.name} {session.lastname}</a>
          <div className="dropdown-menu user-pro-dropdown">


            <a href="#" className="dropdown-item notify-item">
              <i className="fe-user me-1"></i>
              <span>Mi cuenta</span>
            </a>

            <a href="#" className="dropdown-item notify-item right-bar-toggle">
              <i className="fe-settings me-1"></i>
              <span>Configuracion</span>
            </a>

            {/* <a href="#" className="dropdown-item notify-item">
              <i className="fe-lock me-1"></i>
              <span>Lock Screen</span>
            </a> */}

            <a href="#" className="dropdown-item notify-item" onClick={Logout}>
              <i className="fe-log-out me-1"></i>
              <span>Cerrar sesion</span>
            </a>

          </div>
        </div>

        <Tippy content={mainRole.description} arrow={true}>
          <p className="text-muted left-user-info" >{mainRole.name}</p>
        </Tippy>

        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="#" className="text-muted left-user-info">
              <i className="mdi mdi-cog"></i>
            </a>
          </li>

          <li className="list-inline-item">
            <a href="#">
              <i className="mdi mdi-power"></i>
            </a>
          </li>
        </ul>
      </div>


      <div id="sidebar-menu" className='show'>

        <ul id="side-menu">
          <li className="menu-title">Panel de navegacion</li>
          <MenuItem href="/home" icon='mdi mdi-home'>Inicio</MenuItem>
          {
            can('clients', 'root', 'all', 'list') &&
            <MenuItem href="/clients" icon='mdi mdi-account-group'>Clientes</MenuItem>
          }
          {
            can('leads', 'root', 'all', 'list') &&
            <MenuItem href="/leads" icon='mdi mdi-page-next'>Leads</MenuItem>
          }
          {
            (can('projects', 'root', 'all', 'list') || can('projects', 'root', 'all', 'create')) &&
            <MenuItemContainer title='Proyectos' icon='mdi mdi-view-dashboard'>
              {
                can('projects', 'root', 'all', 'list') &&
                <MenuItem href="/projects" icon='mdi mdi-page-next'>Proyectos</MenuItem>
              }
              {
                can('types', 'root', 'all', 'list') &&
                <MenuItem href="/types" icon='mdi mdi-format-list-text'>Tipos</MenuItem>
              }
            </MenuItemContainer>
          }

          {
            (can('users', 'root', 'all', 'list') || can('roles', 'root', 'all', 'list') || can('permissions', 'root', 'all', 'list')) &&
            <MenuItemContainer title='Usuarios y roles' icon='mdi mdi-account-lock'>
              {
                can('users', 'root', 'all', 'list') &&
                <MenuItem href="/users" icon='mdi mdi-account'>Usuarios</MenuItem>
              }
              {
                can('roles', 'root', 'all', 'list') &&
                <MenuItem href="/roles" icon='mdi mdi-account-convert'>Roles</MenuItem>
              }
              {
                can('permissions', 'root', 'all', 'list') &&
                <MenuItem href="/permissions" icon='mdi mdi-account-check'>Permisos</MenuItem>
              }
            </MenuItemContainer>
          }

          {
            (can('tables', 'root', 'all', 'list') || can('statuses', 'root', 'all', 'list')) &&
            <MenuItemContainer title='Mantenimiento' icon='mdi mdi-application-cog'>
              {
                can('tables', 'root', 'all', 'list') &&
                <MenuItem href='/tables' icon='mdi mdi-table'>Tablas</MenuItem>
              }
              {
                can('statuses', 'root', 'all', 'list') &&
                <MenuItem href='/statuses' icon='mdi mdi-table'>Estados</MenuItem>
              }
            </MenuItemContainer>
          }
        </ul>

      </div>


      <div className="clearfix"></div>

    </div>


  </div>)
}

export default Menu