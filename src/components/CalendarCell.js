import React from "react";
import isSameMonth from "date-fns/is_same_month";
import isSameDay from "date-fns/is_same_day";
import { DropTarget } from 'react-dnd';
import forOwn from 'lodash/forOwn';
import filter from 'lodash/filter';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
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

  drop(props, monitor, component) {
    let droppedComponent = monitor.getItem();
    if (droppedComponent.flag === 'schedule') {
      let params = { ...droppedComponent };
      params['date'] = component.props.displayDate;
      component.props.addItems(params, component.props.displayDate);
    }
    return droppedComponent;
  },

  hover(props, monitor, component) {
    let droppedComponent = monitor.getItem();
    if (droppedComponent.flag === 'expand') {
      let params = { ...droppedComponent };
      params['date'] = component.props.displayDate;
      params['expand'] = true;     
      component.props.dragOver(params);
    }
 
    return droppedComponent;
  }
}

class CalendarCell extends React.Component {


  renderTasks() {
    const rows = [];
    let currentDateCell = this.props.displayDate;
    let currentTaskList = orderBy(this.props.assignedTaks, ['order'],['asc']);
    let order = 1;
    let taskSelected = this.props.taskSelected;

    if (currentTaskList.constructor === Array) {
      currentTaskList = filter(
        map(currentTaskList, function (item) {
          if (filter(currentTaskList, { index: item.index }).length > 1) {
            return (!item.lastEntry ? item : '');
          } else {
            return item;
          }
        }),
        function (value) { return value; });
    }
    forOwn(currentTaskList, function (value, key) {
    let uniqueKey = value.value + value.index;
    let firstClass =false;
      while (value.order > order) {
        rows.push(
          <div key={uniqueKey+'_'+order} className="empty_cell">            
          </div>
        )
        order++;
    }
    order++;

      
      if((value.startDate && value.startDate===value.date) || value.firstEntry){
        firstClass=true;
      }
      if (value.firstEntry){
        firstClass=true;
      }
      if (value.lastEntry) {
        rows.push(
          <div key={uniqueKey} className={"dragable_expandable_container" + (firstClass ? ' first_cell' : '')}>
            <SheduledTask key={uniqueKey} index={value.index} flag={'schedule'} lastEntry={true} sheduleddate={currentDateCell} value={value.value} onClick={taskSelected} />
            <ExpandableArea key={uniqueKey + '##'} index={value.index} flag={'expand'} sheduleddate={currentDateCell} value={value.value} />

          </div>

        );
      } else {
        rows.push(
          <div key={uniqueKey} className={"dragable_expandable_container full_length_container" + (firstClass ? ' first_cell' : '')}>
            <SheduledTask key={uniqueKey} index={value.index} flag={'schedule'} lastEntry={true} sheduleddate={currentDateCell} value={value.value} onClick={taskSelected} />
          </div>

        );
      }

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
        className={`col cell ${!isSameMonth(day, monthStart)
          ? "disabled"
          : isSameDay(day, selectedDate)
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