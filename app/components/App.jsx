import React, { Component } from 'react';

import config from 'config';
import { evaluateWinnings, generateDrawResults } from 'utils/BetUtils';

import AmountSpent from './AmountSpent';
import Better from './Better';
import Results from './Results';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleChangeBetType = this.handleChangeBetType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    const system = config.default.systemRange.min;
    const costPerBet = config.default.costPerBet[system];

    this.state = {
      amountEarned: 0,
      amountSpent: 0,
      costPerBet,
      system
    };
  }

  handleChangeBetType(system) {
    const costPerBet = config.default.costPerBet[system];

    this.setState({ costPerBet, system });
  }

  handleSubmit(chosenNumbers) {
    const { amountEarned, amountSpent, costPerBet, system } = this.state;

    const results = generateDrawResults();
    const { additionalNumber, winningNumbers } = results;

    const prizeAmount = evaluateWinnings(chosenNumbers, winningNumbers, additionalNumber, system);

    this.setState({
      chosenNumbers,
      amountEarned: amountEarned + prizeAmount,
      amountSpent: amountSpent + costPerBet,
      prizeAmount,
      results
    });
  }

  render() {
    const {
      amountEarned,
      amountSpent,
      chosenNumbers,
      costPerBet,
      prizeAmount,
      results,
      system,
    } = this.state;

    return (
      <div className="container text-center">
        <Better
          costPerBet={costPerBet}
          onChangeBetType={this.handleChangeBetType}
          onSubmit={this.handleSubmit}
          system={system}
        />
        <AmountSpent amountEarned={amountEarned} amountSpent={amountSpent} />
        <Results
          chosenNumbers={chosenNumbers}
          prizeAmount={prizeAmount}
          results={results}
        />
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
            Last updated on 7 February 2016
          </p>
          <p>
            Prize pool, no. of winning shares for Groups 1, 2, 3 and 4 based<br />
            on <a href="http://www.singaporepools.com.sg/en/toto/sr/pages/result.aspx?sppl=RHJhd051bWJlcj0zMDM1" target="_blank">2015 Toto Hong Bao Draw statistics</a>
          </p>
          <p>
            Issues? Let me know via <a href="https://github.com/kwonghow/toto-app/issues" target="_blank">Github</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
