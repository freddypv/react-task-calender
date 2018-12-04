import React from "react";
import TaskLists from "../containers/TaskLists/TaskLists";
import { DropTarget } from "react-dnd";
import { addTaskList, removeTaskForAllDates } from "../actions/taskList";
import { connect } from "react-redux";
import { compose } from "redux";
const Types = {
  ITEM: "toy"
};
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

const componentTarget = {
  drop(props, monitor, component) {
    let droppedComponent = monitor.getItem();
    console.log(component);
    component.store.dispatch(addTaskList(droppedComponent.index));
    component.store.dispatch(removeTaskForAllDates(droppedComponent.index));
    return droppedComponent;
  }
};

class SideBar extends React.Component {
  triggerActions(index) {
    this.props.dispatch(addTaskList(index));
  }

  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div className="side-bar">
        Unscheduled Tasks
        <TaskLists />
      </div>
    );
  }
}

export default compose(
  DropTarget(Types.ITEM, componentTarget, collect),
  connect()
)(SideBar);
