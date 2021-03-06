import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Header from './components/Header';
import Menu from './components/Menu';

import NewSession from './components/NewSession';
import Sessions from './components/Sessions';
import Session from './components/Session';
import NewGame from './components/NewGame';
import Board from './components/Board';

import LoginPage from './pages/Login';


class App extends Component {
  state = {
    isAuth: false,
    token: null,
    userId: null

  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    
    const userId = localStorage.getItem('userId');

    this.setState({ isAuth: true, token: token, userId: userId });
  }

  logoutHandler = () => {
    this.setState({ isAuth: false, token: null, userId: null });
    localStorage.removeItem('idToken');
    localStorage.removeItem('userId');
  };

  loginHandler = (authData) => {

    if(localStorage.getItem('idToken') && localStorage.getItem('userId')){
      this.setState({
        isAuth: true,
        token: localStorage.getItem('idToken'),
        userId: localStorage.getItem('userId')
      });
    }
    
  };


  render() {
    let routes = (
      <Switch>
        <Route
          path="/"
          exact
          render={props => (<LoginPage {...props} onLogin={this.loginHandler}/>)}
        />
        <Redirect to="/" />
      </Switch>
    );
    if (this.state.isAuth) {
      routes = (
        <Switch>
          <Route path="/Menu" exact render={props => (<Menu />)}/>
          <Route exact path="/NewSession" component={NewSession} />
          <Route path="/Sessions" component={Sessions} />
          <Route path="/Session" component={Session} />
          <Route path="/NewGame" component={NewGame} />
          <Route path="/login" component={LoginPage} />
          <Route path="/Board" component={Board} />
          <Redirect to="/Menu" />
        </Switch>
      );
    }
    return (
      
      <Fragment>
        <Header />
        {routes}
      </Fragment>
    );
  }
}

export default withRouter(App);