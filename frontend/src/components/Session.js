
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
          this.createGame = this.createGame.bind(this);
          this.displayGame = this.displayGame.bind(this);
          this.clickMemory = this.clickMemory.bind(this);
          this.clickOthello = this.clickOthello.bind(this);
      }

   

    componentDidMount() {
        this.loadSession();
        //this.createGameOthello();
      }
    
    loadSession(){
        fetch('http://localhost:8080/session/'+ this.props.location.state.idSession)
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
            console.log(data.post);

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