import React from "react";
import dateFns from "date-fns";
import { DropTarget } from 'react-dnd';


const Types = {
  ITEM: 'toy'
}
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const itemSource = {
  drop(props) {
  console.log('here1',props);
  return props;
  }
 }


class CalendarCell extends React.Component {

render() {
    const { day, monthStart, selectedDate, cloneDay, formattedDate, connectDropTarget } = this.props
    return connectDropTarget(
        <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
              }`}
            key={day}
            onClick={() => this.props.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
    );
  }


}

export default DropTarget(Types.ITEM, itemSource, collect)(CalendarCell);