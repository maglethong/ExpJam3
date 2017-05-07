import React, { Component } from 'react';

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.router.push('/dashboard');
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card-group mb-0">
              <div className="card p-4">
                <div className="card-block">
                  <h1>Acesso ferramenta</h1>
                  <p className="text-muted">Para acessar <b>a melhor ferramenta de análise do mercado</b>, preencha abaixo:</p>
                  <form onSubmit={this.handleSubmit}>
                    <div className="input-group mb-3">
                      <span className="input-group-addon"><i className="icon-user"></i></span>
                      <input type="text" className="form-control" placeholder="Login"/>
                    </div>
                    <div className="input-group mb-4">
                      <span className="input-group-addon"><i className="icon-lock"></i></span>
                      <input type="password" className="form-control" placeholder="Senha"/>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <button type="submit" className="btn btn-primary px-4">Entrar</button>
                      </div>
                      <div className="col-6 text-right">
                        <button type="button" className="btn btn-link px-0">Esqueceu a senha?</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="card card-inverse card-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                <div className="card-block text-center">
                  <div>
                    <h2>Meu primeiro acesso</h2>
                    <p>Ainda não criou uma conta? É fácil!</p>
                    <button type="button" className="btn btn-primary active mt-3">Criar uma conta!</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
