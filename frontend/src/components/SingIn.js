import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"



import * as actions from '../actions';
import CustomInput from './CustomInput';

firebase.initializeApp({
    apiKey: "AIzaSyA0kHfgbRI6PcZgkiCU-HC1fbHrqPfguec",
    authDomain: "gameroom-3127e.firebaseapp.com"
})

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  state = { isSignedIn: false }
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

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }

  async onSubmit(formData) {
    await this.props.signIn(formData);
    if (!this.props.errorMessage) {
      this.props.history.push('/dashboard');
    }
  }



  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row">
        
        <div className="col">
          <div className="text-center">
            <div className="alert alert-primary">
              Acceder por medio de Redes Sociales
            </div>

            <div className="App">
            {this.state.isSignedIn ? (
            <span>
                <div>Signed In!</div>
                <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
                <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                
            </span>
            ) : (
            <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
            />
            )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' })
)(SignIn)