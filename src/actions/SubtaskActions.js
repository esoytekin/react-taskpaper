import alt from '../alt';
import {SubTaskRemote} from '../remote'
class SubtaskActions {
    fetch(task){
        return task;
        // return function(dispatch) {
        //     dispatch(task);
        // }
    }

    update(subtasks){
        return subtasks;
    }

    save(subtask) {
        // return subtask;
        return (dispatch) => {
            dispatch(subtask);
            return SubTaskRemote.save(null, subtask).then(subtask => {
                this.saveSuccess(subtask);
                return subtask;
            });

        }
    }

    saveSuccess(subtask) {
        return subtask;
    }

    delete(subtask) {
        return (dispatch) => {
            dispatch(subtask);
            return SubTaskRemote.delete(null, subtask).then(result => {
                this.deleteSuccess(subtask);
                return result;
            })

        }
    }

    deleteSuccess(subtask) {
        return subtask;
    }

    updateSingle(subtask) {
        return (dispatch) => {
            return SubTaskRemote.update(null, subtask).then(result => {
                dispatch(subtask);
                return subtask;
            });

        }
    }

    operationFail(error){
        return error;
    }

}

export default alt.createActions(SubtaskActions);
