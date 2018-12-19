/**
 * Created by emrahsoytekin on 17.06.2018.
 */
import React from "react";
import StringUtil from "../../StringUtil";
import InnerForm from "../InnerForm2";
import {TaskActions} from "../../actions";
import {Button} from "reactstrap";
import {Modal} from "react-bootstrap";

class Notes extends React.Component{
    state = {
        modal: false,
        note: this.props.task.note,
        fullScModal: false
    };

    toggle(){
        this.setState({
            modal: !this.state.modal,
            note: this.props.task.note
        });
    }

    handleEditSubmit(){

        const {task} = this.props;
        task.note = this.state.note;
        this.setState({
            modal: !this.state.modal
        });
        TaskActions.updateSingle(task).then(isSuccess => {
        });
    }

    render(){
        const {task} = this.props;
        return (
            <div>
                <div className="alert alert-warning">
                    Notes&nbsp;&nbsp;&nbsp;
                    <i className="glyphicon glyphicon-pencil"/>
                    {task.note &&
                        <Button className="pull-right" style={{padding: 0}} onClick={() => {
                            this.setState({fullScModal: true})
                        }}>
                            <i className="glyphicon glyphicon-fullscreen"/>
                        </Button>
                    }
                </div>
                {this.state.modal ?
                    <InnerForm
                        value={this.state.note}
                        reset={this.toggle.bind(this)}
                        onChange={(e) => {
                            this.setState({note: e.target.value})
                        }}
                        onSubmit={this.handleEditSubmit.bind(this)}
                        type="textArea"
                    />
                    :
                    <div className="TaskNote" onClick={this.toggle.bind(this)}>
                        <p dangerouslySetInnerHTML={{__html:task.note ? StringUtil.parsedNote(task.note): "Click to add note..."}} />
                    </div>
                }
                <Modal show={this.state.fullScModal} onHide={()=> { this.setState({fullScModal: false}) }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Notes</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p dangerouslySetInnerHTML={{__html:task.note ? StringUtil.parsedNote(task.note): "Click to add note..."}} />
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
};
export default Notes;
