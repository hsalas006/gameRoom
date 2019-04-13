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
      player1: 'success',
      player2: 'light'
    };

    this.handleClick = this.handleClick.bind(this);
    this.drawBoard = this.drawBoard.bind(this);
    this.checkMove = this.checkMove.bind(this);
  }

  componentDidMount(){
    let idSocket = this.state.game._id;
    console.log('idGame: 0', idSocket, '<<<<<<<');
    console.log(this.props.location.state.game,'>>><<<<')
    this.checkMove()
    this.drawBoard();

    socket.on(idSocket.toString(), data =>{
      console.log('----*******************************************-: ', data.action, '-- ', idSocket);
      let player1, player2;
      console.log('>>>> ', data)
      if(data.game.turn === 2){
        player1 = 'light';
        player2 = 'success';
      }else{
        player1 = 'success';
        player2 = 'light';
      }

      this.setState({game: data.game, grid: data.game.matrix, turn:data.game.turn, player1: player1, player2: player2});
      
      this.drawBoard();
    })
  }

  
  handleClick(x,y){
    let url = '';
    console.log('x--> ',x,'y--> ',y);

    if(this.state.game.type === 'othello'){
      url = 'http://localhost:8000/othello/gamePlay/';
      this.checkMove(url, x, y);

    }else if (this.state.game.type === 'memory'){
      url = 'http://localhost:8000/memory/gamePlay/'; 
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

    fetch(url + id, {
            method: 'PUT',
            headers: {
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
            })

        }).then(res=>{
          return res.json();
        })
        .then(data =>{
          if(data){

            this.setState({game: data.game, turn: data.game.turn, grid: data.game.matrix});
            this.drawBoard();
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
                  <div className= "innerGame" key={i+'*'+j}>{black}
                  </div>
                </div>
              )
            }
            case 2:{
              return (
                <div className="boxGame" key={i+'_'+j} data-index={i+'_'+j} onClick={()=>this.handleClick(i,j)}>
                  <div className= "innerGame" key={i+'*'+j}>{white}
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
        <div className="gridGame">
          {this.drawBoard()}
        </div> 
        <br></br>
          <div className="alert alert-info col-md-6 offset-md-3 bg-light text-dark" role="alert">
            <h4 className="alert-heading">Turno:  </h4>
            <hr></hr>
            <p className="mb-0">
            <div className={`alert alert-${this.state.player1}`} role="alert">
              Negras - ID: {this.state.game.IDplayer1} - 
            </div>
            <div className={`alert alert-${this.state.player2}`} role="alert">
              Blancas - ID: {this.state.game.IDplayer2} - 
            </div>
            </p>
            <hr></hr>
            <h6 className="alert-heading text-center">Negras: {this.state.game.score[0]}  /  Blancas: {this.state.game.score[1]}</h6>
            
          </div>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Open modal for @mdo</button>
          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <Chat></Chat>
          </div>
      </div>
    )
  }
}