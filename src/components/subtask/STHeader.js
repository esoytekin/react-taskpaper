/**
 * Created by emrahsoytekin on 17.06.2018.
 */
import React from 'react';
const STHeader = ({task,...props}) => {
    return (
        <div className="alert alert-success" role="alert"
             data-bind="css: $root.selectedTask() &&  ($root.selectedTask().done() ? 'alert-success' : $root.selectedTask().favorite() ? 'alert-danger' : 'alert-info')">
            <span data-bind="text: $root.selectedTask().description">{task.description}</span>
        </div>

    )

};
export default STHeader;
