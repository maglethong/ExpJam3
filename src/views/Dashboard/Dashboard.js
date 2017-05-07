import React, { Component } from 'react';
import { Card, CardBlock, CardHeader, Col, Row } from 'reactstrap';

import { StackedBar, MirrorBar } from 'components/Viz';

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
              Histórico de Pagamentos
            </CardHeader>

            <CardBlock>
              <StackedBar
                onSelection={this.handleSelection}
                id="stacked-1"
                ticks={2}
                width="900"
                height="120" />
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
                <StackedBar
                range={range}
                id="stacked-2"
                showLegend
                width="650"
                height="500" />
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
