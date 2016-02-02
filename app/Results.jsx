import React, { Component, PropTypes } from 'react';

class Results extends Component {
  static propTypes = {
    results: PropTypes.array
  };

  render() {
    const { results } = this.props;

    return (
      <p>{results ? results.join(', ') : ''}</p>
    );
  }
}

export default Results;
