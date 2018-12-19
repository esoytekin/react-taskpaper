/**
 * Created by emrahsoytekin on 14.06.2018.
 */
import {CategoryActions} from '../actions';
import {CategoryRemote} from '../remote'

let CategorySource = {
    fetchCategories: () => {
        return {
            remote: CategoryRemote.fetchCategories,
            success: CategoryActions.updateCategories,
            error: CategoryActions.fetchFailAction
        }
    },

    add: () => {

        return {
            remote: CategoryRemote.add,
            success: CategoryActions.addSuccessAction,
            error: CategoryActions.fetchFailAction,
            loading: null
        }

    },

    delete: () => {
        return {
            remote: CategoryRemote.delete,
            success: CategoryActions.deleteSuccessAction,
            error: CategoryActions.fetchFailAction,
            loading: null
        }

    },
    update: () => {

        return {
            remote: CategoryRemote.update,
            success: CategoryActions.updateSuccessAction,
            error: CategoryActions.fetchFailAction,
            loading: null
        }
    },


};

export default CategorySource;
