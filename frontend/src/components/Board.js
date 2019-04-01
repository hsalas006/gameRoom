import React from 'react';
import Square from './Square';
import '../styles/style.css';

export default class Board extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      
      pic:'',
      'isWhite':true,
      
      grid:Array(8).fill().map(x => Array(8).fill("+")),
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }


  handleReset(){
    
  }

  handleClick(x,y){
    console.log('x--> ',x,'y--> ',y);
    this.setState({pic: 'https://pngimage.net/wp-content/uploads/2018/05/bola-preta-png-5.png'})

  }
  render(){
    const img = <img style={{width: 50, height: 50}} src='https://pngimage.net/wp-content/uploads/2018/05/bola-preta-png-5.png'/>;
    const white = <img style={{width: 50, height: 50}} src='https://wwww.ishaanbhola.com/d/item/white-circle-pngc09-4dd3-a6e5-e4a33d437599/'/>;

    

    
    const g = this.state.grid;
    
    const board = g.map((row, i) => { return (
      <div className="rowGame" key={"row_"+i}>
        {row.map((col, j) => {
            
            return (
                <div className="boxGame" key={i+'_'+j} data-index={i+'_'+j} onClick={()=>this.handleClick(i,j)}>
                  <div className= "innerGame" key={i+'*'+j}><img style={{width: 50, height: 50}} src={this.state.pic}/>
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