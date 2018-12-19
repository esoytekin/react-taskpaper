/**
 * Created by emrahsoytekin on 14.06.2018.
 */
import alt from '../alt';
import CategorySource from '../sources/CategorySource';
import TaskStore from '../stores/TaskStore';
import AuthenticationStore from '../stores/AuthenticationStore';
import {CategoryActions, AuthenticationActions, TaskActions} from '../actions';

class CategoryStore {

    constructor(){
        this.categories = [];
        this.bindListeners({
            handleFetchCategories: CategoryActions.FETCH_CATEGORIES,
            handleUpdateCategories: CategoryActions.UPDATE_CATEGORIES,
            handleFetchFail: CategoryActions.FETCH_FAIL_ACTION,
            handleUpdateFail: CategoryActions.UPDATE_FAIL_ACTION,
            handleAddSuccess: CategoryActions.ADD_SUCCESS_ACTION,
            handleUpdateSuccess: CategoryActions.UPDATE_SUCCESS_ACTION,
            handleDeleteSuccess: CategoryActions.DELETE_SUCCESS_ACTION,
            setCategory: CategoryActions.SET_CATEGORY,
            handleLogoutSuccess: AuthenticationActions.LOGOUT,
            handleLoginSuccess: AuthenticationActions.LOGIN,
            handleLoading: AuthenticationActions.LOADING,
            handleTaskAdd: TaskActions.ADD_SUCCESS,
            handleTaskDelete: TaskActions.DELETE_SUCCESS
        });

        this.registerAsync(CategorySource);

    }

    setCategory(category) {
        this.waitFor(TaskStore);
        this.category = category;

    }
    handleFetchCategories(){
        this.loading = false;
        this.loggedOut = false;
        if (!this.getInstance().isLoading()) {
            this.categories = [];
            this.getInstance().fetchCategories();
        }

    }

    handleUpdateCategories(categories) {
        this.loading = false;
        this.categories = categories;
        this.errorMessage = null;
    }


    handleFetchFail(errorMessage){
        this.loading=false;
        console.log("fetch failed for category store");
        if (errorMessage ) {
            if (errorMessage.statusCode === 501) {
                errorMessage = null;
            } else {
                this.errorMessage = errorMessage;
            }
        }
        AuthenticationStore.logout(errorMessage);

    }
    handleUpdateFail(errorMessage) {

    }

    handleAddSuccess(category) {
        this.categories.unshift(category);
        this.category = category;
    }
    handleUpdateSuccess(category) {
        this.loading = false;
        this.category = category;
    }
    handleDeleteSuccess(category) {
        this.loading=false;
        this.categories = this.categories.filter(x=> x.id !==category.id);
        this.category = this.categories[0];
    }
    handleTaskAdd(task) {

        let category = this.categories.find(x => x.id ===task.categoryId);
        let taskCount = category.taskCount || 0;

        category.taskCount =  taskCount+1;
    }
    handleTaskDelete(task) {

        let state = this.getInstance().getState();
        let taskCount = state.category.taskCount || 0;
        let completedTaskCount = state.category.completedTaskCount || 0;
        if (task.done) {
            state.category.completedTaskCount = completedTaskCount -1;
        }else {

            state.category.taskCount =  taskCount-1;
        }
    }
    handleLogoutSuccess(){
        console.log("logout success for category store");
        this.categories=[];
        this.category = null;
        this.loggedOut = true;
    }

    handleLoginSuccess(){
        console.log("login success form category store");
        this.authData = localStorage.getItem("authData");
        this.loggedOut = false;
    }

    handleLoading(){
        this.loading= true;
    }

}

export default alt.createStore(CategoryStore,"CategoryStore");
