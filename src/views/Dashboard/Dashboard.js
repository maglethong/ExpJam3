import React, { Component } from 'react';
import { Card, CardBlock, CardHeader, Col, Row } from 'reactstrap';
import report from '../../report';

import {
  StackedBar,
  // MirrorBar 
} from 'components/Viz';

class Dashboard extends Component {
  state = {
    range: null
  }

  handleSelection = (range) => {
    this.setState({ range });
  }

  render() {
    const { range } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col className="text-center">
          <Card>
            <CardHeader>
              Filtro por tempo
            </CardHeader>

            <CardBlock>
              <StackedBar
                onSelection={this.handleSelection}
                id="stacked-1"
                ticks={2}
                width="900"
                height="120" data={report.historicoCompromissosParceladosPagos} />
            </CardBlock>
          </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <CardHeader>
                Histórico de Pagamentos
              </CardHeader>
              <CardBlock>
                <p className="text-right">
                  <label>Tempo: <select className="form-control">
                    <option>6 meses</option>
                    <option>12 meses</option>
                    <option>2 anos</option>
                  </select></label>
                </p>
                <StackedBar
                range={range}
                id="stacked-2"
                showLegend
                width="900"
                height="500" data={report.historicoCompromissosParceladosPagos} />
              </CardBlock>
            </Card>
          </Col>
          <Col md="6">

          </Col>
        </Row>
      </div>

    )
  }
}

export default Dashboard;
