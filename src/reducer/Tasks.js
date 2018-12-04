const Tasks = (state = {
  tasks: [],
  assignedTasks: [],
  schedules: [],
  currentTask: {}
}, action) => {
  switch (action.type) {
    case 'ASSIGNMENT_LIST_TABLE_UPDATE':
      return {
        ...state,
        tasks: action.payload
      };
    case 'ASSIGN_TASKS_TO_DATE':

      let schedule = state.schedules;
      schedule[action.payload.index] = action.date;
      return {
        ...state,
        assignedTasks: [
          ...state.assignedTasks,
          action.payload
        ], schedules: schedule

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
      let schedules = state.schedules;
      if (action.dates[0].sheduleddate.localeCompare(action.dates[0].date) > 0) {
        schedules[action.index] = action.dates[0].date;
      }
      let expandedTasks = [...state.assignedTasks.filter(value => value.index !== action.index), ...[...new Set(action.dates.map((o, index) => {
        o.lastEntry = index + 1 === action.dates.length;
        o.startDate = schedules[action.index];
        return JSON.stringify(o)
      }))].map(s =>
        JSON.parse(s)
        )];

      // .filter((assignedTasks, index, self) =>

      //     index === self.findIndex((t) => (
      //       t.index === assignedTasks.index && t.date === assignedTasks.date && t.lastEntry === assignedTasks.lastEntry
      //     ))
      //   )
      return {
        ...state,
        assignedTasks: expandedTasks,
        schedules: schedules
      };
    case 'SET_CURRENT_TASK':
      let task = action.task;
      return {
        ...state,
        currentTask: {
          title: task
        }

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