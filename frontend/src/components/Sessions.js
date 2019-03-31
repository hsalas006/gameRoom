
import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

export default class Sessions extends Component{
    state = {
        sessions: [],
        totalSessions: 0,
        selectedSess: '',
        selected: false
      };

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

    render(){
        return(
            <div className="jumbotron">
                <h2 className="display-5 text-center">Sessiones Disponibles:</h2>
                <Table striped bordered hover size="sm" >
                    <thead>
                        <tr > 
                        <th>Sesion</th>
                        <th>Nivel</th>
                        <th>Creator</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.sessions.map((item, key) => {
                        return (
                            <tr onClick={(e)=>this.handleClick(key)} key = {key}>
                                <td>{item.name}</td>
                                <td>{item.boardSize}</td>
                                <td>{item.IDplayer1}</td>
                            </tr>
                          )
                      })}</tbody>
                    </Table>
                    { this.state.selected
                      ? <div> 
                          <h4>Session Seleccionada: </h4>
                          <div className="alert alert-success" role="alert">
                            {' Sesion'+ ': ' + this.state.selectedSess.name + ' : ID: ' + this.state.selectedSess._id}
                            <button type="button" className="btn btn-outline-success btn-lg btn-block">Unirse a la Sesion</button>
                          </div>
                          
                        </div>
                      : null
                    }  
            </div>  
        );
    }
};