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
    range: null,
    brushRange: [680, 800]
  }

  handleSelection = (range) => {
    this.setState({ range });
  }

  handleChange = (e) => {
    let brushRange;
    switch (e.target.value) {
      case "2":
        brushRange = [500, 800]
      break;
      case "3":
        brushRange = [250, 800]
      break;
      default:
        brushRange = [680, 800]
    }

    this.setState({ brushRange });
  }

  render() {
    const { range, brushRange } = this.state;

    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col text-center">
            <Card>
              <CardHeader>
                Filtro por tempo
                <div className="float-right">
                  <label>
                    <select className="form-control" onChange={this.handleChange}>
                    <option value="1">6 meses</option>
                    <option value="2">12 meses</option>
                    <option value="3">2 anos</option>
                  </select>
                  </label>
                </div>
              </CardHeader>
              <CardBlock>
                <StackedBar
                  onSelection={this.handleSelection}
                  brushRange={brushRange}
                  id="stacked-1"
                  ticks={2}
                  width="900"
                  height="120" data={report.historicoCompromissosParceladosPagos} />
              </CardBlock>
            </Card>
          </div>
        </div>
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
