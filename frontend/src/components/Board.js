import React from 'react';
import Square from './Square';
import '../styles/style.css';

export default class Board extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      
      'isWhite':true,
      
      'grid':Array(8).fill().map(x => Array(8).fill("+")),
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }


  handleReset(){
    
  }

  handleClick(x,y){
    console.log('x--> ',x,'y--> ',y);
  }
  render(){
    
    const g = this.state.grid;
    
    const board = g.map((row, i) => { return (
      <div className="rowGame" key={"row_"+i}>
        {row.map((col, j) => {
            
            return (
                <div className="boxGame" key={i+'_'+j} data-index={i+'_'+j} onClick={()=>this.handleClick(i,j)}>
                  <div className= "innerGame" key={i+'*'+j}>{i+'_'+j}  
                  </div>
                </div>
                )
              }
            )
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