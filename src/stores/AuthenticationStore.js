/**
 * Created by emrahsoytekin on 15.06.2018.
 */
import alt from '../alt';
import AuthenticationService from '../sources/AuthenticationService';
import AuthenticationActions from '../actions/AuthenticationActions';
class AuthenticationStore {
    constructor(){
        this.loggedIn = false;
        this.bindListeners({
            handleLogoutSuccess: AuthenticationActions.LOGOUT,
            handleLoginSuccess: AuthenticationActions.LOGIN
        });
        this.registerAsync(AuthenticationService);
    }

    handleLogoutSuccess(errorMessage){
        console.log("logout success form Authentication store");
        this.loggedIn = false;
        this.errorMessage = errorMessage;
    }

    handleLoginSuccess(authData){
        this.loggedIn = true;
    }
}
export default alt.createStore(AuthenticationStore,"AuthenticationStore");
