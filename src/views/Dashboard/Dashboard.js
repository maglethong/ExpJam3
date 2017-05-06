import React, { Component } from 'react';

import { StackedBar } from 'components/Viz';

class Dashboard extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <StackedBar />
      </div>
    )
  }
}

export default Dashboard;
