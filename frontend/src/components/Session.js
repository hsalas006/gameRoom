
import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import {socket} from './Header';

export default class Sessions extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
            idSession: props.location.state.idSession,
            game:{},
            player1: '',
            player2: '',
            session: {},
            othello: 0,
            memory: 0,
            idGames:[],
            currentGame: 0,
            initialized: false
          };
          this.createGame = this.createGame.bind(this);
          this.displayGame = this.displayGame.bind(this);
          this.addGame = this.addGame.bind(this);
          this.createAllGames = this.createAllGames.bind(this);
          this.loadSession = this.loadSession.bind(this);
          this.loadGame = this.loadGame.bind(this);
    }
    
    componentDidMount() {
        this.loadSession();
        
        socket.on('createGames', res=>{
            console.log('respuesta: ', res);
            this.setState({idGames: res});
        });
    }

    async loadSession(){

        await fetch('http://localhost:8000/session/'+ this.props.location.state.idSession)
        .then(res => {
            if (res.status !== 200) {
                console.log('Error al cargar la sesion.');
            }
            return res.json();
        })
        .then(resData => {
            if(resData.session)
            {
                console.log(resData.session.games)
                if(resData.session.games.length > 2){
                    this.setState({
                        initialized: true
                    })  
                }
                this.setState({
                    session: resData.session,
                    player1: resData.session.IDplayer1,
                    player2: resData.session.IDplayer2,
                    othello: resData.session.games[0],
                    memory: resData.session.games[1],
                    idGames: resData.session.games,
                    currentGame: resData.session.currentGame,
                });
            }
        })
        .catch(err=>{console.log(err)});
        this.createAllGames();
    }

    async loadGame(){
        let url;
        let idGame= this.state.idGames[this.state.currentGame];;
        if (this.state.currentGame-1 <= this.state.othello){
            url= 'http://localhost:8000/othello/game/';
        }
        else if (this.state.currentGame-1 <= this.state.othello+this.state.memory){
            url= 'http://localhost:8000/memory/game/';
        }
        await fetch(url + idGame)
        .then(res => {
            if (res.status !== 200) {
                console.log('Error al cargar la sesion.');
            }
            return res.json();
        })
        .then(resData => {
            if(resData.game){ 
                this.setState({game: resData.game});
            }
            console.log('>>>>> ', resData.game)
        })
        .catch(err=>{console.log(err)});
        console.log('>>>>> ', idGame)
        this.props.history.push({pathname: '/board', state: {game: this.state.game}});  
      }

    
    createAllGames(){
        
        //if(this.state.player2 !== null && this.initialized === false){
        if(this.state.initialized === false){
            console.log(this.state.othello, 'othello')
            for(let i=0; i< this.state.othello; i++){
                this.createGame('http://localhost:8000/othello/newgame', 'othello'); 
            }
            for(let i=0; i< this.state.memory; i++){
                this.createGame('http://localhost:8000/memory/newgame', 'memory'); 
            }  
        }
        this.setState({initialized: true});
    }

    addGame(){
        fetch('http://localhost:8000/session/newgameInsession/' + this.state.idSession,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  idSession: this.state.idSession,
                  idGames : this.state.idGames 
              })
            })
          .then(res=>{
              return res.json();
          }).then(data=>{
              console.log(data, '----*--**-');    
          })
          .catch(err=>{
              console.log(err);
          });     
    }

    async createGame(url, type){  
        await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: type,
                IDplayer1 : this.state.session.IDplayer1,
                IDplayer2 : this.state.session.IDplayer2,
                size: this.state.session.boardSize,
                turn : this.state.session.IDplayer1,
                IDsession : this.state.session.IDsession            
            })
        }).then(res=>{
            return res.json();
        }).then(data=>{
            if(data.post)
            {
                let list = this.state.idGames.concat(data.post._id)
                this.setState({
                    idGames: list
                })
            }
            console.log('juegos: ',this.state.idGames)    
        })
        .catch(err=>{
            console.log(err)
        });  
        this.addGame();   
    }

    clickOthello(){
        this.loadGame();
        
    }

    displayGame(path, game){
        this.props.history.push({pathname: path, state: {game: game}});  
    }

    render(){
        //let othello = this.state.session.games.othello.num;
        return(
            <div className="jumbotron">
                <h2 className="display-5 text-center"> Sesion Actual: {this.state.session.name}</h2>
                <div className="card text-center">
                    <div className="card-header">
                        {this.state.session.IDplayer1 +' vs '+ this.state.session.IDplayer2}
                    </div>
                    
                    
                    <div>
                        {this.state.initialized ?
                            <ul className="list-group">{
                                this.state.idGames.map((elm, i) =>{
                                    if(i>1) return(<li key={i} className="list-group-item">Juego {i-1} ID: {elm}</li>)
                                })
                            }
                            </ul>
                            : null  
                        }  
                    </div>
                        
                     
                
                    <div className="card-body">
                        <h5 className="card-title">Lista de Juegos</h5>
                        
                        <div className="card-text">{this.state.othello > 0 && 
                            <div>
                                Othello: {this.state.othello} <button onClick={this.loadGame} className="btn btn-primary">Jugar</button>
                            </div>
                            
                            }
                        </div>
                        <div className="card-text">{this.state.memory > 0 && 
                            <div>
                                Memoria: {this.state.memory}<button onClick={this.loadGame} className="btn btn-primary">Jugar</button>
                            </div>
                            
                            }
                        </div>
                        <br></br>
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