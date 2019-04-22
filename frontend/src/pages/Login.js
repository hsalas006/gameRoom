import React, { Component } from 'react';

import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Menu from '../components/Menu';

firebase.initializeApp({
    apiKey: "AIzaSyA0kHfgbRI6PcZgkiCU-HC1fbHrqPfguec",
    authDomain: "gameroom-3127e.firebaseapp.com"
});

firebase.auth().useDeviceLanguage();

export default class Login extends Component {
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
      user.getIdToken().then(token =>{
          
        this.setState({
          idToken: token.toString(),
          userId: user.uid,
          email: user.email,
          name: user.displayName
        });
        localStorage.setItem('idToken', JSON.stringify(token.toString()));
        localStorage.setItem('userId', JSON.stringify(user.uid));

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
        {this.state.idToken ? 
          this.props.onLogin({login:true})
          : (
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