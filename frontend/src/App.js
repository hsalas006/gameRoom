import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Header from './components/Header';
import Menu from './components/Menu';

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
            path="/Menu"
            exact
            render={props => (
              <Menu />
            )}
          />
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


/*import React, { Component } from 'react';
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