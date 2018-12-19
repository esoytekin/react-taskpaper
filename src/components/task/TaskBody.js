/**
 * Created by emrahsoytekin on 17.06.2018.
 */
import React from 'react';
import {  BarLoader} from "react-spinners";
import TaskStore from "../../stores/TaskStore";
import {Animated} from 'react-animated-css';
import TaskTemplate from './TaskTemplate';
import PropTypes from 'prop-types';

/**
 *
 * props.tasks
 * props.category
 * props.showCompleted
 * props.onToggle
 * props.onTaskSelect
 */
class TaskBody extends React.Component {

    render() {

        const {tasks, category,showCompleted,selectedTask} = this.props;

        if (!tasks) {
            return null;
        }

        if (this.props.loading) {
            console.log("loading task body");
        }

        return (

            <div id="task-container" className={selectedTask ? "col-md-8" : "col-md-12"}
                 style={{display: "block", position: "relative"}}>
                <BarLoader
                    color={'#123abc'}
                    loading={TaskStore.isLoading() || this.props.loading}
                    width={-1}
                />
                <div className="list-group" >
                    {tasks.map(t => {
                        return t.done || (
                                <TaskTemplate
                                    selectedTask={selectedTask}
                                    onDelete={this.props.onDelete}
                                    key={t.id}
                                    task={t}
                                    onTaskSelect={this.props.onTaskSelect}
                                    category={this.props.category}
                                />
                            )
                    }) }
                </div>
                { category.completedTaskCount > 0 &&
                (
                    <div>
                        <button className="btn btn-info btn-block " style={{textAlign: "left"}}
                                onClick={this.props.onToggle}
                                data-bind="click: toggleCompleted, fadeVisible: completeTasks().length>0">
                            <span>Completed Items</span>
                            <span className="badge" style={{marginLeft: "10px"}}>{category.completedTaskCount}</span>
                        </button>
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={showCompleted}>
                            <div className="list-group"
                                 data-bind="template: {name:'task-template', foreach: completeTasks }">
                                {tasks.map(t => {
                                    return t.done && (
                                            <TaskTemplate
                                                selectedTask={selectedTask}
                                                onTaskSelect={this.props.onTaskSelect}
                                                key={t.id}
                                                task={t}
                                                category={category}
                                            /> );
                                })}
                            </div>
                        </Animated>
                    </div>
                )
                }

            </div>

        )
    }
}

TaskBody.propTypes = {
    tasks: PropTypes.array.isRequired,
    category: PropTypes.object.isRequired,
    selectedTask: PropTypes.object,
    showCompleted: PropTypes.bool.isRequired,


};

export default TaskBody;
