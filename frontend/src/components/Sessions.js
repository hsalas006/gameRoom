
import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

export default class Sessions extends Component{
    state = {
        sessions: [],
        totalSessions: 0,
      };

    componentDidMount() {
        fetch('URL')
          .then(res => {
            if (res.status !== 200) {
              console.log('Carga de datos fallida.');
            }
            return res.json();
          })
          .then(resData => {
            this.setState({ status: resData.status });
          })
          .catch(err=>{console.log(err)});
    
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

    render(){
        return(
            <div className="jumbotron">
                <h2 className="display-5 text-center">Sessiones Disponibles:</h2>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Sesion</th>
                        <th>Nivel</th>
                        <th>Disponibilidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>#Mark</td>
                        <td>1</td>
                        <td>libre</td>
                        </tr>
                        <tr>
                        <td>#Jacob</td>
                        <td>2</td>
                        <td>ocupado</td>
                        </tr>
                    </tbody>
                    </Table>;
            </div>  
        );
    }
};