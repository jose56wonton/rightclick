import React, { Component } from 'react';
import TabComponent from '../../components/general/tab-component';
class TabContainer extends Component {  
  render() {
    // "Stats"
    const tabs = ["League","Matches"]  
    return (
      <TabComponent handleTabChange={this.props.handleTabChange} current={this.props.current} tabs={tabs} />
    );
  }
}

export default TabContainer;
