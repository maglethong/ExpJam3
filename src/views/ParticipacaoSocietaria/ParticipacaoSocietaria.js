import React, {Component} from 'react';
import {Card, CardBlock, CardHeader} from 'reactstrap';
import report from '../../report';

import {StackedBar, MirrorBar} from 'components/Viz';

const socios = report.controleSocietario.socios.map(s => {
  s.spc = s.spc === null ? 0 : s.spc.valor;
  return s;
});

const CardList = React.createClass({
  render: function () {
    return ( <div>
      { this.props.data.map(function (socio) {
        return (
            <Card style={{margin: 10}}>
              <CardBlock>
                <div className="h1 text-muted text-right mb-2">
                  <i className="icon-people" />
                </div>
                <h5 style={{display: "inline"}}>{socio.nome}</h5>
                <div className="float-right">{socio.cpf}{socio.cnpj}</div>
                <p className="mb-0"><small className="text-muted text-uppercase font-weight-bold">SPC</small></p>
                <div className="progress progress-xs mt-1 mb-0">
                  <div className="progress-bar bg-danger" role="progressbar" style={{width:socio.spc}} aria-valuenow={socio.spc} aria-valuemin="0" aria-valuemax="1" />
                </div>
              </CardBlock>
            </Card>
        )
      })
      }
      </div>
    )
  }
});

class ParticipacaoSocietaria extends Component {
  state = {
    range: null
  };

  render() {
    return (
        <div className="animated fadeIn">
          <div className="row">
            <div className="col-sm-12">
              <Card>
                <CardHeader>
                  Participação Societaria
                </CardHeader>
                <div className="row">
                  <div className="col-sm-8">
                    <CardBlock>
                      <MirrorBar id="mirror-bar-1" data={socios}/>
                    </CardBlock>
                  </div>
                  <div className="col-sm-4">
                    <CardList data={socios}/>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

    )
  }
}

export default ParticipacaoSocietaria;
