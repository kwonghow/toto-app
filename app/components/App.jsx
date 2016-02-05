import findIndex from 'lodash/array/findIndex';
import React, { Component } from 'react';

import config from 'config';
import { getRandomInt, getRandomIntSet } from 'helpers/NumberHelper';
import { evaluateWinnings, generateDrawResults, getCostPerBet } from 'utils/BetUtils';

import AmountSpent from './AmountSpent';
import Better from './Better';
import Results from './Results';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    // @TODO: Can become modifiable by player in future
    const system = 12;

    this.state = {
      amountEarned: 0,
      amountSpent: 0,
      prizePool: config.default.prizePool,
      system
    };
  }

  handleSubmit(chosenNumbers) {
    const { additionalNumber, winningNumbers } = generateDrawResults();
    const { amountEarned, amountSpent, prizePool, system } = this.state;
    const { prizeAmount, prizeGroup } = evaluateWinnings(chosenNumbers, winningNumbers, additionalNumber, prizePool);

    const costPerBet = getCostPerBet(system);

    this.setState({
      additionalNumber,
      chosenNumbers,
      amountEarned: amountEarned + prizeAmount,
      amountSpent: amountSpent + costPerBet,
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
      system,
      winningNumbers
    } = this.state;

    return (
      <div className="container text-center">
        <Better onSubmit={this.handleSubmit} system={system} />
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
            Last updated on 5 February 2016
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
