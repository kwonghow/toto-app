import React, { Component, PropTypes } from 'react';

class AmountSpent extends Component {
  static propTypes = {
    amountEarned: PropTypes.number,
    amountSpent: PropTypes.number
  };

  renderBalance() {
    const { amountEarned, amountSpent } = this.props;

    const balance = amountEarned - amountSpent;
    const positive = balance >= 0;

    const style = {
      color: positive ? '#007f00' : '#df0000',
      fontWeight: 600
    };
    return <span style={style}>{positive ? `$${balance}` : `-$${-balance}`}</span>;
  }

  render() {
    const { amountEarned, amountSpent } = this.props;

    return (
      <div>
        <p>Total amount spent: ${amountSpent}</p>
        <p>Total amount earned: ${amountEarned}</p>
        <p>Balance: {this.renderBalance()}</p>
      </div>
    );
  }
}

export default AmountSpent;
