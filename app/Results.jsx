import React, { Component, PropTypes } from 'react';

class Results extends Component {
  render() {
    const { results } = this.props;

    return (
      <p>{results.join(', ')}</p>
    );
  }
}

export default Results;
