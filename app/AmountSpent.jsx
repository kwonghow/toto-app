import React, { Component, PropTypes } from 'react';

class AmountSpent extends Component {
  render() {
    const { amountSpent } = this.props;

    return (
      <p>Total amount spent: ${amountSpent}</p>
    );
  }
}

export default AmountSpent;
