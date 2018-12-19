/**
 * Created by emrahsoytekin on 30.07.2018.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InnerForm from "../InnerForm2";
import {TaskActions, CategoryActions} from '../../actions'
import {toast} from 'react-toastify';

class TaskTemplate extends Component {

    state = {
        showEditForm: false,
        newTaskDescription: this.props.task.description
    };

    handleEditTaskSubmit = () => {
        const {task} = this.props;

        task.description = this.state.newTaskDescription;

        this.setState({showEditForm: false})

        TaskActions.updateSingle(task).then(isSuccess => {
            this.handleResponse(isSuccess);
        });
    };

    handleResponse = (res) => {
        if (res) {
            toast.success("Task updated successfully! Go grab a cup of tea!");
        } else {
            toast.error("Operation failed!");
        }

    };

    handleDeleteTask(e,task) {
        e.stopPropagation();
        if (window.confirm("Are you sure")) {
            TaskActions.delete(task);
        }
    }

    render() {

        const {task, selectedTask, category} = this.props;

        let className = "btn-link list-group-item";
        if (task.done) {
            className += " list-group-item-success";
        }
        if (selectedTask && task.id === selectedTask.id) {
            className += " active";
        }


        const {showEditForm} = this.state;
        return (
            <div>
                {showEditForm ?
                    <InnerForm
                        onSubmit={this.handleEditTaskSubmit}
                        onChange={(e) => {
                            this.setState({newTaskDescription: e.target.value})
                        }}
                        value={this.state.newTaskDescription}
                        reset={(e) => {
                            this.setState({
                                newTaskDescription: task.description,
                                showEditForm: false
                            })
                        }}

                    /> :

                    <a className={className} style={{cursor: "pointer"}} draggable="true"
                       onClick={() => this.props.onTaskSelect(task)}
                    >
                        <div className="input-group">
                            <input type="CHECKBOX" className="chkbx"
                                   onClick={e =>  e.stopPropagation()}
                                   onChange={(e) => {
                                       task.done=e.target.checked;
                                       if (task.done) {
                                           category.completedTaskCount++;
                                           category.taskCount--;
                                       } else {
                                           category.completedTaskCount--;
                                           category.taskCount++;
                                       }

                                       TaskActions.completeTask(task).then(isSuccess=> {
                                           this.handleResponse(isSuccess);
                                           CategoryActions.setCategory(category);
                                       });

                                   }}
                                   checked={task.done}
                                   />
                            <span style={{paddingLeft: "10px"}}>{task.description}</span>
                            <span className="badge"
                                  style={{marginLeft: "12px"}}>{task.subtaskCount > 0 && task.subtaskCount}</span>
                            <span className="input-group-btn">
                                    <button className="btn btn-default glyphicon glyphicon-edit" title="Edit"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                this.setState({
                                                    showEditForm: true
                                                })
                                            }}
                                    />
                                    <button className="btn btn-default glyphicon glyphicon-trash" title="Remove"
                                            data-bind="click: $root.removeTask,preventBubble: ['click']"
                                            onClick={(e) => this.handleDeleteTask(e, task)}/>
                                </span>
                        </div>
                    </a>
                }
            </div>
        )
    }
}

TaskTemplate.propTypes = {
    task: PropTypes.object.isRequired,
    selectedTask: PropTypes.object,
    onTaskSelect: PropTypes.func.isRequired
};

export default TaskTemplate;
