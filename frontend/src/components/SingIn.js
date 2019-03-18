import React, { Component } from 'react';

import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Menu from '../components/Menu';

firebase.initializeApp({
    apiKey: "AIzaSyA0kHfgbRI6PcZgkiCU-HC1fbHrqPfguec",
    authDomain: "gameroom-3127e.firebaseapp.com"
});

firebase.auth().useDeviceLanguage();

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      idToken: null,
      userId: null,
      email: null,
      name: null
    };
    this.setUser = this.setUser.bind(this);
  }

  setUser(user) {
    this.setState({ user })
  }

  uiConfig = {
    
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInSuccessWithAuthResult: () => false
    }
  }

  loadlogin(){
    firebase.auth().onAuthStateChanged(user => {
      if(!user){
        console.log('error no hay usuario registrado');
        return
      }
      firebase.auth().currentUser.getIdToken().then(token =>{
          
        this.setState({
          idToken: token.toString(),
          email: firebase.auth().currentUser.email,
          name: firebase.auth().currentUser.displayName
        });
        console.log(this.state.idToken,':::>>');
      })
        .catch(err=>{
        console.log(err);
      }); 
    });
  }

  componentDidMount = () => {
    
    firebase.auth().signOut().then(()=>{
      console.log('>>> SingOut');
      this.state = { 
        idToken: null,
        userId: null,
        email: null,
        name: null
      };
    });
    this.loadlogin();
  }


  render() {
    return (

      <div className="App">
        {this.state.idToken ? (
            <span>{console.log('****',this.state.userId)}
              <Menu user={this.state.user}></Menu>
            </span>
          ) : (
            <div className="jumbotron">
            <h1 className="display-5 text-center">Proyecto #1 - Diseño de Software</h1>
            <p className="lead text-center">Plataforma de juegos de mesa que permite tener sesiones de juego de forma remota</p>
            <hr className="my-4"></hr>
              <div className="row">
                <div className="col">
                  <div className="text-center">
                    <div className="alert alert-primary">
                      Acceder por medio de Redes Sociales
                    </div>
                    <StyledFirebaseAuth 
                      uiCallback={ui => ui.disableAutoSignIn()} 
                      uiConfig={this.uiConfig} 
                      firebaseAuth={firebase.auth()}   
                    />
                    {this.loadlogin()}
                  </div>
                </div>
              </div>
            </div>
          )}        
      </div>
    );
  }
}