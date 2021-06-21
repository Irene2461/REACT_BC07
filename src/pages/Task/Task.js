import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import TaskPresent from './TaskPresent';


export default function Task(props) {
    return (
        <form className="container bg-dark text-white">
            <p className="p-2 border border-white">Dark theme</p>
            <h1 className="text-white">To do list</h1>
            <p>Task name</p>
            <div className="row">
                <div className="col-6">
                    <input name="tenTask" className="form-control" />
                </div>
                <div className="col-6">
                    <button className="mr-1 btn btn-dark border border-white">+ Add task</button>
                    <button className="ml-1 btn btn-white text-dark">Update task</button>
                </div>
            </div>
            <TaskPresent />
        </form>
    )
}
