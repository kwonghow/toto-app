import React, { Component, PropTypes } from 'react';

class AmountSpent extends Component {
  static propTypes = {
    amountEarned: PropTypes.number,
    amountSpent: PropTypes.number
  };

  render() {
    const { amountEarned, amountSpent } = this.props;

    const balance = amountEarned - amountSpent;

    return (
      <div>
        <p>Total amount spent: ${amountSpent}</p>
        <p>Total amount earned: ${amountEarned}</p>
        <p>Balance: {balance < 0 ? '-' : ''}${balance < 0 ? -balance : balance}</p>
      </div>
    );
  }
}

export default AmountSpent;
