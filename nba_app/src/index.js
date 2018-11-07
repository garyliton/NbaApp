import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router, Route, hashHistory } from 'react-router';
import Whoops404 from './Whoops404';
import Standings from './Standings';
import Teams from './Teams';
import Leaders from './Leaders';

window.React = React

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/"  component={App}/>
        <Route path="/standings" component={App} />
        <Route path="/teams" component={App} />
        <Route path="/leaders" component={App} />
        <Route path="*" component={Whoops404}/>
    </Router>,
    document.getElementById('root')
    
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
