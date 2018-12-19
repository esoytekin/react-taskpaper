/**
 * Created by emrahsoytekin on 16.06.2018.
 */
import React,{Component} from 'react';
import SubtaskStore from '../stores/SubtaskStore';
import STHeader from './subtask/STHeader';
import STForm from './subtask/STForm';
import STBody from './subtask/STBody';
import Notes from './subtask/Notes';
import STLabels from './subtask/STLabels';
import {BarLoader} from "react-spinners";



class SubtaskList extends Component{

    constructor(props) {
        super(props);
        this.state=SubtaskStore.getState();
    }

    componentDidMount(){
        SubtaskStore.listen(this.onChange.bind(this));
        this._ismounted=true;

    }

    componentWillUnmount(){

        SubtaskStore.unlisten(this.onChange.bind(this));
        this._ismounted=false;
    }

    onChange(state) {
        if (this._ismounted) {
            this.setState(state);
        }
    }



    render(){
        if (SubtaskStore.isLoading()) {
            console.log("subtaskstore is loading...");
        }
        const STLoader = () => (
            <div style={{textAlign: 'center'}}>
            <BarLoader color={'#123abc'}
                       loading={SubtaskStore.isLoading() || this.state.loading}
                       width={-1}

            />
            </div>
        );

        if (!this.props.selectedTask) {
            return null;
        }

        return (



            <div className="transition col-md-4" data-bind="fadeVisible: $root.selectedTask() ">
                <STHeader  task={this.props.selectedTask}/>
                <STForm task={this.props.selectedTask} />
                <STLoader/>
                <STBody task={this.props.selectedTask} subtasks={this.state.subtasks} />
                <Notes task={this.props.selectedTask} />
                <STLabels task={this.props.selectedTask} />
            </div>
        )
    }

}


export default SubtaskList;
