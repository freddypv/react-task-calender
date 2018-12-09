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
      return <Task  key={data.key} index={data.key} type={data.type} value={data.name} flag={'schedule'} lastEntry={true} firstEntry={true}/>;
    });
  }


 render() {
    return (    
       <div>
        {this.generateHeaders()}           
        </div>
    );
  }


}



export const mapStateToProps = (state) => ({
  taskLists: state.Tasks.tasks
});
export default connect(mapStateToProps)(TaskList);