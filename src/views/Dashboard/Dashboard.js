import React, { Component } from 'react';
import { Card, CardBlock, CardHeader, Col, Row } from 'reactstrap';
import report from '../../report';

import {
  StackedBar,
  BarLine
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
                Financeiro - Histórico de Pagamentos
              </CardHeader>
              <CardBlock>
                <StackedBar
                range={range}
                id="stacked-2"
                showLegend
                width="900"
                height="300" data={report.historicoCompromissosParceladosPagos} />
              </CardBlock>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardHeader>
                Mercantil - Histórico de Pagamentos
              </CardHeader>
              <CardBlock>
                <StackedBar
                    range={range}
                    id="stacked-3"
                    showLegend
                    width="900"
                    height="300" data={report.historicoPagamentosMercado} />
              </CardBlock>
            </Card>

          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <CardHeader>
                Financeiro - Histórico de Compromissos Parcelados
              </CardHeader>
              <CardBlock>
                <BarLine
                    range={range}
                    id="bar-1"
                    showLegend
                    width="900"
                    height="300" data={report.historicoCompromissosParceladosAndamento} />
              </CardBlock>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardHeader>
                Mercantil - Histórico de Pagamentos
              </CardHeader>
              <CardBlock>
                <BarLine
                    range={range}
                    id="bar-2"
                    showLegend
                    width="900"
                    height="300" data={report.evolucaoCompromissoMercado} />
              </CardBlock>
            </Card>

          </Col>
        </Row>
      </div>

    )
  }
}

export default Dashboard;
