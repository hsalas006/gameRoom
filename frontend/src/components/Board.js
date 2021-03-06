import React from 'react';
import Square from './Square';
import {socket} from './Header';
import '../styles/style.css';
import Chat from './Chat';
export default class Board extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      game: this.props.location.state.game,
      turn: this.props.location.state.game.turn,    
      grid: this.props.location.state.game.matrix,
      player1: '',
      player2: '',
      level:this.props.location.state.game.level, 
      auto:this.props.location.state.game.auto,
      end: false,
      msn: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.drawBoard = this.drawBoard.bind(this);
    this.checkMove = this.checkMove.bind(this);
  }

  componentDidMount(){
    let idSocket = this.state.game._id;
    
    if(this.state.turn===1){
      this.setState({player1:'light', player2: 'success'})
    }
    else{
      if(this.state.auto){
        this.handleClick(0,0)
      }
      this.setState({player1:'success', player2: 'light'})
    }
    this.drawBoard();

    socket.on(idSocket.toString(), data =>{
      let player1, player2;
      if(data.game.turn === 2){
        player1 = 'success';
        player2 = 'light';
        this.handleClick(0,0);
      }else{
        player1 = 'light';
        player2 = 'success';
      }

      this.setState({game: data.game, grid: data.game.matrix, turn:data.game.turn, player1: player1, player2: player2});
      
      this.drawBoard();
    })
  }

  handleClick(x,y){
    let url = '';

    if(this.state.game.type === 'othello'){
      url = 'http://localhost:8000/othello/gamePlay/';
      this.checkMove(url, x, y);

    }
    else{
      alert('Error de reconocimiento');
    }
  }

  checkMove(url, x, y){
 
    let matrix = this.state.game.matrix;
    let size = this.state.game.size;
    let id = this.state.game._id;
    let level= this.state.game.level;
    let auto= this.state.game.auto;

    fetch(url + id, {
            method: 'PUT',
            headers: {
              Authorization: localStorage.getItem('idToken'),
              'content-type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              idGame: id,
              row: x, 
              col: y,
              matrix: matrix,
              turn: this.state.turn,
              size: size,
              level: level,
              auto: auto
            })

        }).then(res=>{
          return res.json();
        })
        .then(data =>{
          if(data.game){

            this.setState({game: data.game, turn: data.game.turn, grid: data.game.matrix});
            this.drawBoard();
            if((this.state.turn===2)&(this.state.auto===true)) this.handleClick(0,0);
          }
          console.log('fin del juego: ', data.end)
          if((data.end)&(!this.state.end)){
            this.setState({end:true})
          }
        })
        .catch(err=>{
          console.log(err)
        });  
  }


  drawBoard(){
    const black = <img className="pic2" src='https://pngimage.net/wp-content/uploads/2018/05/bola-preta-png-5.png'/>;
    const white = <img className="pic1" src='https://cdn131.picsart.com/278213248025211.png'/>;
    const g = this.state.grid;
    
    return g.map((row, i) => { return (
      <div className="rowGame" key={"row_"+i}>
        {row.map((col, j) => {
          switch(col){
            
            case 1:{
              return (
                <div className="boxGame" key={i+'_'+j} data-index={i+'_'+j} onClick={()=>this.handleClick(i,j)}>
                  <div className= "innerGame" key={i+'*'+j}>{white}
                  </div>
                </div>
              )
            }
            case 2:{
              return (
                <div className="boxGame" key={i+'_'+j} data-index={i+'_'+j} onClick={()=>this.handleClick(i,j)}>
                  <div className= "innerGame" key={i+'*'+j}>{black}
                  </div>
                </div>
              )
            }
            default:{
              return (
                <div className="boxGame" key={i+'_'+j} data-index={i+'_'+j} onClick={()=>this.handleClick(i,j)}>
                  <div className= "innerGame" key={i+'*'+j}>
                  </div>
                </div>
              );    
            }
          }
        })
      }   
      </div>)
    });
  }

  render(){

    return (
      
      <div>
        <div>{this.state.end ?
            <div class="alert alert-danger" role="alert">
              EL juego a terminado - ganador : {this.state.game.score[1]>this.state.game.score[0]? 'Negras' : 'Blancas'}
            </div>
            : null
          }
          </div>
        <div className="gridGame">
          {this.drawBoard()}
          
        </div> 
        <br></br>
          <div className="alert alert-info col-md-6 offset-md-3 bg-light text-dark" role="alert">
            <h4 className="alert-heading">Turno:  </h4>
            <hr></hr>
            
            <div className={`alert alert-${this.state.player1}`} role="alert">
              Negras - ID: {this.state.game.IDplayer1} - 
            </div>
            <div className={`alert alert-${this.state.player2}`} role="alert">
              Blancas - ID: {this.state.game.IDplayer2} - 
            </div>
            
            <hr></hr>
            <h6 className="alert-heading text-center">Negras: {this.state.game.score[1]}  /  Blancas: {this.state.game.score[0]}</h6>
            
          </div>
          <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Escribir mensaje" aria-label="Escribir mensaje" aria-describedby="button-addon2"/>
              <div className="input-group-append">
                  <button className="btn btn-outline-primary" type="button" id="button-addon2" data-toggle="modal" data-target="#exampleModalCenter">Enviar</button>
              </div>
          </div>
          
          <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <Chat msn={this.state.msn}></Chat>
          </div>
      </div>
    )
  }
}