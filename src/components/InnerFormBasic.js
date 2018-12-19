/**
 * Created by emrahsoytekin on 29.07.2018.
 */
import React from 'react';

export default class InnerFormBasic extends React.Component {
    /**
     * this.props.onSubmit : function
     * this.props.placeholder : string
     * this.props.show : function
     *
     */
    render(){
        let newCatDescriptions = "";
        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    this.props.onSubmit(newCatDescriptions)
                }}>
                <div className="form-group">
                    <input type="TEXT" className="form-control" id="txtNewTask" required
                           autoFocus
                           autoComplete="off"
                           onChange={(e) => {
                               newCatDescriptions = e.target.value;
                           }}
                           placeholder={this.props.placeholder}/>
                </div>
                <div style={{marginTop: "10px"}} className="form-group ">

                    <div className="input-group-btn text-right">
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button type="reset" onClick={(e) => this.props.show(false)}
                                className="btn btn-primary">Cancel
                        </button>
                    </div>

                </div>

            </form>
        )
    }

}
