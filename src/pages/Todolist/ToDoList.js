import React, { Component } from 'react'
import {Container} from '../../ComponentsToDoList/Container'
import {ThemeProvider} from 'styled-components'
import {ToDoListDarkTheme} from '../../Themes/ToDoListDarkTheme'
import {ToDoListLightTheme} from '../../Themes/ToDoListLightTheme'
import {ToDoListPrimaryTheme} from '../../Themes/ToDoListPrimaryTheme'
import {Dropdown} from '../../ComponentsToDoList/Dropdown'
import {Heading1,Heading2,Heading3,Heading4,Heading5} from '../../ComponentsToDoList/Heading'
import {TextField,Label,Input} from '../../ComponentsToDoList/TextField'
import {Button} from '../../ComponentsToDoList/Button'
import {Table,Tr,Td,Th,Thead,Tbody} from '../../ComponentsToDoList/Table'
import {connect} from 'react-redux'
import ToDoListReducer from '../../redux/reducers/ToDoListReducer'
import { add_task } from '../../redux/actions/types/ToDoListTypes'
import {addTaskAction, changeThemeAction, deleteTaskAction, doneTaskAction, editTaskAction} from '../../redux/actions/ToDoListActions'
import {arrTheme} from '../../Themes/ThemeManager'
import axios from 'axios'
import { Formik } from "formik";
// import * as Yup from "yup";


class ToDoList extends Component {

    // state = {
    //     taskName: ''
    // }
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
            // Nếu gọi api về thành công => set lại state của component
            this.setState({
                taskList: result.data
            })
        });
        promise.catch((error)=>{
            console.log("error",error.response.data);
        });
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

    renderTaskToDo = () =>{
        // return this.props.taskList.filter(task=>!task.done).map((task,index)=>{
        //     return <Tr key={index}>
        //     <Th style={{verticalAlign: 'middle'}}>{task.taskName}</Th>
        //     <Th className="text-right">
        //         <Button><i className="fa fa-edit"></i></Button>
        //         <Button onClick={()=>{
        //             this.props.dispatch(doneTaskAction(task.id));
        //         }}><i className="fa fa-check"></i></Button>
        //         <Button onClick={()=>{
        //             this.props.dispatch(deleteTaskAction(task.id));
        //         }}><i className="fa fa-trash"></i></Button>
        //     </Th>
        // </Tr>
        // })
        return this.state.taskList.filter(task=>!task.status).map((task,index)=>{
            return <Tr key={index}>
            <Th style={{verticalAlign: 'middle'}}>{task.taskName}</Th>
            <Th className="text-right">
                <Button onClick={()=>{
                    this.props.dispatch(editTaskAction(task));
                }}><i className="fa fa-edit"></i></Button>
                <Button onClick={()=>{
                    this.checkTask(task.taskName);
                }}><i className="fa fa-check"></i></Button>
                <Button onClick={()=>{
                    this.delTask(task.taskName);
                }}><i className="fa fa-trash"></i></Button>
            </Th>
        </Tr>
        })
    }

    renderTaskCompleted = () =>{
        // return this.props.taskList.filter(task=>task.done).map((task,index)=>{
        //     return <Tr key={index}>
        //     <Th style={{verticalAlign: 'middle'}}>{task.taskName}</Th>
        //     <Th className="text-right">
        //         <Button onClick={()=>{
        //             this.props.dispatch(deleteTaskAction(task.id));
        //         }}><i className="fa fa-trash"></i></Button>
        //     </Th>
        // </Tr>
        // })
        return this.state.taskList.filter(task=>task.status).map((task,index)=>{
            return <Tr key={index}>
            <Th style={{verticalAlign: 'middle'}}>{task.taskName}</Th>
            <Th className="text-right">
                <Button type="button" onClick={()=>{
                    this.rejectTask(task.taskName);
                }}><i className="fa fa-undo"></i></Button>
                <Button type="button" onClick={()=>{
                    this.delTask(task.taskName);
                }}><i className="fa fa-trash"></i></Button>
            </Th>
        </Tr>
        })
    }

    renderTheme = () =>{
        return arrTheme.map((theme,index)=>{
            return <option value={theme.id}>{theme.name}</option>
        })
    }

    componentWillReceiveProps(newProps){
        this.setState({
            taskName: newProps.taskEdit.taskName
        })
    }

    // Lifecycle tĩnh không truy xuất được trỏ this
    // static getDerivedStateFromProps(newProps,currentState){
    //     // newProps: là props mới, props cũ là this.props (không truy xuất đươc)
    //     // currentState: ứng với state hiện tại this.state
    //     // hoặc trả về state mới (this.state)
    //     let newState = {...currentState,taskName: newProps.taskEdit.taskName}
    //     return newState;
    //     // trả về null state giữ nguyên
    //     return null;
    // }
    

    render() {
        return (
            <ThemeProvider theme={this.props.themeToDoList}>
                <Container className="w-50">
                    <Dropdown onChange={(e)=>{
                        let {value} = e.target;
                        // Dispatch value lên reducer 
                        this.props.dispatch(changeThemeAction(value))
                    }}>
                        {this.renderTheme()}
                    </Dropdown>
                    <Heading3>To do list</Heading3>
                    {/* <TextField name="taskName" onChange={(e)=>{
                        this.setState({
                            taskName: e.target.value
                        },()=>{
                            console.log(this.state);
                        })
                    }} label="Task name" className="w-50"/> */}
                    <TextField value={this.state.taskName} name="taskName" onChange={this.handleChange} label="Task name" className="w-50"/>
                    {/* <Button onClick={()=>{
                        // Lấy thông tin người dùng nhập vào từ input
                        let {taskName} = this.state;
                        // Tạo ra 1 task object
                        let newTask ={
                            id: Date.now(),
                            taskName: taskName,
                            done: false
                        }
                        // console.log(newTask);
                        // Đưa task object lên redux thông qua phương thức dispatch
                        this.props.dispatch(addTaskAction(newTask));

                    }} className="ml-2"><i className="fa fa-plus"></i> Add task</Button> */}
                     <Button onClick={this.addTask} className="ml-2"><i className="fa fa-plus"></i> Add task</Button>
                    <Button className="ml-2"><i className="fa fa-upload"></i> Update task</Button>
                    <p className="text text-danger">{this.state.errors.taskName}</p>
                    <hr />
                    <Heading3>Task to do</Heading3>
                    <Table>
                        <Thead>
                            {this.renderTaskToDo()}
                        </Thead>
                    </Table>
                    <Heading3>Task completed</Heading3>
                    <Table>
                        <Thead>
                            {this.renderTaskCompleted()}
                        </Thead>
                    </Table>
                </Container>
            </ThemeProvider>
        )
    }

    componentDidMount(){
        this.getTaskList();
    }

    // đây là lifecycle trả về props cũ và state cũ của component trước khi render (life cycle này chạy sau render)
    // componentDidUpdate(prevProps,prevState){
    //     if (prevProps.taskEdit.id !== this.props.taskEdit.id){
    //         this.setState({
    //             taskName: this.props.taskEdit.taskName
    //         })
    //     }
    // }

}


const mapStateToProps = state =>{
    return{
        themeToDoList: state.ToDoListReducer.themeToDoList,
        taskList: state.ToDoListReducer.taskList,
        taskEdit: state.ToDoListReducer.taskEdit
    }
}

export default connect(mapStateToProps)(ToDoList)