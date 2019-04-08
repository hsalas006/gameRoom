
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
            othelloNum: 0,
            othelloList: [],
            memoryNum: 0,
            memoryList: [],
            currentGame: '',
            initialized: false
          };
          this.createGame = this.createGame.bind(this);
          this.displayGame = this.displayGame.bind(this);
          this.clickMemory = this.clickMemory.bind(this);
          this.clickOthello = this.clickOthello.bind(this);
          this.addGame = this.addGame.bind(this);
      }
    
    createAllGames(){
        if(localStorage.getItem('userId')=== this.state.player1){

            for(let i=0; i< this.state.othelloNum; i++){
                this.clickOthello();
            }
            for(let i=0; i< this.state.memoryNum; i++){
                this.clickMemory();
            }
        }
    }

    componentDidMount() {
        this.loadSession();

        //this.createGameOthello();
    }

    addGame(game){
        
        fetch('http://localhost:8080/session/'+this.state.idSession,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
  
                  idSession: this.state.idSession,
                  game : game
              })
            })
          .then(res=>{
              return res.json();
          }).then(data=>{
              console.log(data.post);
              this.setState({})
          })
          .catch(err=>{
              console.log(err);
          });


        
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
                othelloNum: resData.session.games.othello.num,
                othelloList: resData.session.games.othello.idGames,
                memoryNum: resData.session.games.memory.num,
                mameryList: resData.session.games.memory.idGames,
                currentGame: resData.session.currentGame,
            });
        })
        .catch(err=>{console.log(err)});
    }

    clickOthello(){
        let url = 'http://localhost:8080/othello/newgame';
        let type = 'othello';
        this.createGame(url, type);
    }

    clickMemory(){
        let url = 'http://localhost:8080/memory/newgame';
        let type = 'memory';
        this.createGame(url, type);
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
            console.log(data.post, '¡¡¡¡¡¡¡¡¡');
            this.setState({

            })
            this.addGame(data.post);
            this.displayGame('/board', data.post);
        });
        
    }
    displayGame(path, game){
        this.props.history.push({pathname: path, state: {game: game}});  
    }

    handleClick(e) {
        console.log('---->>>',e);
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
                        {!this.state.initialized && localStorage.getItem('userId') === this.state.session.IDplayer1 ?
                            <button onClick={this.clickOthello} className="btn btn-primary">Crear Juegos</button>
                            : null
                        }
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Lista de Juegos</h5>
                        
                        <div className="card-text">{this.state.othelloNum > 0 && 
                            <div>
                                Othello: {this.state.othelloNum} <button onClick={this.clickOthello} className="btn btn-primary">Jugar</button>
                            </div>
                            
                            }
                        </div>
                        <div className="card-text">{this.state.memoryNum > 0 && 
                            <div>
                                Memoria: {this.state.memoryNum}<button onClick={this.clickMemory} className="btn btn-primary">Jugar</button>
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