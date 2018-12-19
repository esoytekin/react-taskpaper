/**
 * Created by emrahsoytekin on 17.06.2018.
 */
import React from 'react';
const STLabels = ({task}) => {
    return (
        <div>
            <hr />
            <div className="label center-block label-success">Started: {task.date} </div>
            {task.done && <div className="label center-block label-primary"  > Completed:  {task.completeDate} </div> }
        </div>
    )
};
export default STLabels;
