import React from "react";
import dateFns from "date-fns";
import { DropTarget } from 'react-dnd';
import forOwn from 'lodash/forOwn';
import SheduledTask from './SheduledTask';
import ExpandableArea from './ExpandableArea';



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
  },

  hover(props, monitor, component){
    let droppedComponent = monitor.getItem();
    let params = { ...droppedComponent };
    params['date'] = component.props.displayDate;
    params['expand'] = true;
   // console.log('qqqqqqqqqqq',params);
    component.props.dragOver(params);
    return droppedComponent;
  }
}

class CalendarCell extends React.Component {


  renderTasks() {
    const rows = [];
    let currentDateCell = this.props.displayDate;
    forOwn(this.props.assignedTaks, function (value, key) {
      let uniqueKey =value.value+value.index;
      rows.push(
        <div className="dragable_expandable_container">
        <SheduledTask key={uniqueKey} index={value.index} sheduleddate={currentDateCell} value={value.value} />
        <ExpandableArea key={uniqueKey} index={value.index} sheduleddate={currentDateCell} value={value.value} />
       
        </div>

      );
    });
    return rows;
  }

  render() {
    const {
      day,
      monthStart,
      selectedDate,
      formattedDate,
      connectDropTarget
    } = this.props;
    return connectDropTarget(
      <div
        className={`col cell ${!dateFns.isSameMonth(day, monthStart)
          ? "disabled"
          : dateFns.isSameDay(day, selectedDate)
            ? "selected"
            : ""}`}
        key={day}
        // onClick={() => this.props.onDateClick(dateFns.parse(cloneDay))}
        >

        {
          this.renderTasks()
        }
      <div className="number">{formattedDate}</div>
        
        {/* <span className="bg">{formattedDate}</span> */}
      </div>
    );
  }

}

export default DropTarget(Types.ITEM, componentTarget, collect)(CalendarCell);