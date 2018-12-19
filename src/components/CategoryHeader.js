/**
 * Created by emrahsoytekin on 17.06.2018.
 */
import React, {Component} from 'react';
import CategoryStore from "../stores/CategoryStore";
import InnerForm from './InnerForm2';


class CategoryHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...CategoryStore.getState(),
            newCatDescription: props.category.name,
            categoryEdit: false

        }
    }

    componentDidMount(){
    }
    componentDidUpdate(){
        let {newCatDescription, categoryEdit} = this.state;
        let {category} = this.props;

        if (newCatDescription !== category.name && !categoryEdit) {
            this.setState({
                newCatDescription : category.name
            })
        }
    }


    render() {

        const FrmCategoryEdit = () => (
            <InnerForm
                onSubmit={ () => {
                    this.setState({
                        categoryEdit:false
                    });
                    this.props.categoryEdit(this.state.newCatDescription);
                } }
                onChange = {(e) => {
                    this.setState({
                        newCatDescription: e.target.value
                    })

                }}
                value = {this.state.newCatDescription}
                placeholder={"Edit Category : " + this.props.category.name}
                reset={()=> {
                    this.setState({
                        categoryEdit: false,
                        newCatDescription: ""
                    })
                }}
            />
        );


        return (
            <div>
            {this.state.categoryEdit ?
                <FrmCategoryEdit/>

                : (
            <div className="navbar navbar-default">
                <div className="navbar-header" id="navCategory" style={{width: "100%"}}>
                        <table className="table" style={{marginBottom: "0px"}}>
                            <tbody>
                            <tr>
                                <td>
                                    <a className="navbar-brand" data-bind="" id="lnkSelectedCategory">
                                        <small
                                            data-bind="text: selectedCategoryName()">{this.props.category.name}</small>
                                    </a>

                                </td>
                                <td style={{verticalAlign: "middle", width: "1%"}}>
                            <span className="input-group-btn">
                                <button className="disabled glyphicon btn btn-primary"
                                        data-bind="text: $root.selectedCategory() ? ($root.selectedCategory().repeater() ? $root.selectedCategory().repeater() : 'Repeat') : 'Repeat'">{"Repeat"}</button>
                                <button className="glyphicon btn btn-primary dropdown-toggle" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                    <span className="caret"/>
                                    <span className="sr-only">Toggle Dropdown</span>
                                </button>
                                <ul className="dropdown-menu" data-bind="foreach: repeaters">
                                    {/*{self.repeaters.map(r => {*/}
                                    {/*return (*/}
                                    {/*<li key={r}><a*/}
                                    {/*data-bind="text:$data,click: $root.setRepeat">{r}</a></li>*/}
                                    {/*)*/}
                                    {/*})}*/}
                                </ul>
                                <button id="btnEditCategory"
                                        data-bind="visible:$root.selectedCategoryName() != 'Inbox',click: editCategory"
                                        className="btn btn-primary glyphicon glyphicon-edit btnCategory"
                                        onClick={e => {
                                            this.setState({
                                                categoryEdit: true
                                            })
                                        }}
                                />
                                <button id="btnDeleteCategory"
                                        data-bind="visible:$root.selectedCategoryName() != 'Inbox',click: deleteCategory"
                                        className="btn btn-primary glyphicon glyphicon-trash btnCategory"
                                        onClick={this.props.categoryDelete}
                                />
                            </span>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                </div>
            </div>
                )}
            </div>
        )

    }

}

export default CategoryHeader;
