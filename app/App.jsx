import React, { Component } from 'react';

import { getRandomIntSet } from 'helpers/NumberHelper';

import AmountSpent from './AmountSpent';
import Better from './Better';
import Results from './Results';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      amountEarned: 0,
      amountSpent: 0
    };
  }

  handleSubmit() {
    const results = getRandomIntSet(6, 1, 49);

    this.setState({
      amountSpent: this.state.amountSpent + 7,
      results
    });
  }

  render() {
    const { amountEarned, amountSpent, results } = this.state;

    return (
      <div className="container text-center">
        <AmountSpent amountEarned={amountEarned} amountSpent={amountSpent} />
        <Better onSubmit={this.handleSubmit} />
        <Results results={results} />
      </div>
    );
  }
}

export default App;
