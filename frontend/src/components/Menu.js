
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";


export default class Menu extends Component{
    constructor(props){
        super(props);
        this.state= {
            idUser: props.userId,
            token: props.idToken
        }
        console.log(props);
    }
    render(){
        return(
        <div className="jumbotron">
                <h1 className="display-5 text-center">Menu</h1>
             
                    <Button variant="outline-primary" size="lg" block as={Link} to="/newsession">
                        Nueva Sesion 
                    </Button>
              
                <Button variant="outline-info" size="lg" block as={Link} to="/sessions">
                    Sesion Existente
                </Button>
                <Button variant="outline-success" size="lg" block as={Link} to="/newgame">
                    Jugador vs PC
                </Button>
                <Button variant="outline-warning" size="lg" block as={Link} to="/">
                    Salir
                </Button>
                <div className="alert alert-primary display-5 text-center">
                    Seleccione la opción que mas desee
                </div>
            </div>
            
            
        );
    }
};





