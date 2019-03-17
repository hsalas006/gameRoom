
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

export default class Menu extends Component{
    render(){
        return(
        <div className="jumbotron">
                <h1 className="display-5 text-center">Menu</h1>
                <Button variant="outline-primary" size="lg" block>
                    Crear Nueva Sesion
                </Button>
                <Button variant="outline-info" size="lg" block>
                    Seleccionar Sesion Existente
                </Button>
                <Button variant="outline-success" size="lg" block>
                    Jugador vs PC
                </Button>
                <div className="alert alert-primary display-5 text-center">
                    Seleccione la opción que mas desee
                </div>
            </div>
            
            
        );
    }
};





