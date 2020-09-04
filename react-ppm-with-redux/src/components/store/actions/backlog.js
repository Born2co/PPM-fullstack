import axios from 'axios';
import * as actionTypes from './actionTypes';


// getProjectTask 


export const fetchProjectTakStart = () => {
    return {
        type: actionTypes.FETCH_PROJECTTASK_START
    };
}
export const fetchProjectTakSuccess = (projectTaskData) => {
    return {
        type: actionTypes.FETCH_PROJECTTASK_SUCCESS,
        projectTask: projectTaskData
    };
}
export const fetchProjectTakLogsFail= (error) => {
    return {
        type: actionTypes.FETCH_PROJECTTASK_FAIL,
        error: error
        
    };
}

export const getProjectTask = (pId, ptId) => {
    return dispatch => { 
        dispatch(fetchProjectTakStart());
        axios.get(`http://localhost:8080/api/backlog/${pId}/${ptId}`)
            .then(res => {
              
                dispatch(fetchProjectTakSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchProjectTakLogsFail(err.response.data));
            });
    };
};


//fetch All Backlogs 
export const fetchALLBackLogsStart = () => {
    return {
        type: actionTypes.FETCH_ALL_BACKLOGS_START
    };
}
export const fetchALLBackLogsSuccess = (backlogData) => {
    return {
        type: actionTypes.FETCH_ALL_BACKLOGS_SUCCESS,
        backlogs: backlogData
    };
}
export const fetchALLBackLogsFail= (error) => {
    return {
        type: actionTypes.FETCH_ALL_BACKLOGS_FAIL,
        error: error
        
    };
}

export const getBacklog = (pid) => {
    return dispatch => { 
        dispatch(fetchALLBackLogsStart());
        axios.get(`http://localhost:8080/api/backlog/${pid}`)
            .then(res => {
                const fetchedBacklogs = [];
                for (let key in res.data) {
                    fetchedBacklogs.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchALLBackLogsSuccess(fetchedBacklogs));
            })
            .catch(err => {
                dispatch(fetchALLBackLogsFail(err.response.data));
            });
    };
};



//delete PTask\
export const deletePTStart = () => {
    return {
        type: actionTypes.DELETE_PROJECT_TASK_START
    };
}
export const deletePTSuccess = (id) => {
 console.log(`delete this srq ${id}`)
    return {
        type: actionTypes.DELETE_PROJECT_TASK_SUCCESS,
        id: id
    };
}
export const deletePTFail= (error) => {
    console.log(`error: ${error}`);
    return {
        type: actionTypes.DELETE_PROJECT_TASK_FAIL,
        error: error
        
    };
}


export const deleteProjectTask = (pid, pseq) => {
    return dispatch => { 
        dispatch(deletePTStart());
        axios.delete(`http://localhost:8080/api/backlog/${pid}/${pseq}`)
            .then(res => {
                dispatch(deletePTSuccess(pseq));
            })
            .catch(err => {
                dispatch(deletePTFail(err.response.data));
            });
    };
};