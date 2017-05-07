import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <a href="#">Rocket Team</a> &copy; {new Date().getUTCFullYear()}
        <span className="float-right">Powered by <a href="https://www.serasaexperian.com.br">Serasa Experian</a></span>
      </footer>
    )
  }
}

export default Footer;
