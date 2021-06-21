import axios from 'axios';

export const getApiTaskAction = () => {
    return async (dispatch) => {
        try{
            let result = await axios({
                url: `https://svcy.myclass.vn/api/ToDoList/GetAllTask`,
                method: 'GET'
            });
            const action = {
                type: 'SET_TASK',
                dataTasks: result.data
            }
            dispatch(action);
        }catch(error){
            console.log("error",error.response?.data);
        }
    }
}