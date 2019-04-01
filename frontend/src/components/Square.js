import React from 'react';

import '../styles/style.css';

export default class Square extends React.Component{

  render(){
    const color_ = this.props.color;
    return (
      <div className="row"
        style={{
          overflow:'hidden',
          width:'auto',
          height:'25px',
          backgroundColor:'#e4e4a1',
          color:'red',
          boarderColor: 'black',
          border:".5px solid black"
        }}
      onClick={this.props.handleClick} >
        <div className= ""
          style={{color:color_,
                  border:"1px solid",
                  backgroundColor: color_,
                  borderRadius: "50%",
                  borderColor: color_,
                  height:"25px"}} >
        </div>
      </div>
    )
  }
}
