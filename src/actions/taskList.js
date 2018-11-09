import {TASK_LIST} from '../Constants';


export function getTaskList() {
    return (dispatch) => {
        dispatch({type: 'ASSIGNMENT_LIST_TABLE_UPDATE', payload: TASK_LIST});
    };
}

export function popTaskList(index) {
    return (dispatch) => {
        dispatch({type: 'REMOVE_TASK_LIST_ITEM', payload: index});
    };
}

export function assignTasks(tasks, date) {
  
    return (dispatch, getState) => {       
        dispatch({
            type: 'ASSIGN_TASKS_TO_DATE', 
            payload: tasks,
            date: date,
        });
    };
}