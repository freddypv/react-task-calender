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
      case 'REMOVE_TASKS_TO_DATE':
      return {
        ...state,
        assignedTasks: [
          ...state.assignedTasks.filter(value => !(value.date === action.date && value.index === action.taskId))
        ]
      };
    case 'REMOVE_TASK_LIST_ITEM':
      return {
        ...state,
        tasks: [
          ...state
            .tasks
            .filter(value => value.key !== action.payload)
        ]
      };
    case 'EXPAND_TASK':
      return {
        ...state,
        assignedTasks: [...new Set(action.dates.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))
      };
    default:
      return state;
  }
};
export default Tasks;