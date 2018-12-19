/**
 * Created by emrahsoytekin on 15.06.2018.
 */
import React from 'react';
import HeaderStore from '../stores/HeaderStore';
import AuthenticationStore from '../stores/AuthenticationStore';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = HeaderStore.getState();
    }

    componentDidMount(){
        HeaderStore.listen(this.onChange.bind(this));
    }

    componentWillUnmount(){
        HeaderStore.unlisten(this.onChange.bind(this));

    }

    onChange(state) {
        this.setState(state);
    }

    render(){

        const LogoutBtn = (props) => (
            <a href="#logout" title="Logout" onClick={this.logout.bind(this)}>
                <span style={{color: "white"}} className="glyphicon glyphicon-off" aria-hidden="true"/>
            </a>
        );
        return(
            <div className="navbar navbar-default navbar-fixed-top  thin-shadowed">
                <div className="navbar-header col-sm-11">
                    <a className="navbar-brand" href="/#Inbox" >T A S K P A P E R</a>
                </div>
                <div id="navbar" className="navbar-collapse collapse col-sm-1" >
                    <ul className="nav navbar-nav navbar-right">
                        <li className="btn-danger">
                            {this.state.loggedIn && <LogoutBtn/>}
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    logout() {
        AuthenticationStore.logout();
    }
}

export default Header;
