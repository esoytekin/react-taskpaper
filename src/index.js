import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import './bower_components/bootstrap/dist/css/bootstrap.min.css';
import './animate.min.css'
import 'react-toastify/dist/ReactToastify.css';
// import './bower_components/font-awesome/css/font-awesome.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    ( <HashRouter>
        <App />
    </HashRouter> )
    , document.getElementById('root'));
registerServiceWorker();
