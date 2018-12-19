/**
 * Created by emrahsoytekin on 16.06.2018.
 */
import axios from 'axios'

let RestConstants = (function(){


    // const baseUrl = "http://localhost:8081/taskpaper";
    let baseUrl = "http://emrahs.duckdns.org:8080/taskpaper";
    if (process.env.NODE_ENV === 'development') {
         baseUrl = "http://localhost:8081/taskpaper";
    }
    let ajax = (url, body, method) => {
        const authData = localStorage.getItem("authData");

        if (!authData)
            return rejectWithError(501,"authdata not exist",);

        return axios({
            method: method || 'GET',
            url: url,
            withCredentials : true,
            credentials: 'include',
            headers: {
                'Authorization': authData,
                'Content-Type' : 'application/json'
            },
            data: body
        }).catch(err => {
            let message = err.message;

            let statusCode = err.response ? err.response.status : 500;
            return Promise.reject({message,statusCode});
        });

    };

    let jFetch = (url) => {

        return ajax(url);
    };

    let jDelete = (url, body) => {
        return ajax(url,body,'DELETE');

    };

    let jPut = (url, body) => {
        return ajax(url, body, 'PUT');
    };

    let jPost = (url,body) => {
        return ajax(url,body,'POST')
    };

    let rejectWithError =  (statusCode, msg) => {

        if (!msg) {
            msg = "Hata";
            statusCode = statusCode.status;
        }

        return Promise.reject({msg,statusCode});

    };

    let getFormattedDate= () => {
        return new Date().toISOString().
        replace(/T/, ' ').      // replace T with a space
        replace(/\..+/, '');     // delete the dot and everything after,
    };

    return  {
        baseUrl : baseUrl,
        categoryUrl: baseUrl + "/category",
        taskUrl : baseUrl+"/todos",
        subtaskUrl: baseUrl+"/subtask",
        jDelete: jDelete,
        jFetch: jFetch,
        jPost: jPost,
        jPut: jPut,
        rejectWithError: rejectWithError,
        getFormattedDate: getFormattedDate
    };

})();

export default RestConstants;
