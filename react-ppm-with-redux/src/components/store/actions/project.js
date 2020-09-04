import * as actionTypes from './actionTypes';
import axios from 'axios';

//Get project by ID 
export const fetchProjectStart = () => {
    return {
        type: actionTypes.FETCH_PROJECT_START
    };
}
export const fetchProjectSuccess = (projectData) => {
    return {
        type: actionTypes.FETCH_PROJECT_SUCCESS,
        project: projectData
    };
}
export const fetchProjectFail= (error) => {
    return {
        type: actionTypes.FETCH_PROJECT_FAIL,
        error: error
    };
}

export const getProjectData = (id) => {
    return dispatch => {
        dispatch(fetchProjectStart());
        axios.get(`http://localhost:8080/api/project/${id}`)
            .then(response => {
                // console.log(`response.data for ${id} : ${response.data}`)
                dispatch(fetchProjectSuccess(response.data));
            })
            .catch(err => {
                dispatch(fetchProjectFail(err.response.data));
            });
    };
};


//fetch All Projects
export const fetchAllProjectStart = () => {
    return {
        type: actionTypes.FETCH_ALL_PROJECT_START
    };
}

export const fetchAllProjectSuccess = (projectsData) => {
    //  console.log(`projectData:: ${projectsData}`);
    return {
        type: actionTypes.FETCH_ALL_PROJECT_SUCCESS,
        projects: projectsData
    };
}
export const fetchAllProjectFail= (error) => {
    // console.log(`error: ${error}`);
    return {
        type: actionTypes.FETCH_ALL_PROJECT_FAIL,
        error: error
        
    };
}


export const getAllProjectData = () => {
    return dispatch => { 
        dispatch(fetchAllProjectStart());
        axios.get(`http://localhost:8080/api/project/all`)
            .then(res => {
                // console.log(`res:: ${res}`);
                const fetchedProjects = [];
                for (let key in res.data) {
                    fetchedProjects.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchAllProjectSuccess(fetchedProjects));
            })
            .catch(err => {
                dispatch(fetchAllProjectFail(err.response.data));
            });
    };
};

// Delete project
export const deleteProjectStart = () => {
    return {
        type: actionTypes.DELETE_PROJECT_START
    };
}
export const deleteProjectSuccess = (id) => {
     console.log(`Delete projectData with id:: ${id}`);
    return {
        type: actionTypes.DELETE_PROJECT_SUCCESS,
        id: id
    };
}
export const deleteProjectFail= (error) => {
    console.log(`error: ${error}`);
    return {
        type: actionTypes.DELETE_PROJECT_FAIL,
        error: error
        
    };
}


export const deleteProjectData = (id) => {
    return dispatch => { 
        dispatch(deleteProjectStart());
        axios.delete(`http://localhost:8080/api/project/${id}`)
            .then(res => {
                dispatch(deleteProjectSuccess(id));
            })
            .catch(err => {
                dispatch(deleteProjectFail(err.response.data));
            });
    };
};