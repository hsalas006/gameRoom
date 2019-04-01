import React from 'react';

import '../styles/style.css';

export default class Square extends React.Component{

  render(){
    const color_ = this.props.color;
    return (
      <div className="row" onClick={this.props.handleClick} >
        <div className= "inner">   
        </div>
      </div>
    )
  }
}
