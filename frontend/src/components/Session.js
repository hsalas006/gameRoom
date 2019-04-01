
import React, { Component } from 'react';

export default class Sessions extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
            idSession: props.location.state.idSession,
            session: {},
            othelloNum: '',
            othelloList: [],
            memoryNum: '',
            memoryList: [],
            currentGame: ''
          };
      }

   

    componentDidMount() {
        this.loadSession();
        this.createGameOthello();
      }
    
    loadSession(){
        fetch('http://localhost:8080/session/session/'+ this.props.location.state.idSession)
        .then(res => {
            if (res.status !== 200) {
            console.log('Error al cargar la sesion.');
            }
            return res.json();
        })
        .then(resData => {

            this.setState({
            session: resData.session,
            othelloNum: resData.session.games.othello.num,
            othelloList: resData.session.games.othello.idGames,
            memoryNum: resData.session.games.memory.num,
            mameryList: resData.session.games.memory.idGames,
            currentGame: resData.session.currentGame,
            });
            console.log(this.state.session.othello, '------*')
        })
        .catch(err=>{console.log(err)});

    }

    createGameOthello(){

    }

    handleClick(e) {
        console.log('---->>>',e);

      }

    render(){
        //let othello = this.state.session.games.othello.num;
        console.log(this.props.idSession)
        return(
            <div className="jumbotron">
                <h2 className="display-5 text-center"> Sesion Actual: {this.state.session.name}</h2>
                <div className="card text-center">
                    <div className="card-header">
                        {this.state.session.IDplayer1 +' vs '+ this.state.session.IDplayer2}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Lista de Juegos</h5>
                        <div className="card-text">Othello: {this.state.othelloNum}</div>
                        <div className="card-text">Memoria: {this.state.memoryNum}</div>
                        <a href="/Menu" className="btn btn-danger">Salir</a>
                    </div>
                    <div className="card-footer text-muted">
                        Juego actual: {this.state.currentGame}
                    </div>
                </div>
            </div>  
        );
    }
};