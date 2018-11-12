import React from "react";
import dateFns from "date-fns";
import { connect } from 'react-redux';
import {assignTasks, popTaskList, removeTasks} from '../actions/taskList';

import CalendarCell from './CalendarCell';

import forOwn from 'lodash/forOwn';



class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  };

  addItems = (data,date) => { 
    if(date !== data.sheduleddate) { 
      console.log('dddddddddddddddaaaaaaa',data.index, data.sheduleddate);
    this.props.dispatch(assignTasks(data,date));
    this.props.dispatch(popTaskList(data.index));
      if(data.sheduleddate){      
        this.props.dispatch(removeTasks(data.sheduleddate,data.index));
        
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
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
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
    let startDate = dateFns.startOfWeek(this.state.currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = "D";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    let displayDate="";
    let assignedTaks="";
    let taskBydate = []
forOwn(this.props.assignedTasks, function(value, key) { 

  if(!taskBydate[value.date]){
    taskBydate[value.date]=[]
  }
  taskBydate[value.date].push(value);
} );


    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        displayDate = dateFns.format(day, 'DDMMMYYYY');
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
          assignedTaks={assignedTaks}
          key={day}
          ></CalendarCell>         
        );
        day = dateFns.addDays(day, 1);
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
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
   console.log('$$$$$$$',this.props.assignedTasks);
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
  assignedTasks: state.Tasks.assignedTasks
});
export default connect(mapStateToProps)(Calendar);