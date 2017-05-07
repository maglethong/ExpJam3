import React, { Component } from 'react';

class Search extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    // TODO implement search passing query from CNPJ input
    console.log('Search submit');
    this.props.router.push('/dashboard/identificacao');
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card-group mb-0">
              <div className="card p-4">
                <div className="card-block">
                  <h1>Buscar Pessoa Jurídica</h1>
                  <p className="text-muted">Para buscar informações sobre uma Pessoa Jurídica, digite o CPNJ</p>
                  <form onSubmit={this.handleSubmit}>
                    <div className="input-group mb-3">
                      <span className="input-group-addon"><i className="fa fa-search" /></span>
                      <input name="cnpj" type="text" className="form-control" placeholder="CNPJ"/>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <button type="submit" className="btn btn-primary px-4">Buscar</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;