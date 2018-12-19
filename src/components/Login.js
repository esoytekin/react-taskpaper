import React from 'react';
import AuthenticationStore from '../stores/AuthenticationStore';


const PanelHeader = ({title, ...props}) => (
    <div className="panel-heading">
        <div className="panel-title">{title}</div>
        {props.children}
    </div>
);

const LoginBox = (props) => {
    const login = {};

    const LoginField = ({icon, value, ...props}) => (
        <div style={{marginBottom: "25px"}} className="input-group">
            <span className="input-group-addon"><i className={"glyphicon " + icon}/></span>
            <input className="form-control" name="username"
                   value={login[value]} data-bind="value: username"
                   onChange={(e) => {
                       login[value] = e.target.value;

                   }} required {...props}/>
        </div>
    );
    return (

        <div id="loginbox" style={{marginTop: "50px"}}
             className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <div className="panel panel-info">

                <PanelHeader title="Sign In"/>

                <div style={{paddingTop: "30px"}} className="panel-body">


                    <form id="loginform" className="form-horizontal" data-bind="with: loginElement,submit: loginEvent"
                          onSubmit={(e) => {
                              e.preventDefault();
                              props.onSubmit(login)
                          }}>

                        <LoginField id="login-username" icon="glyphicon-user" placeholder="username or email"
                                    value="username"/>
                        <LoginField id="login-password" icon="glyphicon-lock" placeholder="password" value="password"
                                    type="password"/>


                        <div style={{marginTop: "10px"}} className="form-group">

                            <div className="col-sm-12 controls">
                                <button type="submit" className="btn btn-success">Login</button>

                            </div>
                        </div>

                    </form>
                    <div className="form-group">
                        <div className="col-md-12 control">
                            <div style={{borderTop: "1px solid#888", paddingTop: "15px", fontSize: "85%"}}>
                                Don't have an account!
                                <button className="btn-link" style={{paddingLeft: '10px'}} onClick={props.onToggle}>
                                    Sign Up Here
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};


const SignupBox = (props) => {

    const formData = {};

    const SignupField = ({label, value, ...props}) => {
        return (
            <div className="form-group">
                <label htmlFor="username" className="col-md-3 control-label">{label}</label>
                <div className="col-md-9">
                    <input  {...props} className="form-control" name="username" data-bind="value: lgUsername"
                            placeholder={label} onChange={(x) => {
                        formData[value] = (x.target.value)
                    }} required/>
                </div>
            </div>
        )
    };


    return (
        <div id="signupbox" style={{marginTop: "50px"}}
             className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <div className="panel panel-info">

                <PanelHeader title="Sign Up">
                    <div style={{float: "right", fontSize: '85%', position: "relative", top: "-10px"}}>
                        <button className="btn-link" id="signinlink" onClick={props.onToggle}>Sign In</button>
                    </div>
                </PanelHeader>

                <div className="panel-body">
                    <form id="signupform" className="form-horizontal" data-bind="with: signElement, submit:signUpEvent"
                          onSubmit={(e) => {
                              e.preventDefault();
                              props.signUpUser(formData);
                          }}>

                        <div id="signupalert" className="alert alert-danger dNone">
                            <p>Error:</p>
                            <span/>
                        </div>

                        <SignupField label="Username" type="text" value="lgUsername"/>
                        <SignupField label="Email" type="text" value="lgEmail"/>
                        <SignupField label="First Name" type="text" value="lgFirstName"/>
                        <SignupField label="Last Name" type="text" value="lgLastName"/>
                        <SignupField label="Password" type="password" value="lgPassword"/>

                        <div className="form-group">
                            <div className="col-md-offset-3 col-md-9">
                                <button id="btn-signup" type="submit" className="btn btn-info"><i
                                    className="glyphicon glyphicon-hand-right"/> &nbsp; Sign Up
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = AuthenticationStore.getState();
        this.state.showLogin = true;
        this.state.showSignup = false;

    }

    componentDidMount() {
        AuthenticationStore.listen(this.onChange.bind(this));
    }

    componentWillUnmount() {
        AuthenticationStore.unlisten(this.onChange.bind(this));
    }


    onChange(state) {
        if (state.loggedIn && !this.state.loggedIn){
            this.props.history.push("/");

        }

    }


    render() {

        return (

                <div className="container" style={{marginTop: "70px"}}>

                    {this.state.errorMessage && this.state.errorMessage.message &&
                    <div id="login-alert" className="alert alert-danger col-sm-12 ">
                        {this.state.errorMessage.message}
                    </div>
                    }

                    {this.state.showLogin &&
                    <LoginBox onToggle={this.handleToggle.bind(this)} onSubmit={this.handleLoginSubmit.bind(this)}/>}

                    {this.state.showSignup &&
                    <SignupBox onToggle={this.handleToggle.bind(this)} signUpUser={this.handleSignup.bind(this)}/>}

                </div>
        );
    }

    handleToggle() {
        this.setState({
            showLogin: !this.state.showLogin,
            showSignup: !this.state.showSignup
        })
    }

    handleLoginSubmit(credentials) {
        AuthenticationStore.login(credentials);
    }

    handleSignup(l) {
        console.log(l);
    }

}


export default Login;