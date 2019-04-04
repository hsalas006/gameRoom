import React from 'react';
import Square from './Square';
import '../styles/style.css';

export default class Board extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      game: this.props.location.state.game,
      turn: 'white',    
      grid: this.props.location.state.game.matrix,
    };

    this.handleClick = this.handleClick.bind(this);
    this.drawBoard = this.drawBoard.bind(this);
    this.checkMove = this.checkMove.bind(this);
  }


  handleClick(x,y){
    let url = '';
    console.log('x--> ',x,'y--> ',y);

    if(this.state.turn === 'white'){
      this.setState({turn: 'black'})
    }else{
      this.setState({turn: 'white'})
    }
    if(this.state.game.type === 'othello'){
      url = 'http://localhost:8080/othello/gamePlay/';
      this.checkMove(url, x, y);

    }else if (this.state.game.type === 'memory'){
      url = 'http://localhost:8080/memory/gamePlay/'; 
      this.checkMove(url, x, y);
    }
    else{
      alert('Error de reconocimiento');
    }
  }

  async checkMove(url, x, y, turn){
    try{
      console.log(this.state.game.matrix, '<<<---**');
      let matrix = this.state.game.matrix;
      let size = this.state.game.size;
      let id = this.state.game._id;

      console.log(this.state.game._id, '<<<---**');
      await fetch('http://localhost:8080/othello/gamePlay/' + id, {
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
                turn: turn,
                size: size,
              })

          }).then(res=>{
            return res.json();
          })
          .then(data =>{
            console.log(data.game, '*****---------');
            this.setState({game: data.game, turn: 'black', grid: data.game.matrix});
            this.drawBoard();

          })
          .catch(err=>{
            console.log(err)
          });  
    }catch (error){
      console.log(error);
    }
    
  }


  drawBoard(){
    const black = <img className="pic2" src='https://pngimage.net/wp-content/uploads/2018/05/bola-preta-png-5.png'/>;
    const white = <img className="pic1" src='https://cdn131.picsart.com/278213248025211.png'/>;
    const g = this.state.grid;
    
    return g.map((row, i) => { return (
      <div className="rowGame" key={"row_"+i}>
        {row.map((col, j) => {
          console.log(col)
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
              break;
            }
          }
        })
      }   
      </div>)
    });
  }

  render(){

    return (
      <div className="gridGame">
        {this.drawBoard()}
      </div> 
    )
  }
}