import React, { Component } from 'react';
//import { Link, Route, Switch } from 'react-router-dom';

import Header from './Header';

export default (props) => {
  
  return (
    <div>
      <Header />
      
      <div className="container">
      { props.children }
      </div>
    </div>
  );
};
/*
export default class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/secret">Secret</Link></li>
        </ul>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/secret" component={} />
        </Switch>
      </div>
    );
  }
}*/