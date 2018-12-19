/**
 * Created by emrahsoytekin on 31.07.2018.
 */
import React from 'react';
import InnerFormBasic from "./InnerFormBasic";

class CategoryPanel extends React.Component {

    render() {

        const CategoryTemplate = ({forCategory, ...props}) => {
            const curCatName = props.category && props.category.id;
            const catName = forCategory.id;
            let className = catName === curCatName ? "btnCategory btn btn-primary" : "btnCategory btn";
            let taskCount = forCategory.taskCount ? forCategory.taskCount : 0;
            let completedTaskCount = forCategory.completedTaskCount ? forCategory.completedTaskCount : 0;
            let total = taskCount + completedTaskCount;
            return (
                <li data-bind="drop:{value:$root.draggedTask},css: {active: name == $root.selectedCategoryName()}">
                    <a className={className} style={{textAlign: "left"}} data-bind=" attr: {href:'#/'+name}"
                       onClick={() => props.onCategoryClick(forCategory)}>
                    <span className="sortableTitleBar glyphicon glyphicon-align-justify"
                          data-bind="preventBubble: ['click']"/>
                        <span className="catText" data-bind="text: name">{forCategory.name}</span>
                        <span className="badge" data-bind="text:taskCount()==0 ? '' : taskCount">{

                            taskCount + "/" + total
                        }</span>
                    </a>
                </li>
            )
        };

        let {categories} = this.props;

        return (
            <div className="well col-md-3" style={{display: "block"}}>
                <div className="loader" id="categoryLoader"/>
                {categories.length > 0 ?
                    <ul className="nav nav-pills nav-stacked "
                        data-bind="template: { name: 'categoryTemp', foreach: categories}, sortableList:categories">
                        {categories.map(c => {
                            return (
                                <CategoryTemplate key={c.id} forCategory={c} {...this.props}/>
                            )
                        })}
                    </ul>
                    : null}
                <hr/>
                <ul className="nav nav-pills nav-stacked" data-bind="foreach:controllers">
                    <li>
                        {
                            this.props.addItemSelected ? (
                                <InnerFormBasic
                                    onSubmit={this.props.saveCategory}
                                    placeholder="Add New Item"
                                    show={this.props.addItem}
                                />
                            ) : (
                                <a onClick={(e) => {
                                    this.props.addItem(true)
                                }} className="btnCategory btn" style={{textAlign: 'left'}}>
                                    <span data-bind="css: icon" className={"glyphicon glyphicon-plus"}/>
                                    <span data-bind="text:name" className="catText">Add New Item</span>
                                </a>

                            )
                        }
                    </li>
                </ul>
            </div>
        );
    }

}

export default CategoryPanel;
