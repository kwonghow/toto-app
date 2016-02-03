import React, { Component, PropTypes } from 'react';

class Results extends Component {
  static propTypes = {
    additionalNumber: PropTypes.number,
    chosenNumbers: PropTypes.array,
    prizeAmount: PropTypes.number,
    prizeGroup: PropTypes.string,
    winningNumbers: PropTypes.array
  };

  renderWinningNumbers() {
    const { winningNumbers } = this.props;
    let result = [];

    for (let i = 0; i < 6; i++) {
      result = result.concat(<td key={i}>{winningNumbers[i]}</td>);
    }

    return result;
  }

  render() {
    const { additionalNumber, chosenNumbers, prizeAmount, prizeGroup, winningNumbers } = this.props;

    if (!additionalNumber && !winningNumbers) {
      return <span />;
    }

    return (

      <div className="row results">
        <div className="col-sm-offset-4 col-sm-4">
          <table className="table results__table results__table--winning-numbers">
            <thead>
              <tr>
                <th colSpan="6">Winning Numbers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {this.renderWinningNumbers()}
              </tr>
            </tbody>
          </table>
          <table className="table results__table results__table--additional-number">
            <thead>
              <tr>
                <th colSpan="6">Additional Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{additionalNumber}</td>
              </tr>
            </tbody>
          </table>
          <p><strong>Prize Group:</strong> { prizeGroup.length ? `${prizeGroup}. Won $${prizeAmount}!` : 'Better luck next time!'}</p>
        </div>
      </div>
    );
  }
}

export default Results;
