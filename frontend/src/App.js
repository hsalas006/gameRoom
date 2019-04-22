import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Header from './components/Header';
import LoginPage from './pages/Login';
import MainPage from './pages/Main';


class App extends Comment {

  state = {
    isAuth: false,
    token: null,
    userId: null
  }

  componentDidMout(){
    const token = localStorage.getItem('idToken');
    if(!token){
      return;
    }

    const userId = localStorage.getItem('userId');
    this.setState({ isAuth: true, token: token, userId: userId});
  }

  logoutHandler = () => {
    this.setState({ isAuth: false, token: null, userId: null});
    localStorage.removeItem('idToken');
    localStorage.removeItem('userId');
  }

  loginHandler = (data) => {
 
    if(data.login){
      const token = localStorage.getItem('idToken');
      const userId = localStorage.getItem('userId');
      this.setState({
        token: token,
        userId: userId,
        isAuth: true
      })  
    }else {
      localStorage.removeItem('idToken');
      localStorage.removeItem('userId');
      this.setState({
        token: null,
        userId: null,
        isAuth: false
      }) 
    }
  }

  render(){
    let routes = (
      <Switch>
        <Route
          path="/"
          exact
          render={props => (
            <LoginPage
              {...props}
              onLogin={this.loginHandler}
            />
          )}
        />
        <Redirect to="/" />
      </Switch>
    );
    if (this.state.isAuth) {
      routes = (
        <Switch>
          <Route
            path="/home"
            exact
            render={props => (
              <MainPage userId={this.state.userId} token={this.state.token} />
            )}
          />
          <Redirect to="/home" />
        </Switch>
      );
    }
    return (
    
        <div>
          <Header />          
          <div className="container">
            {routes}
          </div>
        </div>
     
    );
  }
  
}

export default withRouter(App);
