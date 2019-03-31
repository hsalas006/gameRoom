import React from 'react';

import '../styles/style.css';

export default class Square extends React.Component{

  render(){
    const color_ = this.props.color;
    return (
      <td className= "box"
      onClick={this.props.handleClick} >
        <div className= "box">
        </div>
      </td>
    )
  }
}
