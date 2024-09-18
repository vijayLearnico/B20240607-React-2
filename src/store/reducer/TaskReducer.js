const initialState = {
    tasks: [],
};


function taskReducer(state = initialState, action){

    switch(action.type){
        case 'ADD-NEW-TASK':
            return {tasks : [...action.data]}
        case 'MODIFY-TASK':
            return {tasks: action.data}
        default:
            return state;
    }

}

export {taskReducer , initialState}