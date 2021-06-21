import { ToDoListDarkTheme } from "../../Themes/ToDoListDarkTheme"
import { ToDoListLightTheme } from '../../Themes/ToDoListLightTheme'
import { ToDoListPrimaryTheme } from '../../Themes/ToDoListPrimaryTheme'
import { add_task, change_theme, delete_task, done_task, edit_task } from "../actions/types/ToDoListTypes"
import {arrTheme} from '../../Themes/ThemeManager'

const initialState = {
    themeToDoList: ToDoListDarkTheme,
    taskList: [
        {id:'task-1', taskName: 'task 1', done: true},
        {id:'task-2', taskName: 'task 2', done: false},
        {id:'task-3', taskName: 'task 3', done: true},
        {id:'task-4', taskName: 'task 4', done: false}
    ],
    taskEdit: {id:'task-1', taskName: 'task 1', done: false}

}

export default (state = initialState, action) =>{
    switch(action.type){
        case add_task:{
            if (action.newTask.taskName.trim()===''){
                alert("Task name is required")
                return {...state}
            }
            // Kiểm tra tồn tại
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.taskName === action.newTask.taskName);
            if (index !== -1){
                alert("Task name already exists")
                return {...state};
            }
            taskListUpdate.push(action.newTask)
            // Xử lý xong thì gán taskList mới vào taskList
            state.taskList = taskListUpdate;
            return {...state}
        }
        case change_theme: {
            // Tìm theme dựa vào action.themeId được chọn
            let theme = arrTheme.find(theme=>theme.id == action.themeId);
            if (theme){
                // set lại theme cho state.themeToDoList
                state.themeToDoList = {...theme.theme};
            }
            return {...state};
        }
        case done_task:{
            // Click vào button check => dispatch lên action có taskId 
            let taskListUpdate = [...state.taskList];
            // Từ task id tìm ra task đó ở vị trí nào trong mảng tiến hành cập nhật lại thuộc tính done = true và cập nhật lại state của redux 
            let index = taskListUpdate.findIndex(task=>task.id === action.taskId);
            if (index !== -1){
                taskListUpdate[index].done = true;
            }
            // state.taskList = taskListUpdate;
            return {...state,taskList: taskListUpdate} 
        }
        case delete_task:{
            let taskListUpdate = [...state.taskList];
            taskListUpdate = taskListUpdate.filter(task => task.id !== action.taskId);
            return {...state,taskList: taskListUpdate}
        }
        case edit_task:{
            return {...state,taskEdit: action.task}
        }
        default: return {...state}
    }
}