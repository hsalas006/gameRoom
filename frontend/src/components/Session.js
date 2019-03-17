import React, { Component } from 'react';

export default class Session extends Component {
    state = {
        name: '',
        IdPlayer1: '',
        memory: '',
        othello: '',
        level: '', 
        score: ''
      };
    componentDidMount(){
        const Idsession = this.props.match.params.Idsession;
        fetch('http://localhost:8080/session/'+ Idsession)
            .then(res =>{
                if(res.status !== 200){
                    throw new Error('Error al cargar los datos');
                }

                return res.json();
            })
            .then(resData => {
                this.setState({
                    name: resData.session.name,
                    IdPlayer1: resData.session.IdPlayer1,
                    memory: resData.session.memory,
                    othello: resData.session.othello,
                    level: resData.session.level, 
                    score: resData.session.score
                })
            })
    }
};