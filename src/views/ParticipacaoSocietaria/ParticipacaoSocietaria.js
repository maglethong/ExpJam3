import React, { Component } from 'react';
import { Card, CardBlock, CardHeader, Col, Row } from 'reactstrap';

import { StackedBar, MirrorBar } from 'components/Viz';

class ParticipacaoSocietaria extends Component {
  state = {
    range: null
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl="12">
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

export default ParticipacaoSocietaria;
