import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import Board from '../components/Board';
import Square from '../components/Square';
import Menu from '../components/Menu';
import NewSession from '../components/NewSession';
import Sessions from '../components/Sessions';
import Session from '../components/Session';
import NewGame from '../components/NewGame';

export default class Main extends Component{

    return (){
        return (
            <div>
                <Route exact path="/" component={Menu} />
                <Route exact path="/Menu" component={Menu} />
                <Route exact path="/Newsession" component={NewSession} />
                <Route exact path="/Sessions" component={Sessions} />
                <Route exact path="/Session" component={Session} />
                <Route exact path="/Board" component={Board} />
                <Route exact path="/memory/:id" component={Board} />
                <Route exact path="/othello/:id" component={Board} />
                <Route exact path="/Square" component={Square} />
                <Route exact path="/newGame" component={NewGame} />
            </div>
        );
    }
}