import React, { Component, PropTypes } from 'react';

import config from 'config';
import { getRandomIntSet } from 'helpers/NumberHelper';

/**
 * Returns a string of the current date time.
 *
 * @return {String}
 */
function getDateTime() {
  const now   = new Date();
  const year  = now.getFullYear().toString().substr(2, 2);
  let month   = now.getMonth()+1;
  let day     = now.getDate();
  let hour    = now.getHours();
  let minute  = now.getMinutes();
  let second  = now.getSeconds();

  const amPm = hour >= 12 ? 'pm' : 'am';

  if (hour > 12) {
    hour -= 12;
  }

  if (month.toString().length === 1) {
    month = '0'+month;
  }
  if (day.toString().length === 1) {
    day = '0'+day;
  }
  if (hour.toString().length === 1) {
    hour = '0'+hour;
  }
  if (minute.toString().length === 1) {
    minute = '0'+minute;
  }
  if (second.toString().length === 1) {
    second = '0'+second;
  }

  return `${day}/${month}/${year} ${hour}:${minute}${amPm}`;
}

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

    if (this.props.onSubmit) {
      this.props.onSubmit(chosenNumbers);
    }
  }

  handleQuickPick(e) {
    e.preventDefault();

    console.log(config);

    const result = getRandomIntSet(7, config.default.totoRange.min, config.default.totoRange.max);

    this.setState({ chosenNumbers: result});
  }

  isAllFilled() {
    const { chosenNumbers } = this.state;

    for (let i = 0; i < 7; i++) {
      if (Number(chosenNumbers[i]) === 0) {
        return false;
      }
    }

    return true;
  }

  renderInputs() {
    const { chosenNumbers } = this.state;

    let results = [];

    for (let i = 0; i < 7; i++) {
      const style = { border: Number(chosenNumbers[i]) === 0 ? '1px solid #337ab7' : 'none' };
      results = results.concat(
        <div className="form-group" key={`bet-number-${i}`}>
          <input className="form-control" name={i} style={style} type="text" value={chosenNumbers[i]} onChange={this.handleChange} />
        </div>
      );
    }

    return results;
  }

  render() {
    const { chosenNumbers } = this.state;

    return (
      <form className="form-inline better">
        <div className="row">
          <article className="col-sm-offset-3 col-sm-6 ticket">
            <p className="ticket__specimen-text">Specimen</p>
            <figure className="ticket__logo" />
            <h2 className="ticket__bet-type">System 7</h2>
            {this.renderInputs()}
            <aside className="ticket__meta">
              <p className="ticket__price">Price:$7.00</p>
              <div className="row">
                <div className="col-xs-7">
                  Draw: Fri 19/02/16<br />
                  {getDateTime()}<br />
                  209-18659073-234408
                </div>
                <div className="col-xs-5 text-right">
                  3035/16<br />
                  00888802-01<br />
                  02-2624
                </div>
              </div>
            </aside>
            <barcode className="upc-a">
              <upc-reset></upc-reset>
              <upc-digit data-val="0"></upc-digit>
              <upc-digit data-val="2"></upc-digit>
              <upc-digit data-val="2"></upc-digit>
              <upc-digit data-val="0"></upc-digit>
              <upc-digit data-val="0"></upc-digit>
              <upc-digit data-val="0"></upc-digit>
              <upc-reset></upc-reset>
              <upc-digit data-val="1"></upc-digit>
              <upc-digit data-val="2"></upc-digit>
              <upc-digit data-val="5"></upc-digit>
              <upc-digit data-val="0"></upc-digit>
              <upc-digit data-val="3"></upc-digit>
              <upc-digit data-val="3"></upc-digit>
              <upc-reset></upc-reset>
              <upc-digit data-val="0"></upc-digit>
              <upc-digit data-val="2"></upc-digit>
              <upc-digit data-val="2"></upc-digit>
              <upc-digit data-val="0"></upc-digit>
              <upc-digit data-val="0"></upc-digit>
              <upc-digit data-val="0"></upc-digit>
              <upc-reset></upc-reset>
              <upc-digit data-val="1"></upc-digit>
              <upc-digit data-val="2"></upc-digit>
              <upc-digit data-val="5"></upc-digit>
              <upc-digit data-val="0"></upc-digit>
              <upc-digit data-val="3"></upc-digit>
              <upc-digit data-val="3"></upc-digit>
              <upc-reset></upc-reset>
              <upc-digit data-val="0"></upc-digit>
              <upc-digit data-val="2"></upc-digit>
              <upc-digit data-val="2"></upc-digit>
              <upc-digit data-val="0"></upc-digit>
              <upc-digit data-val="0"></upc-digit>
              <upc-digit data-val="0"></upc-digit>
              <upc-reset></upc-reset>
              <upc-digit data-val="1"></upc-digit>
              <upc-digit data-val="2"></upc-digit>
              <upc-digit data-val="5"></upc-digit>
              <upc-digit data-val="0"></upc-digit>
              <upc-digit data-val="3"></upc-digit>
              <upc-digit data-val="3"></upc-digit>
              <upc-reset></upc-reset>
              <upc-digit data-val="0"></upc-digit>
              <upc-digit data-val="2"></upc-digit>
              <upc-digit data-val="2"></upc-digit>
              <upc-digit data-val="0"></upc-digit>
              <upc-digit data-val="0"></upc-digit>
              <upc-digit data-val="0"></upc-digit>
              <upc-reset></upc-reset>
              <upc-digit data-val="1"></upc-digit>
              <upc-digit data-val="2"></upc-digit>
              <upc-digit data-val="5"></upc-digit>
              <upc-digit data-val="0"></upc-digit>
              <upc-digit data-val="3"></upc-digit>
              <upc-digit data-val="3"></upc-digit>
              <upc-reset></upc-reset>
              <upc-digit data-val="0"></upc-digit>
              <upc-digit data-val="2"></upc-digit>
              <upc-reset></upc-reset>
            </barcode>
            <p className="ticket__specimen-text">Specimen</p>
          </article>
        </div>
        <div className="better__buttons row">
          <div className="col-xs-6 col-sm-2 col-sm-offset-4">
            <button className="btn btn-default btn-block" onClick={this.handleQuickPick}>Quick Pick</button>
          </div>
          <div className="col-xs-6 col-sm-2">
            <button className="btn btn-primary btn-block" onClick={this.handleDraw} disabled={!this.isAllFilled()}>Draw</button>
          </div>
        </div>
      </form>
    );
  }
}

export default Better;
