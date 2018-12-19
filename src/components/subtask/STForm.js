/**
 * Created by emrahsoytekin on 17.06.2018.
 */
import React from 'react';
import {SubtaskActions, TaskActions} from '../../actions'
import {toast} from 'react-toastify';
class STForm extends React.Component {

    state = {
        description: ''
    };

    handleSubmit = (e) => {

        e.preventDefault();

        const subtask = {
            description: this.state.description,
            taskId: this.props.task.id
        };
        this.setState({description:""});
        this.props.task.subtaskCount++;
        SubtaskActions.save(subtask).then(r => {
            toast.success("Subtask created successfully! Go grab a cake!");
            TaskActions.setSelectedTask(this.props.task);
        })
    };

    render(){
        let {task} = this.props;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="TEXT" className="form-control" required
                               value={this.state.description}
                               placeholder={"Add an item to " + task.description}
                               onChange={e=> this.setState({description: e.target.value})}
                       />
                    </div>
                </form>
            </div>

        );

    }

}
export default STForm;
