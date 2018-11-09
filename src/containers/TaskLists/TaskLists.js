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
      return <Task index={data.key} value={data.name} />;
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