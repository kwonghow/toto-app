import React, { Component, PropTypes } from 'react';

import { isChosen } from 'helpers/NumberHelper';

class Results extends Component {
  static propTypes = {
    chosenNumbers: PropTypes.array,
    prizeAmount: PropTypes.number,
    results: PropTypes.shape({
      additionalNumber: PropTypes.number,
      winningNumbers: PropTypes.array
    })
  };

  renderWinningNumbers() {
    const { chosenNumbers, results } = this.props;
    const { winningNumbers } = results;

    let result = [];

    for (let i = 0; i < 6; i++) {
      const className = isChosen(chosenNumbers, winningNumbers[i]) ? 'chosen' : '';
      result = result.concat(<td key={i} className={className}>{winningNumbers[i]}</td>);
    }

    return result;
  }

  render() {
    const { chosenNumbers, prizeAmount, results } = this.props;

    if (!results) {
      return <span />;
    }

    const { additionalNumber } = results;

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
                <td className={isChosen(chosenNumbers, additionalNumber) ? 'chosen' : ''}>{additionalNumber}</td>
              </tr>
            </tbody>
          </table>
          <p><strong>Prize Amount:</strong> { prizeAmount > 0 ? `Won $${prizeAmount}!` : 'Better luck next time!'}</p>
        </div>
      </div>
    );
  }
}

export default Results;
