import React, { Component, PropTypes } from 'react';

import config from 'config';

class BetTypeChooser extends Component {
  static propTypes = {
    chosenBetType: PropTypes.number,
    onChange: PropTypes.func
  };

  handleChangeBetType(system) {
    if (this.props.onChange) {
      this.props.onChange(system);
    }
  }

  renderBetTypeChoices() {
    const { chosenBetType } = this.props;

    let results = [];

    for (let i = config.default.systemRange.min; i <= config.default.systemRange.max; i++) {
      results = results.concat(
        <label
          className={'btn btn-default' + (chosenBetType === i ? ' active' : '')}
          key={`change-bet-type-${i}`}
          onClick={this.handleChangeBetType.bind(this, i)}
        >
          <input name={i} type="radio" checked={chosenBetType === i} onChange={this.handleChangeBetType.bind(this, i)} />
          {i}
        </label>
      );
    }

    results = <div className="btn-group" data-toggle="buttons">{results}</div>;

    return results;
  }

  render() {
    return (
      <div className="better__bet-type-chooser">
        <h2 className="text-center">System</h2>
        {this.renderBetTypeChoices()}
      </div>
    );
  }
}

export default BetTypeChooser;
