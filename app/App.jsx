import findIndex from 'lodash/array/findIndex';
import React, { Component } from 'react';

import { getRandomInt, getRandomIntSet } from 'helpers/NumberHelper';

import AmountSpent from './AmountSpent';
import Better from './Better';
import Results from './Results';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      amountEarned: 0,
      amountSpent: 0,
      prizePool: 12000000
    };
  }

  evaluateMatches(chosenNumbers, winningNumbers, additionalNumber) {
    let matchCount = 0;

    winningNumbers.map((result) => {
      if (findIndex(chosenNumbers, (chosenNumber) => chosenNumber === result) !== -1) {
        matchCount++;
      }
    });

    const isAdditionalNumberMatched = (findIndex(chosenNumbers, (chosenNumber) => chosenNumber === additionalNumber) !== -1) ? true : false;

    return { isAdditionalNumberMatched, matchCount };
  }

  evaluateWinnings(chosenNumbers, winningNumbers, additionalNumber) {
    const {
      isAdditionalNumberMatched,
      matchCount
    } = this.evaluateMatches(chosenNumbers, winningNumbers, additionalNumber);
    const { prizePool } = this.state;

    switch (matchCount) {
      case 0:
      case 1:
      case 2:
        return {
          prizeAmount: 0,
          prizeGroup: ''
        };

      case 3:
        return {
          prizeAmount: isAdditionalNumberMatched ? 25 : 10,
          prizeGroup: isAdditionalNumberMatched ? 'Group 6' : 'Group 7'
        };

      case 4:
        return {
          prizeAmount: isAdditionalNumberMatched ? 0.03 * prizePool : 50,
          prizeGroup: isAdditionalNumberMatched ? 'Group 4' : 'Group 5'
        };

      case 5:
        return {
          prizeAmount: isAdditionalNumberMatched ? 0.08 * prizePool : 0.055 * prizePool,
          prizeGroup: isAdditionalNumberMatched ? 'Group 2' : 'Group 3'
        };

      case 6:
        return {
          prizeAmount: 0.38 * prizePool > 1000000 ? 0.38 * prizePool : 1000000,
          prizeGroup: 'Group 1 (Jackpot)'
        };

      default:
        // Do nothing
    }

  }

  generateDrawResults() {
    let additionalNumber = getRandomInt(1, 49);
    const winningNumbers = getRandomIntSet(6, 1, 49);

    while (findIndex(winningNumbers, (number) => number === additionalNumber) !== -1) {
      additionalNumber = getRandomInt(1, 49);
    }

    return { additionalNumber, winningNumbers };
  }

  handleSubmit(chosenNumbers) {
    const { additionalNumber, winningNumbers } = this.generateDrawResults();

    const { prizeAmount, prizeGroup } = this.evaluateWinnings(chosenNumbers, winningNumbers, additionalNumber);

    this.setState({
      additionalNumber,
      chosenNumbers,
      amountEarned: this.state.amountEarned + prizeAmount,
      amountSpent: this.state.amountSpent + 7,
      prizeAmount,
      prizeGroup,
      winningNumbers,
    });
  }

  render() {
    const {
      additionalNumber,
      amountEarned,
      amountSpent,
      chosenNumbers,
      prizeAmount,
      prizeGroup,
      winningNumbers
    } = this.state;

    return (
      <div className="container text-center">
        <Better onSubmit={this.handleSubmit} />
        <AmountSpent amountEarned={amountEarned} amountSpent={amountSpent} />
        <Results
          additionalNumber={additionalNumber}
          chosenNumbers={chosenNumbers}
          winningNumbers={winningNumbers}
          prizeAmount={prizeAmount}
          prizeGroup={prizeGroup} />
        <aside className="col-xs-12 text-center">
          <div className="a2a_kit a2a_kit_size_32 a2a_default_style" style={{display: 'inline-block'}}>
            <a className="a2a_dd" href="https://www.addtoany.com/share" />
            <a className="a2a_button_facebook" />
            <a className="a2a_button_twitter" />
            <a className="a2a_button_google_plus" />
          </div>
        </aside>
        <footer className="footer">
          <p>
            Built in React by <a href="https://sg.linkedin.com/in/kwonghow" target="_blank">Kwong How</a><br />
            Last updated on 4 February 2016
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
