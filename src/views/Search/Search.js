import React, { Component } from 'react';
import { hashHistory } from 'react-router';

class Search extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    // TODO implement search passing query from CNPJ input
    console.log('Search submit');
    hashHistory.push('/dashboard/identificacao');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group">
          <span className="input-group-addon">
            <i className="fa fa-search" />
          </span>
        <input className="form-control" type="text" placeholder="Buscar CNPJ..." />
        </div>
      </form>
    );
  }
}

export default Search;