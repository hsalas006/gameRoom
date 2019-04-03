import React from 'react';
import Square from './Square';
import '../styles/style.css';

export default class Board extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      game: this.props.location.state.game,
      pic:'',
      'isWhite':true,
      
      grid: this.props.location.state.game.matrix,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }


  drawBoard(){
    
  }

  handleClick(x,y){
    console.log('x--> ',x,'y--> ',y);

  }
  render(){
    const black = <img className="pic2" src='https://pngimage.net/wp-content/uploads/2018/05/bola-preta-png-5.png'/>;
    const white = <img className="pic1" src='https://cdn131.picsart.com/278213248025211.png'/>;


    
    const g = this.state.grid;
    
    const board = g.map((row, i) => { return (
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
              break;
            }
          }
        })
      }   
      </div>)
    });

    return (
      <div className="gridGame">
        {board}
      </div>
    
      
    )
  }
}