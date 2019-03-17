import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import * as serviceWorker from './serviceWorker';
import App from './components/App';
import SignIn from './components/SingIn';

import Board from './components/Board';
import reducers from './reducers';
import Home from './components/Home';
import Menu from './components/Menu';
import NewSession from './components/NewSession';
import Sessions from './components/Sessions';

ReactDOM.render(
    <Provider store={createStore(reducers, {}, applyMiddleware(reduxThunk))}>
        <BrowserRouter>
            <App>
                <Route exact path="/" component={SignIn} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/Menu" component={Menu} />
                <Route exact path="/Newsession" component={NewSession} />
                <Route exact path="/Sessions" component={Sessions} />
                <Route exact path="/Board" component={Board} />
            </App>
        </BrowserRouter>
    </Provider>,

document.querySelector('#root'));

serviceWorker.unregister();