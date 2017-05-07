import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

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

  render() {
    return (
      <header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" onClick={this.mobileSidebarToggle} type="button">&#9776;</button>
        <a className="navbar-brand" href="#"></a>
        <ul className="nav navbar-nav d-md-down-none mr-auto">
          <li className="nav-item px-3">
            <IndexLink to="/"
            className="nav-link"
            activeClassName="active">Principal</IndexLink>
          </li>
          <li>
            <Link to="/example"
            className="nav-link"
            activeClassName="active">Example</Link>
          </li>
        </ul>
      </header>
    )
  }
}

export default Header;
