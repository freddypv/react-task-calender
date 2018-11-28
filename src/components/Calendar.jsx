import React from "react";
import format from "date-fns/format";
import startOfWeek from "date-fns/start_of_week";
import addDays from "date-fns/add_days";
import startOfMonth from "date-fns/start_of_month";
import endOfMonth from "date-fns/end_of_month";
import endOfWeek from "date-fns/end_of_week";
import addMonths from "date-fns/add_months";
import subMonths from "date-fns/sub_months";
import { connect } from 'react-redux';
import {assignTasks, popTaskList,
   removeTasks, expandTask, setFirstDate} from '../actions/taskList';

import CalendarCell from './CalendarCell';

import forOwn from 'lodash/forOwn';
import debounce from 'lodash/debounce';



class Calendar extends React.Component {

  constructor(props) {
    super(props);
   
    this.addItems = debounce(this.addItems, 500);
    this.dragoverDate={}
  }
  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  };

  

  addItems = (data,date) => { 
    console.log(data,date,"jjjjjjjjjjjjj");
    if(date !== data.sheduleddate && !data.expand) { 
    this.props.dispatch(assignTasks(data,date));
    this.props.dispatch(popTaskList(data.index));
      if(data.sheduleddate){      
        this.props.dispatch(removeTasks(data.sheduleddate,data.index));
      }
    }
  }

  dragOver = (data) => { 
  
    if(this.dragoverDate[data.index]===data.date){
      return;
    }  

    this.dragoverDate[data.index]=data.date
    if(data.date !== data.sheduleddate) { 
      data.sheduleddate= this.props.schedules[data.index] ? this.props.schedules[data.index] :data.sheduleddate;
      if(data.sheduleddate){
        this.props.dispatch(expandTask(data,data.index));
      }
    }
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];
    let startDate = startOfWeek(this.state.currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "D";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    let displayDate="";
    let assignedTaks="";
    let taskBydate = []
forOwn(this.props.assignedTasks, function(value, key) { 
  if(value) { 
  if(!taskBydate[value.date]){
    taskBydate[value.date]=[]
  }
  taskBydate[value.date].push(value);
}
} );


    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        displayDate = format(day, 'DDMMMYYYY');
        assignedTaks= taskBydate[displayDate] ? taskBydate[displayDate] : {};
        const cloneDay = day;
        days.push(
          <CalendarCell 
          day={day}
          monthStart={monthStart}
          selectedDate={selectedDate}
          cloneDay={cloneDay}
          displayDate={displayDate}
          formattedDate={formattedDate}
          onDateClick={this.onDateClick}
          addItems = {this.addItems}
          dragOver = {this.dragOver}
          assignedTaks={assignedTaks}
          key={day}
          ></CalendarCell>         
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}



export const mapStateToProps = (state) => ({
  assignedTasks: state.Tasks.assignedTasks,
  schedules: state.Tasks.schedules,
  
});
export default connect(mapStateToProps)(Calendar);