const initialState = {
    userDetails: null,
};


function userReducer(state = initialState, action){

    switch(action.type){
        case 'ADD-USERDETAILS':
            return {userDetails : action.data}
        case 'DELETE-USERDETAILS':
            return {userDetails: null}
        default:
            return state;
    }

}

export {userReducer , initialState}