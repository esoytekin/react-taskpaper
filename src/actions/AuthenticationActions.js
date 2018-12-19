/**
 * Created by emrahsoytekin on 15.06.2018.
 */
import alt from '../alt'
class AuthenticationActions {
    logout(result){
        return result;
    }
    login(creds){
        return creds;
    }
    updateCreds(creds){
        return creds;
    }
    loading(){
        return function(dispatch) {
            dispatch();
        }
    }
}

export default alt.createActions(AuthenticationActions);
