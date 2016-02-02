import React, { Component, PropTypes } from 'react';

import { getRandomIntSet } from 'helpers/NumberHelper';

class Better extends Component {
  static propTypes = {
    onSubmit: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleDraw = this.handleDraw.bind(this);
    this.handleQuickPick = this.handleQuickPick.bind(this);

    const initialState = [];

    for (let i = 0; i < 7; i++) {
      initialState[i] = '';
    }

    this.state = { chosenNumbers: initialState };
  }

  handleChange(event) {
    const { chosenNumbers } = this.state;
    const { name, value } = event.target;

    chosenNumbers[name] = Number(value);

    this.setState({ chosenNumbers });
  }

  handleDraw(e) {
    e.preventDefault();

    const { chosenNumbers } = this.state;

    for (let i = 0; i < 7; i++) {
      if (Number(chosenNumbers[i]) === 0) {
        return false;
      }
    }

    if (this.props.onSubmit) {
      this.props.onSubmit(chosenNumbers);
    }
  }

  handleQuickPick(e) {
    e.preventDefault();

    const result = getRandomIntSet(7, 1, 49);

    this.setState({ chosenNumbers: result});
  }

  render() {
    const { chosenNumbers } = this.state;

    return (
      <form className="form-inline better text-center">
        <div className="form-group">
          <input className="form-control" name="0" size="2" type="text" value={chosenNumbers[0]} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input className="form-control" name="1" size="2" type="text" value={chosenNumbers[1]} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input className="form-control" name="2" size="2" type="text" value={chosenNumbers[2]} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input className="form-control" name="3" size="2" type="text" value={chosenNumbers[3]} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input className="form-control" name="4" size="2" type="text" value={chosenNumbers[4]} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input className="form-control" name="5" size="2" type="text" value={chosenNumbers[5]} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input className="form-control" name="6" size="2" type="text" value={chosenNumbers[6]} onChange={this.handleChange} />
        </div>
        <div className="better__buttons row">
          <div className="col-sm-2 col-sm-offset-4">
            <button className="btn btn-default btn-block" onClick={this.handleQuickPick}>Quick Pick</button>
          </div>
          <div className="col-sm-2">
            <button className="btn btn-primary btn-block" onClick={this.handleDraw}>Draw</button>
          </div>
        </div>
      </form>
    );
  }
}

export default Better;
