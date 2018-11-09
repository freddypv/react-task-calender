import React from "react";
import dateFns from "date-fns";
import {DropTarget} from 'react-dnd';


const Types = {
  ITEM: 'toy'
}
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const componentTarget = {
  /**
* Function Name: drop
* Description: Handles the case when the draggable item gets dropped to the drop target.
* Input: 1.) Props passed from parent component 2.) Monitor object of react dnd
* Output: 2.) Dropped item
*/
  drop(props, monitor, component) {
    let droppedComponent = monitor.getItem();
    let params = {...droppedComponent};
    params['date']= component.props.displayDate;
   // droppedComponent['date']=component.props.displayDate;
    component.props.addItems(params, component.props.displayDate);

    return droppedComponent;
  }
}

class CalendarCell extends React.Component {


  render() {
    const {
      day,
      monthStart,
      selectedDate,
      cloneDay,
      formattedDate,
      connectDropTarget,
      assignedTaks
    } = this.props
    console.log('ssssssssssssssssssss',assignedTaks);
    return connectDropTarget(
      <div
        className={`col cell ${ !dateFns.isSameMonth(day, monthStart)
        ? "disabled"
        : dateFns.isSameDay(day, selectedDate)
          ? "selected"
          : ""}`}
        key={day}
        onClick={() => this.props.onDateClick(dateFns.parse(cloneDay))}>
        <p>{assignedTaks.value}</p>
        <span className="number">{formattedDate}</span>
        <span className="bg">{formattedDate}</span>
      </div>
    );
  }

}

export default DropTarget(Types.ITEM, componentTarget, collect)(CalendarCell);