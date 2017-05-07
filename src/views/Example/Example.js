import React, { Component } from 'react';
import { Card, CardBlock, CardHeader, Col, Row } from 'reactstrap';

class Example extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                Example 1
              </CardHeader>
              <CardBlock>
                Content 1
              </CardBlock>
            </Card>
          </Col>
          <Col xl="4">
            <Card>
              <CardHeader>
                Example 2
              </CardHeader>
              <CardBlock>
                Content 2
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Example;
