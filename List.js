import React, { Component } from 'react';
import './App.css';

export default class List extends Component {
  render() {
    const { error, items } = this.props;
    return (
      <div className="list">
        { error ? <h1 className='error'>{error}</h1> : null }
        { items && items.length > 0 ? <h4>You have entered next valid zipcodes</h4> : null }
          <ul>
          {
            items &&
            items.length > 0 &&
            items.map((item, index) => <li className="item" key={index}>{item['post code']}, {item.places[0]['place name']}, {item.places[0]['state']}, {item.places[0]['state abbreviation']} </li>)
          }
        </ul>
      </div>
    )
  }
}
