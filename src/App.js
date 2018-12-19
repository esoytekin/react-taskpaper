import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Header from "./components/Header";
import CategoryList from './components/CategoryList'

class App extends Component {
    render() {
        return (
            <div >
                <Header/>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={CategoryList}/>
                    <Route component={Login}/>
                </Switch>
            </div>
        );
    }
}

export default App;
