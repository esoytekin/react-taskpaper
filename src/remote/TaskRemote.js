/**
 * Created by emrahsoytekin on 29.07.2018.
 */
import RestConstants from './RestConstants';

let TaskServiceRemote = {
    addTask: (state,task) => {
        if (!task.hasOwnProperty('categoryName') || !task.hasOwnProperty('description')) {

            let err = new Error("Task object is incomplete! Must have 'categoryName' and 'description' properties.");
            return Promise.reject(err);
        } else {
            let url = RestConstants.taskUrl;
            return RestConstants.jPost(url, task).then(res => res.data );
        }
    },
    fetchTasksByCategory: (state,category) => {
        const url = `${RestConstants.taskUrl}/${category.name}`;
        return RestConstants.jFetch(url)
            .then(response => {
                return ({
                    category: category,
                    tasks: response.data
                })
            })
    },
    delete: (state, task) => {

        if (!task.hasOwnProperty("id")) {
            return Promise.reject(new Error("id is not defined for task object!"));
        }

        let url = RestConstants.taskUrl;
        return RestConstants.jDelete(url, task).then(res => {
            return task;
        });

    },
    update: (state, task) => {
        let url = RestConstants.taskUrl;
        return RestConstants.jPut(url, task).then(res => res.data);
    },
    complete: (state, task) => {
        let url = RestConstants.taskUrl + "/complete";
        if (task.done) {
            task.completeDate = RestConstants.getFormattedDate();
            console.log("",task);
        } else {
            task.completeDate = null;
        }
        return RestConstants.jPut(url, task).then ( res => res.data);
    }
};
export default TaskServiceRemote;
