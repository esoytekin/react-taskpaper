/**
 * Created by emrahsoytekin on 16.06.2018.
 */
import React from 'react';
import TaskStore from '../stores/TaskStore';
import SubtaskList from './SubtaskList';
import TaskInput from './task/TaskInput'
import TaskBody from './task/TaskBody';

class TaskList extends React.Component {

    constructor(props) {
        super(props);
        this.state = TaskStore.getState();
        this.state.showCompleted=false;
    }

    componentDidMount() {
        TaskStore.listen(this.onChange.bind(this));
        this._ismounted=true;

    }

    componentDidUpdate(){

    }

    componentWillUnmount() {
        TaskStore.unlisten(this.onChange.bind(this));
        this._ismounted=false;


    }

    onChange(state) {
        if (!this._ismounted){
            return;

        }
        this.setState(state);

    }


    toggleCompleted(){

        this.setState({
            showCompleted:!this.state.showCompleted
        })
    }

    onToggleEditForm() {
        this.setState({
            showEditForm: !this.state.showEditForm
        })
    }

    render() {
        if (TaskStore.isLoading()) {
            console.log("task store is loading");
        }
        return (
            <div>
                <TaskInput category={this.props.category}  />
                <br />
                <br/>
                <TaskBody
                    tasks={this.state.tasks}
                    category={this.props.category}
                    selectedTask={this.props.selectedTask}
                    showCompleted={this.state.showCompleted}
                    onTaskSelect={this.props.onTaskSelect}
                    onToggle={this.toggleCompleted.bind(this)}
                    loading={this.state.loading}
                />

                <SubtaskList selectedTask={this.props.selectedTask}/>
            </div>


        )

    }

}


export default TaskList;
