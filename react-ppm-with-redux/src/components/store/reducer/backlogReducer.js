import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    backlogs: [],
    backlog: {},
    loading: false,
    errors: {},
    message: null,
    projectTask: {}

};

//fetch ALL Project data 
const fetchALLBackLogsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
const fetchALLBackLogsSuccess = ( state, action ) => {
    return updateObject( state, {
        backlogs: action.backlogs,
        loading: false
    } );
};
const fetchALLBackLogsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

//fetchPT
const fetchProjectTakStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
const fetchProjectTakSuccess = ( state, action ) => {
    return updateObject( state, {
        projectTask: action.projectTask,
        loading: false
    } );
};
const fetchProjectTakLogsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = (state = initialState, action)  => {
    switch(action.type) {

        case actionTypes.FETCH_PROJECTTASK_START: return fetchProjectTakStart( state, action );
        case actionTypes.FETCH_PROJECTTASK_SUCCESS: return fetchProjectTakSuccess( state, action );
        case actionTypes.FETCH_PROJECTTASK_FAIL: return fetchProjectTakLogsFail( state, action );

        case actionTypes.FETCH_ALL_BACKLOGS_START: return fetchALLBackLogsStart( state, action );
        case actionTypes.FETCH_ALL_BACKLOGS_SUCCESS: return fetchALLBackLogsSuccess( state, action );
        case actionTypes.FETCH_ALL_BACKLOGS_FAIL: return fetchALLBackLogsFail( state, action );

        case actionTypes.DELETE_PROJECT_TASK_START: return deletePTStart( state, action );
        case actionTypes.DELETE_PROJECT_TASK_SUCCESS: return deletePTSuccess( state, action );
        case actionTypes.DELETE_PROJECT_TASK_FAIL: return deletePTFail( state, action );

        default: return state;
    }
}
//delete PTask 
const deletePTStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
const deletePTSuccess = ( state, action ) => {
    console.log(action.id);
    let updatedProjectTask = state.backlogs.filter(backlog => backlog.projectSequence !== action.id)
    return updateObject( state, {
        backlogs: updatedProjectTask,
        loading: false
    } );
};
const deletePTFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};
   



export default reducer;
