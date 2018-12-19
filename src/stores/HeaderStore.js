/**
 * Created by emrahsoytekin on 15.06.2018.
 */
import alt from '../alt';
import CategoryActions from '../actions/CategoryActions';
import AuthenticationActions from '../actions/AuthenticationActions';
class HeaderStore {
    constructor(){
        this.loggedIn = false;
        this.bindListeners({
            handleUpdateCategories: CategoryActions.UPDATE_CATEGORIES,
            handleFetchFail: CategoryActions.FETCH_FAIL_ACTION,
            handleLogoutSuccess: AuthenticationActions.LOGOUT
        });

    }

    handleUpdateCategories(categories){
        this.loggedIn = true;
    }

    handleFetchFail(errorMessage){
        this.loggedIn = false;
    }

    handleLogoutSuccess(){
        console.log("logout success for headerstore");
        this.loggedIn = false;
    }


}
export default alt.createStore(HeaderStore,"HeaderStore");
