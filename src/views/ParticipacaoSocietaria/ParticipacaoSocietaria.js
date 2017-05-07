import React, {Component} from 'react';
import {Card, CardBlock, CardHeader, Col, Row} from 'reactstrap';
import report from '../../report';

import {StackedBar, MirrorBar} from 'components/Viz';

class ParticipacaoSocietaria extends Component {
  state = {
    range: null
  };

  render() {

    const socios = report.controleSocietario.socios.map(s => {
      s.spc = s.spc === null ? 0 : s.spc.valor;
      return s;
    });

    return (
        <div className="animated fadeIn">
          <Row>
            <Col xl="12">
              <Card>
                <CardHeader>
                  Participação Societaria
                </CardHeader>
                <CardBlock>
                  <MirrorBar id="mirror-bar-1" data={socios}/>
                </CardBlock>
              </Card>
            </Col>
          </Row>
        </div>

    )
  }
}

export default ParticipacaoSocietaria;
