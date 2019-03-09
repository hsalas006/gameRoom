import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
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
              <Link className="nav-link" to="/signup">Registro</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signin">Acceder</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signout">Salir</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}