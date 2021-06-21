import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import {getApiTaskAction} from '../../redux/actions/TaskAction';

class TaskPresent extends Component {
    render() {
        return (
            <div>
                <hr/>
                <h1 className="text-white">Task to do</h1>
                <div className="row">
                    {}
                </div>
                <hr/>
                <h1 className="text-white">Task completed</h1>
                {}
            </div>
        )
    }
    async componentDidMount(){
        const action = getApiTaskAction();
        this.props.dispatch(action);
    }
}
const mapStateToProps = state => {
    return {
        arrTask: state.TaskReducer.arrTask
    }
}

export default connect(mapStateToProps)(TaskPresent);
