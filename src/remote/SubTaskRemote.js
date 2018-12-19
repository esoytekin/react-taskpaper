/**
 * Created by emrahsoytekin on 29.07.2018.
 */
import RestConstants from './RestConstants';

let SubTaskRemote = {

    fetch : (state,task) => {
        const url = RestConstants.subtaskUrl+"?id=" + task.id;
        return RestConstants.jFetch(url).then(response => response.data);
    },
    save: (state, subtask) => {
        const url = RestConstants.subtaskUrl;
        return RestConstants.jPost(url, subtask).then(response =>  response.data);
    },
    delete: (state, subtask) => {
        const url = RestConstants.subtaskUrl;
        return RestConstants.jDelete(url,subtask).then(response=> response.data);
    },
    update: (state, subtask) => {
        const url = RestConstants.subtaskUrl;
        return RestConstants.jPut(url, subtask).then(response=> response.data);

    }
};

export default SubTaskRemote;
