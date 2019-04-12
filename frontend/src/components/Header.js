import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import openSocket from 'socket.io-client';

var socket;
export default class Header extends Component {
  constructor(props) {
      super(props);
      this.state ={
        idToken: '',
        userId: '',
        name: '',
        email: ''
      }
      this.componentDidUpdate = this.componentDidUpdate.bind();
      socket = openSocket('http://localhost:8080');
  }

  componentDidUpdate(){
    if(localStorage.getItem('idToken')==='null'){
      console.log('---->>>>', localStorage.getItem('idToken'));
      this.props.history.push({pathname: '/signin'});
    }
    
    console.log('idToken: ', localStorage.getItem('userId'))
  }

  componentDidMount = () => {
      firebase.auth().onAuthStateChanged(user => {
        if(!user){
          console.log('error no hay usuario registrado');
          return
        }
        user.getIdToken().then(token =>{
            
          this.setState({
            idToken: token.toString(),
            userId: user.uid,
            email: user.email,
            name: user.displayName
          });
          
        })
          .catch(err=>{
          console.log(err);
        }); 
      });
  }

  signOut(){
    firebase.auth().signOut().then(() => {
      this.setState({
        idToken: '',
        userId: '',
        email: '',
        name: ''
      });
    })
    localStorage.removeItem('idToken');
    console.log(this.state.name)
  }

  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ marginBottom: '30px' }}>
        <Link className="navbar-brand" to="/">GameRoom - v.1.1</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Proyecto #1 - Diseño de Software</Link>
            </li>
          </ul>

          <ul className="nav navbar-nav">
            {this.state.idToken ? 
              <li className="nav-item">
                <Link className="nav-link" to="/signin" onClick={this.signOut} >Salir</Link>
              </li>
            :
              <li className="nav-item">
                <Link className="nav-link" to="/signin">Acceder</Link>
              </li>
            }
            
            
          </ul>
        </div>
      </nav>
    );
  }
}
export { Header, socket };