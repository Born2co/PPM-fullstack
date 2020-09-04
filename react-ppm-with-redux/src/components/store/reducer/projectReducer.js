import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    projects: [],
    project: {},
    loading: false,
    errors: {},
    message: null

};

//fetch Project data
const fetchProjectStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchProjectSuccess = ( state, action ) => {
    return updateObject( state, {
        project: action.project,
        loading: false
    } );
};

const fetchProjectFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};


//fetch ALL Project data 
const fetchAllProjectStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
const fetchAllProjectSuccess = ( state, action ) => {
    return updateObject( state, {
        projects: action.projects,
        loading: false
    } );
};
const fetchAllProjectFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = (state = initialState, action)  => {
    switch(action.type) {
        case actionTypes.FETCH_PROJECT_START: return fetchProjectStart( state, action );
        case actionTypes.FETCH_PROJECT_SUCCESS: return fetchProjectSuccess( state, action );
        case actionTypes.FETCH_PROJECT_FAIL: return fetchProjectFail( state, action );

        case actionTypes.FETCH_ALL_PROJECT_START: return fetchAllProjectStart( state, action );
        case actionTypes.FETCH_ALL_PROJECT_SUCCESS: return fetchAllProjectSuccess( state, action );
        case actionTypes.FETCH_ALL_PROJECT_FAIL: return fetchAllProjectFail( state, action );

        case actionTypes.DELETE_PROJECT_START: return deleteProjectStart( state, action );
        case actionTypes.DELETE_PROJECT_SUCCESS: return deleteProjectSuccess( state, action );
        case actionTypes.DELETE_PROJECT_FAIL: return deleteProjectFail( state, action );

        default: return state;
    }
   
}
//delete travels from firebase
const deleteProjectStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};
const deleteProjectSuccess = ( state, action ) => {
    let updatedProject = state.projects.filter(project => project.projectIdentifier !== action.id)
    return updateObject( state, {
        projects: updatedProject,
        loading: false
    } );
};
const deleteProjectFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

export default reducer;
