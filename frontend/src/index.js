import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import * as serviceWorker from './serviceWorker';
import App from './components/App';
import SignIn from './components/SignIn';

import Board from './components/Board';
import reducers from './reducers';
import Square from './components/Square';
import Menu from './components/Menu';
import NewSession from './components/NewSession';
import Sessions from './components/Sessions';
import Session from './components/Session';
import NewGame from './components/NewGame';


ReactDOM.render(
    <Provider store={createStore(reducers, {}, applyMiddleware(reduxThunk))}>
        <BrowserRouter>
            <App>
                <Route exact path="/" component={SignIn} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/Menu" component={Menu} />
                <Route exact path="/Newsession" component={NewSession} />
                <Route exact path="/Sessions" component={Sessions} />
                <Route exact path="/Session" component={Session} />
                <Route exact path="/Board" component={Board} />
                <Route exact path="/memory/:id" component={Board} />
                <Route exact path="/othello/:id" component={Board} />
                <Route exact path="/Square" component={Square} />
                <Route exact path="/newGame" component={NewGame} />
            </App>
        </BrowserRouter>
    </Provider>,

document.querySelector('#root'));

serviceWorker.unregister();