/**
 * Created by emrahsoytekin on 29.07.2018.
 */
import React,{Component} from 'react';
import {Input, Button, FormGroup,  ButtonGroup} from 'reactstrap';
import {FormControl} from 'react-bootstrap';
import PropTypes from 'prop-types';
class InnerForm extends Component {
    render () {
        let {placeholder, value, type} = this.props;
        return (
            <form className="panel-body " onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                this.props.onSubmit(e);
            }}
            >
                {type === 'text' ?
                    < FormGroup row>
                        <Input type="text" required id="txtTask" autoFocus placeholder={placeholder} autoComplete="off"
                               value={value}
                               onChange={this.props.onChange}
                               onClick={(e) => {
                                   e.stopPropagation()
                               } }
                               onFocus={(e) => {
                                   e.target.select()
                               }}
                        />
                    </FormGroup>
                    :
                    <FormGroup>
                        <FormControl
                            componentClass="textarea"
                            placeholder={placeholder}
                            required
                            id="txtNote"
                            value={value}
                            onFocus={(e) => {
                                e.target.select()
                            }}
                            autoFocus
                            onChange={this.props.onChange}
                        />
                    </FormGroup>
                }
                <ButtonGroup>
                    <Button type="submit" color="primary">Edit</Button>
                    <Button type="reset" color="primary" onClick={(e)=> {
                        e.stopPropagation();
                        this.props.reset()
                    }}>Cancel</Button>

                </ButtonGroup>
            </form>
        )
    }
}
/**
 *
 * @type {{placeholder: shim, value: (*), reset: (*), onChange: (*), onSubmit: (*), type: *}}
 */
InnerForm.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    reset: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    type: PropTypes.oneOf([ "text","textArea" ])
};
InnerForm.defaultProps = {
    placeholder : 'enter value...',
    type: 'text'
};
export default InnerForm;
