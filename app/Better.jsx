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

    this.state = {
      number1: '',
      number2: '',
      number3: '',
      number4: '',
      number5: '',
      number6: '',
      number7: ''
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value});
  }

  handleDraw(e) {
    e.preventDefault();

    const { number1, number2, number3, number4, number5, number6, number7 } = this.state;

    if (!number1 || !number2 || !number3 || !number4 || !number5 || !number6 || !number7 ) {
      return false;
    }

    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  }

  handleQuickPick(e) {
    e.preventDefault();

    const newState = {};
    const result = getRandomIntSet(7, 1, 49);

    for (const key in result) {
      const objectKey = 'number' + (Number(key) + 1);
      newState[objectKey] = result[key];
    }

    this.setState({...newState});
  }

  render() {
    const { number1, number2, number3, number4, number5, number6, number7 } = this.state;

    return (
      <form className="form-inline better text-center">
        <div className="form-group">
          <input className="form-control" name="number1" size="2" type="text" value={number1} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input className="form-control" name="number2" size="2" type="text" value={number2} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input className="form-control" name="number3" size="2" type="text" value={number3} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input className="form-control" name="number4" size="2" type="text" value={number4} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input className="form-control" name="number5" size="2" type="text" value={number5} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input className="form-control" name="number6" size="2" type="text" value={number6} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input className="form-control" name="number7" size="2" type="text" value={number7} onChange={this.handleChange} />
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
