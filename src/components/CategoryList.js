/**
 * Created by emrahsoytekin on 14.06.2018.
 */
import React from 'react';
import CategoryStore from '../stores/CategoryStore';
import AuthenticationStore from '../stores/AuthenticationStore'
import {TaskActions, CategoryActions, SubtaskActions} from '../actions';
import TaskList from './TaskList';
import CategoryHeader from './CategoryHeader';

import {RingLoader} from 'react-spinners';
import WOW from 'wow.js';
import {ToastContainer} from 'react-toastify';
import CategoryPanel from './CategoryPanel';




class CategoryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = CategoryStore.getState();
    }

    componentDidMount() {
        CategoryStore.listen(this.onChange.bind(this));
        this._ismounted=true;
        CategoryStore.fetchCategories();
        const wow = new WOW();
        wow.init();
    }

    componentWillUnmount() {
        CategoryStore.unlisten(this.onChange.bind(this));
        this._ismounted=false;
    }


    handleLogout() {
        AuthenticationStore.logout();
    }

    handleAddItem(add) {
        this.setState({
            addItemSelected: add
        })

    }

    handleSaveCategory(category) {
        CategoryStore.add(category).then(r=> {
            console.log(r);
            this.setState({
                selectedTask: null
            });
            TaskActions.fetch(category);
        });
        this.handleAddItem(false);
    }

    handleDeleteCategory() {
        let {category} = this.state;
        let confirm = window.confirm("Do you really want to delete " + category.name);
        if (confirm) {
            CategoryStore.delete(category).then(r=> {
                this.setState({
                    selectedTask: null
                });
                TaskActions.fetch(this.state.category);
            });
        }
    }

    handleEditCategory(newCatDescription) {
        let {category} = this.state;
        category.name = newCatDescription;
        this.setState({category});
        CategoryStore.update(category);
    }


    onChange(state) {
        if (this._ismounted) {
            this.setState(state);
        }
        if (state.loggedOut) {
            this.props.history.push("/login");
            return;
        }
        if (state.errorMessage && !this.state.errorMessage) {
            this.setState( {
                errorMessage: state.errorMessage
            } );
        }


        if (this._ismounted ) {
            // if(state.categories.length > 0 && !this.state.category){
            //     let location = this.props.location.pathname.substr(1);
            //     if (location.length > 0) {
            //         let categoryHash = this.findByHash(location);
            //         if (categoryHash)
            //             this.state.category = categoryHash;
            //     }
            // }

            if(this.state.category){
                this.onCategoryClick(this.state.category);
            }

        }


    }

    findByHash(location){
        return this.state.categories.find(x => x.name === location);
    }

    onCategoryClick(category) {
        if (this.state.category !== category) {

            this.setState({
                category,
                selectedTask: null
            });
            TaskActions.fetch(category);
            CategoryActions.setCategory(category);
        }

    }

    onTaskSelect(task) {
        let {selectedTask} = this.state;

        if(selectedTask && selectedTask.id === task.id) {
            this.setState({
                selectedTask:null
            })
        } else {

            this.setState({
                selectedTask: task
            });
            SubtaskActions.fetch(task);
        }

    }

    render() {
        if (this.state.errorMessage) {
            let {errorMessage} = this.state;
            console.log(errorMessage);
            return (<div>{errorMessage.message}</div>);
        }


        return (
                <div className="container container-fluid" id="body">
                    <ToastContainer autoClose={2000} className="toast-top-right"/>
                    <div className="sweet-loading">
                        <RingLoader color={'#123abc'}
                                    loading={CategoryStore.isLoading()}
                                    size={80}
                        />
                    </div>
                    <CategoryPanel
                        category={this.state.category}
                        categories={this.state.categories}
                        logout={this.handleLogout.bind(this)}
                        addItem={this.handleAddItem.bind(this)}
                        saveCategory={this.handleSaveCategory.bind(this)}
                        onCategoryClick={this.onCategoryClick.bind(this)}
                        addItemSelected = {this.state.addItemSelected}
                    />

                    {this.state.category && (
                        <div className="container-fluid transition col-md-9" style={{display: "block"}} id="divTasks">
                            <CategoryHeader
                                category={this.state.category}
                                categoryDelete={this.handleDeleteCategory.bind(this)}
                                categoryEdit = {this.handleEditCategory.bind(this)}

                            />
                            <TaskList
                                category={this.state.category}
                                onTaskSelect={this.onTaskSelect.bind(this)}
                                selectedTask={this.state.selectedTask}
                            />
                        </div>

                    )}
                </div>
        )

    };


}

export default CategoryList;
