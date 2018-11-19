import {TASK_LIST} from '../Constants';
import dateFns from "date-fns";

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
    if(dateFns.compareAsc(date.sheduleddate,date.date )> 0){
         fatelist = dateFns.eachDay(date.date,date.sheduleddate);
    }else{ 
     fatelist = dateFns.eachDay(date.sheduleddate,date.date);
    }
    fatelist.forEach(function(value, key){
        date['date']=dateFns.format(value, 'DDMMMYYYY');
        dates.push({...date})
    })
    return dates;
   // console.log(dates)
}

export function expandTask( date) {
  //  console.log('dddd',date)
    let dates= generateDates(date)
  console.log('qqqqqqqaaaaaaa',dates)
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