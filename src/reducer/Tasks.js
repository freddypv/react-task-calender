const Tasks = (state = {
  tasks: [],
  assignedTasks: [],
  schedules:[]
}, action) => {
  switch (action.type) {
    case 'ASSIGNMENT_LIST_TABLE_UPDATE':
      return {
        ...state,
        tasks: action.payload
      };
    case 'ASSIGN_TASKS_TO_DATE':
      
      let schedule= state.schedules;
      schedule[action.payload.index]= action.date;
      return {
        ...state,
        assignedTasks: [
          ...state.assignedTasks,
          action.payload
        ],schedules:schedule

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
      let expandedTasks = [ ...state.assignedTasks.filter(value=>value.index != action.index), ...[...new Set(action.dates.map((o, index) =>  {
          o.lastEntry = index+1 === action.dates.length;
          return JSON.stringify(o)
        }))].map(s => 
          JSON.parse(s)
        )]
      return {
        ...state,
        assignedTasks: expandedTasks
      };
    case 'ADD_TASK_LIST_ITEM':
      return {
        ...state, tasks: [...state.tasks,...action.payload]
      }

    case 'REMOVE_TASKS_FOR_DATES':
      return {
        ...state, assignedTasks: [...state.assignedTasks.filter(value=>value.index !== action.index)]
      }

    default:
      return state;
  }
};
export default Tasks;