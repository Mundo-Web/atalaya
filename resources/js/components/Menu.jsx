import React from 'react'
import Logout from '../actions/Logout'
import MenuItem from './MenuItem'
import MenuItemContainer from './MenuItemContainer'

const Menu = ({ session, can }) => {
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

        <p className="text-muted left-user-info">@{session.username}</p>

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
            can('clients.list', 'clients.all') &&
            <MenuItem href="/clients" icon='mdi mdi-account-group'>Clientes</MenuItem>
          }
          {
            can('leads.list', 'leads.all') &&
            <MenuItem href="/leads" icon='mdi mdi-page-next'>Leads</MenuItem>
          }
          {
            can('projects.list', 'projects.all', 'types.list', 'types.all') &&
            <MenuItemContainer title='Proyectos' icon='mdi mdi-view-dashboard'>
              {
                can('projects.list', 'projects.all') &&
                <MenuItem href="/projects" icon='mdi mdi-page-next'>Proyectos</MenuItem>
              }
              {
                can('types.list', 'types.all') &&
                <MenuItem href="/types" icon='mdi mdi-format-list-text'>Tipos</MenuItem>
              }
            </MenuItemContainer>
          }

          {
            can('users.list', 'users.all', 'roles.list', 'roles.all', 'permissions.list', 'permissions.all') &&
            <MenuItemContainer title='Usuarios y roles' icon='mdi mdi-account-lock'>
              {
                can('users.list', 'users.all') &&
                <MenuItem href="/users" icon='mdi mdi-account'>Usuarios</MenuItem>
              }
              {
                can('roles.list', 'roles.all') &&
                <MenuItem href="/roles" icon='mdi mdi-account-convert'>Roles</MenuItem>
              }
              {
                can('permissions.list', 'permissions.all') &&
                <MenuItem href="/permissions" icon='mdi mdi-account-check'>Permisos</MenuItem>
              }
            </MenuItemContainer>
          }

          {
            can('tables.list', 'tables.all', 'statuses.list', 'statuses.all') &&
            <MenuItemContainer title='Mantenimiento' icon='mdi mdi-application-cog'>
              {
                can('tables.list', 'tables.all') &&
                <MenuItem href='/tables' icon='mdi mdi-table'>Tablas</MenuItem>
              }
              {
                can('statuses.list', 'statuses.all') &&
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