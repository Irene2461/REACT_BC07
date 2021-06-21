const stateDefault = {
    arrTask: [{taskName: 'alo', status: false}],
}

export const TaskReducer = (state = stateDefault, action) => {
    switch(action.type){
        case 'SET_TASK':{
            state.arrTask = action.arrTask;
            return {...state}
        }
        default: return state;
    }
}