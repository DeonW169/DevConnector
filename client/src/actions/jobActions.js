import axios from 'axios';

import {
  GET_JOB,
  GET_JOBS,
  JOB_LOADING,
  CLEAR_CURRENT_JOB,
  GET_ERRORS,
  SET_CURRENT_USER
} from './types';

// Get current job
export const getCurrentJob = () => dispatch => {
  dispatch(setJobLoading());
  axios
    .get('/api/job')
    .then(res =>
      dispatch({
        type: GET_JOB,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_JOB,
        payload: {}
      })
    );
};

// Get job by id
export const getJobById = id => dispatch => {
  dispatch(setJobLoading());
  axios
    .get(`/api/job/${id}`)
    .then(res =>
      dispatch({
        type: GET_JOB,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_JOB,
        payload: null
      })
    );
};

// Create Job
export const createJob = (jobData, history) => dispatch => {
  axios
    .post('/api/job', jobData)
    .then(res => history.push('/jobs'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/job/experience', expData)
    .then(res => history.push('/jobs'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post('/api/job/education', eduData)
    .then(res => history.push('/jobs'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/job/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_JOB,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Education
export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/job/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_JOB,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all jobs
export const getJobs = () => dispatch => {
  dispatch(setJobLoading());
  axios
    .get('/api/job/all')
    .then(res =>
      dispatch({
        type: GET_JOBS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_JOBS,
        payload: null
      })
    );
};

// Delete job
export const deleteJob = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/job')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Job loading
export const setJobLoading = () => {
  return {
    type: JOB_LOADING
  };
};

// Clear job
export const clearCurrentJob = () => {
  return {
    type: CLEAR_CURRENT_JOB
  };
};
