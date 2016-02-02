import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }
  render() {
    return (
      <div className="ticket">
        <h1>Hello</h1>
      </div>
    );
  }
}
