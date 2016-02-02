import React, { Component, PropTypes } from 'react';

class Results extends Component {
  static propTypes = {
    additionalNumber: PropTypes.number,
    chosenNumbers: PropTypes.array,
    prizeGroup: PropTypes.string,
    winningNumbers: PropTypes.array
  };

  render() {
    const { additionalNumber, chosenNumbers, prizeGroup, winningNumbers } = this.props;

    if (!additionalNumber && !winningNumbers) {
      return <span />;
    }

    return (
      <div>
        <p><strong>Winning Numbers:</strong> {winningNumbers ? winningNumbers.join(', ') : ''}</p>
        <p><strong>Additional Number:</strong> {additionalNumber}</p>
        <p><strong>Prize Group:</strong> { prizeGroup.length ? prizeGroup : 'Better luck next time!'}</p>
      </div>
    );
  }
}

export default Results;
