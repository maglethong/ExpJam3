import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import Search from 'views/Search';

class Header extends Component {

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  search(e) {
    e.preventDefault();
    console.log('Search');
  }

  render() {
    return (
      <header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" onClick={this.mobileSidebarToggle} type="button">&#9776;</button>
        <a className="navbar-brand" href="#"></a>
        <ul className="nav navbar-nav d-md-down-none mr-auto">
          <li className="nav-item px-3">
            <IndexLink to="/dashboard"
                  className="nav-link"
                  activeClassName="active">Buscar</IndexLink>
          </li>
          <li className="nav-item px-3">
            <Link to="/dashboard/home"
            className="nav-link"
            activeClassName="active">Principal</Link>
          </li>
          <li className="nav-item px-3">
            <Link to="/dashboard/identificacao"
            className="nav-link"
            activeClassName="active">Identificação</Link>
          </li>
          <li className="nav-item px-3">
            <Link to="/dashboard/participacao-societaria"
            className="nav-link"
            activeClassName="active">Participação Societária</Link>
          </li>
        </ul>
      </header>
    )
  }
}

export default Header;
