import React, { Component } from 'react';
import { Card, CardBlock, CardHeader, Col, Row } from 'reactstrap';

import { StackedBar,MirrorBar } from 'components/Viz';

class Dashboard extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                Histórico de Pagamentos
              </CardHeader>

              <CardBlock>
                <div><StackedBar width="650" height="500" /></div>
              </CardBlock>
            </Card>
          </Col>
          <Col xl="4">
            <Card>
              <CardHeader>
                Participação Societaria
              </CardHeader>
              <CardBlock>
                  <MirrorBar />
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </div>

    )
  }
}

export default Dashboard;
