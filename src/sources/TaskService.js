/**
 * Created by emrahsoytekin on 16.06.2018.
 */
import TaskActions from '../actions/TaskActions';
import TaskServiceRemote from '../remote/TaskRemote'
let TaskService = {
    fetchTasksByCategory : () => {
        let local = (state) => {
            return ( state.tasks && state.tasks.length > 0 ) ? state.tasks : null;
        };

        return {
            local,
            remote: TaskServiceRemote.fetchTasksByCategory,
            success: TaskActions.update,
            error: TaskActions.fetchFail,
            loading: null
        }
    },
    addTask: () => {
        return {
            remote: TaskServiceRemote.addTask,
            success:TaskActions.addSuccess,
            error: TaskActions.operationFail,
            loading: null

        };
    },
    delete: () => {
        return {
            remote: TaskServiceRemote.delete,
            success: TaskActions.deleteSuccess,
            error: TaskActions.operationFail
        }
    }

};

export default TaskService;
