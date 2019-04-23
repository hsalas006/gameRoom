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
      socket = openSocket('http://localhost:8000');
  }

  componentDidUpdate(){
    if(localStorage.getItem('idToken')==='null'){
      console.log('---->>>>', localStorage.getItem('idToken'));
      this.props.history.push({pathname: '/signin'});
    }
    
    console.log('idToken: ', localStorage.getItem('idToken'))
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
    localStorage.removeItem('userId');
    console.log(this.state.name)
  }

  render() {
    return (
      <nav className="navbar navbar navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="/menu">GameRoom - v.1.1</a>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        {this.state.idToken ? 
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link className="nav-link" to="/NewSession">Crear Session<span class="sr-only">(current)</span></Link>
              <Link className="nav-link" to="/Sessions">Sesiones<span class="sr-only">(current)</span></Link>
              <Link className="nav-link" to="/NewGame">vs PC<span class="sr-only">(current)</span></Link>
            </li>
          </ul>  : null }
          
        </div>
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
      </nav> 
    );
  }
}
export { Header, socket };


/*<nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ marginBottom: '30px' }}>
        <Link className="navbar-brand" to="/Menu">GameRoom - v.1.1</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/NewSession">Crear Session</Link>
              <Link className="nav-link" to="/Sessions">Sessiones</Link>
              <Link className="nav-link" to="/NewGame">Player vs PC</Link>
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
      </nav> */