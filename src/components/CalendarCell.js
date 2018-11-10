import React from "react";
import dateFns from "date-fns";
import { DropTarget } from 'react-dnd';
import forOwn from 'lodash/forOwn';
import SheduledTask from './SheduledTask'


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
    let params = { ...droppedComponent };
    params['date'] = component.props.displayDate;
    component.props.addItems(params, component.props.displayDate);
    return droppedComponent;
  }
}

class CalendarCell extends React.Component {


  renderTasks() {
    const rows = [];
    let currentDateCell = this.props.displayDate;
    forOwn(this.props.assignedTaks, function (value, key) {
      rows.push(
        <SheduledTask key={value.value} index={value.index} sheduleddate={currentDateCell} value={value.value} />

      );
    });
    return rows;
  }

  render() {
    const {
      day,
      monthStart,
      selectedDate,
      cloneDay,
      formattedDate,
      connectDropTarget,
      assignedTaks
    } = this.props;
    return connectDropTarget(
      <div
        className={`col cell ${!dateFns.isSameMonth(day, monthStart)
          ? "disabled"
          : dateFns.isSameDay(day, selectedDate)
            ? "selected"
            : ""}`}
        key={day}
        onClick={() => this.props.onDateClick(dateFns.parse(cloneDay))}>

        {
          this.renderTasks()
        }
        <span className="number">{formattedDate}</span>
        <span className="bg">{formattedDate}</span>
      </div>
    );
  }

}

export default DropTarget(Types.ITEM, componentTarget, collect)(CalendarCell);