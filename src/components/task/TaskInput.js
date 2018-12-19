/**
 * Created by emrahsoytekin on 17.06.2018.
 */
import React from 'react';
import {TaskActions} from '../../actions'
import {toast} from 'react-toastify';
class TaskInput extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            newTaskDescription: ""
        }
    }

    addTask(category, taskDescription) {
        let task = {
            categoryName : category.name,
            description: taskDescription,
        };


        TaskActions.addTask(task).then(r => {
            toast.success("yay!!");

        })
    }
    render(){
        return (

            <div className="col-md-12">
                <form
                    onSubmit={(e)=>{
                        e.preventDefault();
                        let description = this.state.newTaskDescription;
                        this.setState({
                            newTaskDescription:''
                        })
                        this.addTask(this.props.category,description);
                    }}>
                    <div className="form-group">
                        <input type="TEXT" autoComplete="off" className="form-control" id="txtNewTask" required
                               onChange={(e) => {
                                   this.setState({
                                       newTaskDescription: e.target.value
                                   })
                               }}
                               value={this.state.newTaskDescription}
                                placeholder={"Add an item to " + this.props.category.name}/>
                    </div>
                </form>
            </div>
        )
    }
}

export default TaskInput;
