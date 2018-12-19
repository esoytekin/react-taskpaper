/**
 * Created by emrahsoytekin on 16.06.2018.
 */
import {SubtaskActions} from '../actions';
import {SubTaskRemote} from '../remote'

let SubtaskService = {
    fetch: () => {
        return {
            remote: SubTaskRemote.fetch,
            success: SubtaskActions.update,
            error: SubtaskActions.operationFail
        }
    },
    save: () => {
        return {
            remote: SubTaskRemote.save,
            success: SubtaskActions.saveSuccess,
            error: SubtaskActions.operationFail
        }
    }

};

export default SubtaskService;
