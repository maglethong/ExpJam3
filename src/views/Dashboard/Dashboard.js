import React, { Component } from 'react';
import { Card, CardBlock, CardHeader, Col, Row } from 'reactstrap';

import { StackedBar,MirrorBar } from 'components/Viz';

class Dashboard extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col className="text-center">
          <Card>
            <CardHeader>
              Histórico de Pagamentos
            </CardHeader>

            <CardBlock>
              <StackedBar ticks={2} width="300" height="100" />
            </CardBlock>
          </Card>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                Histórico de Pagamentos
              </CardHeader>

              <CardBlock>
                <StackedBar showLegend width="650" height="500" />
              </CardBlock>
            </Card>
          </Col>
          <Col xl="4">
            <Card>
              <CardHeader>
                Participação Societaria
              </CardHeader>
              <CardBlock>
                  <MirrorBar id="mirror-bar-1" />
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </div>

    )
  }
}

export default Dashboard;
