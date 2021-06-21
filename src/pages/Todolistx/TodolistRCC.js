import React, { Component } from 'react'
import axios from 'axios'

export default class TodolistRCC extends Component {
    state = {
        taskList: [],
        values:{
            taskName: ''
        },
        errors:{
            taskName: ''
        }
    }

    getTaskList = () => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/GetAllTask`,
            method: 'GET'
        });
        promise.then((result)=>{
            console.log("result",result.data);
            // Nếu gọi api về thành công => set lại state của componentcomponent
            this.setState({
                taskList: result.data
            })
        });
        promise.catch((error)=>{
            console.log("error",error.response.data);
        });
    }

    renderTaskToDo = () =>{
        return this.state.taskList.filter(item=>!item.status).map((item,index)=>{
            return <li key={index}>
                <div className="row">
                    <div className="col-10">
                        <span>{item.taskName}</span>
                    </div>  
                    <div className="col-2">
                        <button className="btn btn-danger" type="button" onClick={()=>{
                            this.delTask(item.taskName)
                        }}>
                            <i className="fa fa-trash-alt"></i>
                        </button>
                        <button type="button" className="btn btn-success" onClick={()=>{
                            this.checkTask(item.taskName)
                        }}>
                            <i className="fas fa-check-circle"></i>
                        </button>
                    </div>
                </div>
            </li>
        })
    }
    
    renderTaskToDoDone = () => {
        return this.state.taskList.filter(item=>item.status).map((item,index)=>{
            return <li key={index}>
                <div className="row">
                    <div className="col-10">
                        <span>{item.taskName}</span>
                    </div>  
                    <div className="col-2">
                        <button className="btn btn-danger" type="button" onClick={()=>{
                            this.delTask(item.taskName)
                        }}>
                            <i className="fa fa-trash-alt"></i>
                        </button>
                        {/* <button className="btn btn-success" disabled="true" type="button">
                            <i className="far fa-check-circle"></i>
                        </button> */}
                        <button className="btn btn-primary" type="button" onClick={()=>{
                            this.rejectTask(item.taskName);
                        }}>
                            <i className="fas fa-undo"></i>
                        </button>
                    </div>
                </div>
            </li>
        })
    }
    // Sẽ tự động thực thi sau khi nội dung component được render
    componentDidMount(){
        this.getTaskList();
    }

    handleChange = (e) =>{
        let {value,name} = e.target;
        console.log(value,name);
        let newValues = {...this.state.values};
        let newErrors = {...this.state.errors};
        let regexString = /^[a-z A-Z]+$/;
        newValues = {...newValues,[name]:value};
        if (!regexString.test(value) || value.trim()===''){
            newErrors[name] = name + ' invalid';
        }else{
            newErrors[name] = '';
        }
        this.setState({
            ...this.state,
            values: newValues,
            errors: newErrors
        })
    }

    addTask = (e) =>{
        e.preventDefault(); // Dừng sự kiện submit lại form
        // console.log("In ra: ",this.state.values.taskName)
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/AddTask`,
            method: 'POST',
            data: {taskName:this.state.values.taskName}
        })
        promise.then(result =>{
            console.log(result.data);
            this.getTaskList();
        })
        promise.catch(errors =>{
            alert(errors.response?.data);
        })
    }

    delTask = (taskName) =>{
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })
        promise.then(result=>{
            console.log(result.data);
            this.getTaskList();
        })
        promise.catch(errors=>{
            alert(errors.response?.data);
        })
    }

    checkTask = (taskName) =>{
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        })
        promise.then(result=>{
            console.log(result.data);
            this.getTaskList();
        })
        promise.catch(errors=>{
            alert(errors.response?.data);
        })
    }

    rejectTask = (taskName) =>{
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method:'PUT'
        })
        promise.then(result=>{
            console.log(result.data);
            this.getTaskList();
        })
        promise.catch(errors=>{
            alert(errors.response?.data);
        })
    }

    render() {
        return (
            <div>
                {/* <button onClick={()=>{
                    this.getTaskList()
                }} className="btn btn-success">Get Task List</button> */}
                <form onSubmit={this.addTask} className="container bg-dark text-white">
                    <p className="p-2 border border-white">Dark theme</p>
                    <h1 className="text-white">To do list</h1>
                    <p>Task name</p>
                    <div className="row">
                        <div className="col-6">
                            <input name="taskName" onChange={this.handleChange} id="newTask" type="text" className="form-control" />
                            <p className="text text-danger">{this.state.errors.taskName}</p>
                        </div>
                        <div className="col-6">
                            <button onClick={this.addTask} className="mr-1 btn btn-dark border border-white">+ Add task</button>
                            <button className="ml-1 btn btn-white text-dark">Update task</button>
                        </div>
                    </div>
                    <hr/>
                    <h1 className="text-white">Task to do</h1>
                    <ul>
                        {this.renderTaskToDo()}
                    </ul>
                    <hr/>
                    <h1 className="text-white">Task completed</h1>
                    <ul>
                        {this.renderTaskToDoDone()}
                    </ul>
                </form>
            </div>
        )
    }
}
