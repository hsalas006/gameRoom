import React, { Component } from 'react';

export default class Home extends Component{

    constructor(props){
        super(props);
        this.state = { message: 'Loading...' };
    }

    componentDidMount(){
        fetch('/session//sessions')
            .then(res => res.IDsession)
            .then(res => this.setState({message: res}));
    }

    return (){
        return (
            <div>
                <h1> Bienvenido!! </h1>
                <p>{this.state.message}</p>
            </div>
        );
    }
}