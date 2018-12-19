/**
 * Created by emrahsoytekin on 17.06.2018.
 */
import React from 'react';
import {SubtaskActions, TaskActions} from '../../actions';
import {toast} from 'react-toastify';

class STBody extends React.Component  {
    delete = (subtask) => {

        const r = window.confirm("Continue to delete subtask?");

        if (r) {
            SubtaskActions.delete(subtask).then(r=> {
                this.props.task.subtaskCount--;
                TaskActions.setSelectedTask(this.props.task);
                toast.success("Subtask deleted successfully! Go pop some corns!");
            })

        }

    };

    update = (subtask) => {
        SubtaskActions.updateSingle(subtask).then(r => {
            if (subtask.done) {
                this.props.task.subtaskCount--;
            } else {
                this.props.task.subtaskCount++;
            }
            TaskActions.setSelectedTask(this.props.task);
        });
    };

    render(){

        let { subtasks } = this.props;

        const SubtaskTemplate = ({subtask}) => {
            return (
                <tr className={subtask.done ? 'success' : subtask.favorite ? 'danger' : 'warning'} data-bind="css: { success :  done(), danger: favorite() }" >
                    <td style={{width: "1%"}}><input type="CHECKBOX" checked={subtask.done} onChange = {(e) => {
                        subtask.done=e.target.checked;
                        this.update(subtask);
                    }} /></td>
                    <td data-bind="text: description">{subtask.description}</td>
                    <td style={{width: "1%"}}>
                <span className="input-group-btn">
                    <button className="btn btn-default"  onClick={e => {
                        this.delete (subtask);
                    }}>
                        <i className="glyphicon glyphicon-trash"/>
                    </button>
                </span>
                    </td>
                </tr>
            )

        };
        return (
            <div id="sub-task-container">
                <table className="table  table-hover wow fadIn">
                    {subtasks &&  (

                        <tbody data-bind="template: {name: 'subtask-template', foreach: subtasks}">
                        {subtasks.map(subtask => {
                            return <SubtaskTemplate key={subtask.id} subtask={subtask}/>
                        })}
                        </tbody>

                    )}
                </table>
            </div>

        )

    }
};

export default STBody;
