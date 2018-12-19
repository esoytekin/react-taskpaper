/**
 * Created by emrahsoytekin on 14.06.2018.
 */
import alt from '../alt';
import SubtaskActions from '../actions/SubtaskActions';
import AuthenticationActions from '../actions/AuthenticationActions';
import SubtaskService from '../sources/SubtaskService';

class SubtaskStore {
    constructor(){
        this.subtasks = [];
        this.loading = false;
        this.error = null;
        this.bindListeners({
            handleFetch: SubtaskActions.FETCH,
            handleUpdate: SubtaskActions.UPDATE,
            handleUpdateSingle: SubtaskActions.UPDATE_SINGLE,
            handleSave: SubtaskActions.SAVE,
            handleSaveSuccess: SubtaskActions.SAVE_SUCCESS,
            handleDelete: SubtaskActions.DELETE,
            handleDeleteSuccess: SubtaskActions.DELETE_SUCCESS,
            handleOperationFail: SubtaskActions.OPERATION_FAIL,
            handleLogoutSuccess: AuthenticationActions.LOGOUT
        });

        this.registerAsync(SubtaskService);

    }

    handleFetch(task){
        this.subtasks = [];
        if (!this.getInstance().isLoading()) {
            this.getInstance().fetch(task);
        }
    }

    handleUpdate(subtasks){
        this.subtasks = subtasks;
    }

    handleSave(subtask) {
        this.loading = true;
    }

    handleSaveSuccess(subtask) {
        this.subtasks.unshift(subtask);
        this.loading = false;
    }

    handleDelete(subtask) {

        this.loading=true;
    }


    handleDeleteSuccess(subtask) {
        this.loading = false;
        for (let i=0; i< this.subtasks.length; i++) {
            let t = this.subtasks[i];
            if (t.id === subtask.id) {
                this.subtasks.splice(i,1);
            }

        }

    }

    handleOperationFail(error) {
        this.error = error;
    }

    handleLogoutSuccess(){
        this.subtasks = null;
    }

    handleUpdateSingle(subtask) {

        for (let i=0; i< this.subtasks.length; i++) {
            let t = this.subtasks[i];
            if (t.id === subtask.id) {
                t=subtask;
            }
        }
    }
}

export default alt.createStore(SubtaskStore,"SubtaskStore");
