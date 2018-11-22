import {TASK_LIST} from '../Constants';
import compareAsc from "date-fns/compare_asc";
import eachDay from "date-fns/each_day";
import format from "date-fns/format";

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

function generateDates(date){
    let dates=[];
    let fatelist;
    if(compareAsc(date.sheduleddate,date.date )> 0){
         fatelist = eachDay(date.date,date.sheduleddate);
    }else{ 
     fatelist = eachDay(date.sheduleddate,date.date);
    }
    fatelist.forEach(function(value, key){
        date['date']=format(value, 'DDMMMYYYY');
        dates.push({...date})
    })
    return dates;
   // console.log(dates)
}

export function expandTask( date) {
    let dates= generateDates(date)
    return (dispatch, getState) => {       
        dispatch({
            type: 'EXPAND_TASK', 
            dates
        });
    };
}

export function removeTasks(date,taskId) {
    return (dispatch, getState) => {       
        dispatch({
            type: 'REMOVE_TASKS_TO_DATE', 
            taskId,
            date
        });
    };
}