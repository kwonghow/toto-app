import React, { Component, PropTypes } from 'react';

class AmountSpent extends Component {
  static propTypes = {
    amountEarned: PropTypes.number,
    amountSpent: PropTypes.number
  };

  render() {
    const { amountEarned, amountSpent } = this.props;

    return (
      <div>
        <p>Total amount spent: ${amountSpent}</p>
        <p>Total amount earned: ${amountEarned}</p>
        <p>Balance: ${amountSpent - amountEarned}</p>
      </div>
    );
  }
}

export default AmountSpent;
