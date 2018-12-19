/**
 * Created by emrahsoytekin on 15.06.2018.
 */
import AuthenticationActions from '../actions/AuthenticationActions';
import RestConstants from '../remote/RestConstants'
let AuthenticationService = {
    logout: () => {
        let remote = (state,errorMessage) => {
            return new Promise((resolve, reject) => {
                const url = `${RestConstants.baseUrl}/logout`;
                RestConstants.jFetch(url).then(() => {
                    localStorage.removeItem("authData");
                    if (errorMessage){
                        resolve(errorMessage);
                    }
                    else {
                        resolve(null);
                    }
                }).catch(err => {
                    localStorage.removeItem("authData");

                    reject({
                        message:err.message
                    });
                });

            })

        };

        return {
            remote,
            success: AuthenticationActions.logout,
            error: AuthenticationActions.logout
        };
    },

    login: () => {
        let remote = (state,credentials) => {
            return new Promise((resolve, reject) => {
                if (!credentials || !credentials.username) {
                    reject("Need Some Creds");
                } else {
                    let authData = "Basic " + btoa(`${credentials.username}:${credentials.password}`);
                    localStorage.setItem("authData", authData);
                    resolve(authData);
                }


            });
        };

        return {
            remote,
            success: AuthenticationActions.login,
            error: AuthenticationActions.logout
        }

    }

};

export default AuthenticationService;
