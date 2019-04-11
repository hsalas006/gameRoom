
import React, { Component } from 'react';
import openSocket from 'socket.io-client';

export default class Sessions extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
            idSession: props.location.state.idSession,
            player1: '',
            player2: '',
            session: {},
            othello: '',
            idGames:[],
            memory: '',
            currentGame: '',
            initialized: false
          };
          this.createGame = this.createGame.bind(this);
          this.displayGame = this.displayGame.bind(this);
          this.addGame = this.addGame.bind(this);
      }
    
    componentDidMount() {
        this.loadSession();
    }

    loadSession(){
        console.log('>>>>> ::: ', this.props.location.state.idSession)
        fetch('http://localhost:8080/session/'+ this.props.location.state.idSession)
        .then(res => {
            if (res.status !== 200) {
                console.log('Error al cargar la sesion.');
            }
            return res.json();
        })
        .then(resData => {
            console.log(';;;;;;; ', resData.session)
            this.setState({
                session: resData.session,
                player1: resData.session.IDplayer1,
                player2: resData.session.IDplayer2,
                othello: resData.session.games[1],
                memory: resData.session.games[0],
                currentGame: resData.session.currentGame,
            });
        })
        .then(()=>this.createAllGames())
        .catch(err=>{console.log(err)});
    }
    
    createAllGames(){
        
        //if(this.state.player2 !== null && this.initialized === false){

            for(let i=0; i< this.state.othello; i++){
                this.createGame('http://localhost:8080/othello/newgame', 'othello');
            }
            for(let i=0; i< this.state.memory; i++){
                this.createGame('http://localhost:8080/memory/newgame', 'memory');
            }
            this.setState({initialized: true});
        //}
    }

    addGame(){
        console.log(this.state.game, '---------')
        fetch('http://localhost:8080/session/newgameInsession/' + this.state.idSession,{
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

    createGame(url, type){
        console.log(url)
        fetch(url, {
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
            let list = this.state.games.concat(data.post._id)
            this.setState({
                idGames: list
            })
            console.log(this.state.idGames)     
        })
        .catch(err=>{
            console.log(err)
        });     
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
                        <ul class="list-group">{
                            this.state.idGames.map((elm, i) =>{
                                console.log(elm)
                                return(<li class="list-group-item">Juego {i+1} ID: {elm}</li>)
                            })
                        }
                            
                        </ul>
                     
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Lista de Juegos</h5>
                        
                        <div className="card-text">{this.state.othello > 0 && 
                            <div>
                                Othello: {this.state.othello} <button onClick={this.clickOthello} className="btn btn-primary">Jugar</button>
                            </div>
                            
                            }
                        </div>
                        <div className="card-text">{this.state.memory > 0 && 
                            <div>
                                Memoria: {this.state.memory}<button onClick={this.clickMemory} className="btn btn-primary">Jugar</button>
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