
import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import Session from './Session';

export default class Sessions extends Component{
  constructor(props){
    super(props);
    this.state = {
        sessions: [],
        totalSessions: 0,
        selectedSess: '',
        selected: false
      };
      this.displaySession = this.displaySession.bind(this);
      this.loadSessions = this.loadSessions.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
  }
    
  componentDidMount() {
    this.loadSessions();      
  }
    
  loadSessions(){
      
    fetch('http://localhost:8080/session/sessions')
      .then(res => {
        if (res.status !== 200) {
          console.log('Error al cargar las sesiones.');
        }
        return res.json();
      })
      .then(resData => {
        console.log('data: ', resData)
        this.setState({
          sessions: resData.sessions,
          totalSessions: resData.totalItems,
        });
      })
      .catch(err=>{console.log(err)});
  };

  handleClick(e) {
      console.log('---->>>',e);
      let sess = this.state.sessions[e];
      console.log(sess);
      this.setState({selectedSess: sess, selected: true});
  } 

  displaySession(){
    let path = `/session`;
    console.log(this.state.selectedSess.IDplayer1 !== localStorage.getItem('userId'))
    if(this.state.selectedSess.IDplayer1 !== localStorage.getItem('userId')){
      fetch('http://localhost:8080/session/addPlayer/'+this.state.selectedSess._id,{
        method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
  
                  player2: localStorage.getItem('userId'),
                  sessionId : this.state.selectedSess._id
              })
            })
      .then(res => {
        if (res.status !== 200) {
          console.log('Error al cargar las sesiones.');
        }
        return res.json();
      })
      .then(resData => {
        this.props.history.push({pathname: path, state: {idSession: this.state.selectedSess._id}});  
      })
      .catch(err=>{console.log(err)});
    }
    else if(this.state.selectedSess.IDplayer1 === localStorage.getItem('userId')){
      this.props.history.push({pathname: path, state: {idSession: this.state.selectedSess._id}});  
      console.log('-**--**- ', this.state.selectedSess._id);
    }
    
  }

  render(){
    return(
      <div className="jumbotron">
        <h2 className="display-5 text-center">Sessiones Disponibles:</h2>
        <Table striped bordered hover size="sm" >
          <thead>
            <tr > 
            <th>Sesion</th>
            <th>Nivel</th>
            <th>Creator</th>{/*
            <th>Othello</th>
            <th>Memoria</th>*/}
            </tr>
          </thead>
          <tbody>{this.state.sessions.map((item, key) => {
            return (
                <tr onClick={(e)=>this.handleClick(key)} key = {key}>
                  <td>{item.name}</td>
                  <td>{item.boardSize}</td>
                  <td>{item.IDplayer1}</td>{/*
                  <td>{item.games.othello.num}</td>
                  <td>{item.games.memory.num}</td>*/}
                </tr>
              )
            })}</tbody>
            </Table>
            { this.state.selected
              ? <div> 
                  <h4>Session Seleccionada: </h4>
                  <div className="alert alert-success" role="alert">
                    {' Sesion'+ ': ' + this.state.selectedSess.name + ' : ID: ' + this.state.selectedSess._id}
                    <button type="button" className="btn btn-outline-success btn-lg btn-block" onClick={this.displaySession}>Unirse a la Sesion</button>
                  </div>
                  <a href="/Menu" className="btn btn-secondary">Volver</a>      
                </div>
              : null
            }  
        </div>  
      );
    }
};