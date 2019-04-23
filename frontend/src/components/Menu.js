
import React, { Component, Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Route, Link} from "react-router-dom";

import NewSession from './NewSession';
import Sessions from './Sessions';
import NewGame from './NewGame';


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
            <Fragment>
            <BrowserRouter>
                <Route path = "/newsession" component = {NewSession} />
                <Route path = "/sessions" component = {Sessions} />
                <Route path = "/newGame" component = {NewGame} />
            </BrowserRouter>
            <div className="jumbotron">
                <h1 className="display-5 text-center">Menu</h1>
                <Button variant="outline-primary" size="lg" block as={Link} to="/newsession">
                    Nueva Sesion 
                </Button>   
                <Button variant="outline-info" size="lg" block as={Link} to="/sessions">
                    Sesion Existente
                </Button>
                <Button variant="outline-success" size="lg" block as={Link} to="/newGame">
                    Jugador vs PC
                </Button>
                <Button variant="outline-warning" size="lg" block as={Link} to="/">
                    Salir
                </Button>
                <div className="alert alert-primary display-5 text-center">
                    Seleccione la opción que mas desee
                </div>
            </div> 
            </Fragment>   
        );
    }
};





