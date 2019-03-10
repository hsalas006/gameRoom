import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
          this.setState({ isSignedIn: !!user })
          console.log("user", user)
        })
      }
      onClick = ()=>{
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user })
            console.log("user", user)
          })
      }

    render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ marginBottom: '30px' }}>
        <Link className="navbar-brand" to="/">GameRoom - v.1.1</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Proyecto #1 - Diseño de Software</Link>
            </li>
          </ul>

          <ul className="nav navbar-nav ml-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/signin">Acceder</Link>
                           </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signin">Salir</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}