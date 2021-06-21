import React from 'react'

export default function TodolistRFC() {
    return (
        <div>
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
                <hr/>
                <h1 className="text-white">Task to do</h1>
                <ul>
                    <li>Đi ngủ</li>
                </ul>
                <hr/>
                <h1 className="text-white">Task completed</h1>
                <ul>
                    <li>Đi chơi</li>
                </ul>
            </form>
        </div>
    )
}
