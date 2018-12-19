/**
 * Created by emrahsoytekin on 16.06.2018.
 */
import alt from '../alt';
import {TaskRemote} from '../remote';
class TaskActions {

    fetch(category){
        return category;
    }

    addTask(task) {
        // return task;
        return (dispatch) => {
            dispatch(task);
            return TaskRemote.addTask(null,task).then(task => {
                this.addSuccess(task);
                return Promise.resolve(task);
            })
        }

        // return (dispatch) => {
        //     dispatch(task);
        //     return Promise.resolve(task);
        // }
    }

    completeTask(task) {
        return (dispatch) => {
            dispatch(task);

            return TaskRemote.complete(null, task).then(task => {
                this.updateSuccess(task);
                return task;
            }).catch(err => {
                this.operationFail(err);
                throw err;
            })
        }
    }

    completeSuccess(task) {
        return task;
    }

    updateSingle(task) {
        return (dispatch) => {
            dispatch(task);
            return TaskRemote.update(null, task).then(isSuccess => {
                this.updateSuccess(task);
                return isSuccess;
            });
        }
    }

    update(tasks) {
        return tasks;
    }

    operationFail(error) {
        return error;
    }

    updateSuccess(task) {
        return task;
    }

    addSuccess(task) {
        return task;
    }

    delete(task) {
        return task;
    }

    deleteSuccess(task) {
        return task;
    }

    setSelectedTask(task) {
        return task;
    }



}

export default alt.createActions(TaskActions);
