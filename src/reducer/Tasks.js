import clone from 'lodash/clone';
import assign from 'lodash/clone';
const Tasks = (state = {
  tasks: [],
  assignedTasks: []
}, action) => {
  switch (action.type) {
    case 'ASSIGNMENT_LIST_TABLE_UPDATE':
      return {
        ...state,
        tasks: action.payload
      };
    case 'ASSIGN_TASKS_TO_DATE':
      return {
        ...state,
        assignedTasks: [
          ...state.assignedTasks,
          action.payload
        ]
      };
    case 'REMOVE_TASK_LIST_ITEM':
      return {
        ...state,
        tasks: [
          ...state
            .tasks
            .filter(value => value.key != action.payload)
        ]
      };
    default:
      return state;
  }
};
export default Tasks;