import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import App2 from './components/App2'
import Demo1 from './components/Demo1'
import Demo2 from './components/Demo2'
import * as serviceWorker from './serviceWorker';
import Project1 from './components/Project1';
import LoginPage from './components/LoginPage';
import Registration from './components/Registration';

ReactDOM.render(<App/>,document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
