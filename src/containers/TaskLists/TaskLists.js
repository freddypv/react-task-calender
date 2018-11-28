import React, {Component} from "react";
import { connect } from 'react-redux';
import Task from "../../components/Task";
import { getTaskList } from '../../actions/taskList';




class TaskList extends Component {

  componentWillMount = () => {
     this.props.dispatch(getTaskList());
  }

    generateHeaders() {
    const taskLists = this.props.taskLists;
    return taskLists.map((data) => {
      return <Task  key={data.key} index={data.key} value={data.name} flag={'schedule'} lastEntry={true} firstEntry={true}/>;
    });
  }


 render() {
    return (    
       <ul>
        {this.generateHeaders()}           
        </ul>
    );
  }


}



export const mapStateToProps = (state) => ({
  taskLists: state.Tasks.tasks
});
export default connect(mapStateToProps)(TaskList);