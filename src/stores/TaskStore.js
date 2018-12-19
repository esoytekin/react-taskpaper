/**
 * Created by emrahsoytekin on 14.06.2018.
 */
import alt from '../alt';
import TaskService from '../sources/TaskService';
import {TaskActions} from '../actions';
import AuthenticationActions from '../actions/AuthenticationActions';
import CategoryStore from '../stores/CategoryStore';

class TaskStore {

    constructor(){

        this.tasks = [];
        this.loading= false;
        this.errorMessage = null;

        this.bindListeners({
            handleFetch: TaskActions.FETCH,
            handleUpdate: TaskActions.UPDATE,
            handleAddTask: TaskActions.ADD_TASK,
            handleUpdateSuccess: TaskActions.UPDATE_SUCCESS,
            handleFetchFail: TaskActions.OPERATION_FAIL,
            handleAddSuccess: TaskActions.ADD_SUCCESS,
            handleDelete: TaskActions.DELETE,
            handleDeleteSuccess: TaskActions.DELETE_SUCCESS,
            handleLogoutSuccess: AuthenticationActions.LOGOUT,
            handleSetSelectedTask: TaskActions.SET_SELECTED_TASK,
            handleCompleteTask:TaskActions.COMPLETE_TASK,
            handleCompleteSuccess: TaskActions.COMPLETE_SUCCESS

        });

        this.registerAsync(TaskService);

        this.exportPublicMethods({
            setCategory: this.setCategory,
        });

    }

    handleCompleteTask (task) {
        this.loading = true;
    }
    handleCompleteSuccess(task) {
        this.loading = false;
    }



    setCategory(category) {
        this.state = {
            category: category
        };
        this.emitChange();
    }


    handleFetch(category){
        this.waitFor(CategoryStore);
        if (!this.getInstance().isLoading()) {
            this.category = category;
            this.tasks = [];
            this.getInstance().fetchTasksByCategory(category);
        }
    }

    handleAddTask(task) {
        this.loading = true;
       // if (!this.getInstance().isLoading()){
           // this.getInstance().addTask(task);
       // }
    }

    handleUpdate(response) {
        this.tasks = response.tasks;

    }

    //optional handler for store
    handleUpdateSuccess(task) {

        this.loading = false;
        for(let t of this.tasks) {
            if (t.id === task.id) {
                t = task;
            }
        }

    }

    handleFetchFail(err) {
        this.loading = false;
        console.log(err);
        this.errorMessage = err;
    }

    handleAddSuccess(task) {
        this.task = task;
        this.tasks.push(task);
        this.loading = false;
    }

    handleDelete(task) {
        if (!this.getInstance().isLoading()) {
            this.getInstance().delete(task);
        }
    }

    handleDeleteSuccess(task) {
        for (let i=0; i< this.tasks.length; i++) {
            let t = this.tasks[i];
            if (t.id === task.id) {
                this.tasks.splice(i,1);
            }

        }
    }

    handleLogoutSuccess(){
        this.tasks = null;
    }

    handleSetSelectedTask(task) {
        this.selectedTask = task;
    }

}

export default alt.createStore(TaskStore,"TaskStore");
