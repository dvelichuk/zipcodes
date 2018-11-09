import React, { Component } from 'react';
import './App.css';
import List from './List';

function zipCodeVlidator(zip) {
  return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
}
function isZipAlreadyPresent(value, array) {
  return array.some(function(el) {
    return el['post code'] === value;
  });
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      items: [],
      error: ''
    };
  }

  onChange = (event) => {
    this.setState({
      term: event.target.value,
      error: ''
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { items, term } = this.state;
    const validZip = zipCodeVlidator(term);
    if (!validZip) {
      this.setState({
        error: 'Invalid zipcode entered'
      })
      return;
    }
    fetch(`https://api.zippopotam.us/us/${term}`, {
      method: 'GET',
    }).then((res) => res.json())
    .then((data) => {
      const isZipPresent = isZipAlreadyPresent(term, items);
      if (!isZipPresent) {
        this.setState({
          items: items.concat(data)
        });
      }
      else {
        this.setState({
          error: 'Alredy present in list, please use another one'
        })
        return;
      }
    });
    this.setState({
      term: ''
    });
  }

  render() {
    return (
      <div className="wrapper">
        <h2 className="main-header">Please enter zipcode</h2>
        <form className="app" onSubmit={this.onSubmit}>
          <input className="input" value={this.state.term} onChange={this.onChange} />
          <button className="button" >Go</button>
        </form>
        <List className="list" items={this.state.items} error={this.state.error} />
      </div>
    );
  }
}
