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
      amountSpent: 0,
      step: 1,
      results: getRandomIntSet(6, 1, 49)
    };
  }

  handleSubmit() {

  }

  render() {
    const { amountSpent, results } = this.state;

    return (
      <div className="container text-center">
        <AmountSpent amountSpent={amountSpent} />
        <Better onSubmit={this.handleSubmit()} />
        <Results results={results} />
      </div>
    );
  }
}

export default App;
