import axios from 'axios';

import {
  ADD_QUESTION,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_QUESTIONS,
  GET_QUESTION,
  QUESTION_LOADING,
  DELETE_QUESTION
} from './types';

// Add Question
export const addQuestion = questionData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/questions', questionData)
    .then(res =>
      dispatch({
        type: ADD_QUESTION,
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

// Get Questions
export const getQuestions = () => dispatch => {
  dispatch(setQuestionLoading());
  axios
    .get('/api/questions')
    .then(res =>
      dispatch({
        type: GET_QUESTIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_QUESTIONS,
        payload: null
      })
    );
};

// Get Question
export const getQuestion = id => dispatch => {
  dispatch(setQuestionLoading());
  axios
    .get(`/api/questions/${id}`)
    .then(res =>
      dispatch({
        type: GET_QUESTION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_QUESTION,
        payload: null
      })
    );
};

// Delete Question
export const deleteQuestion = id => dispatch => {
  axios
    .delete(`/api/questions/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_QUESTION,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Answer
export const addAnswer = (questionId, answerData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/questions/answer/${questionId}`, answerData)
    .then(res =>
      dispatch({
        type: GET_QUESTION,
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

// Delete Answer
export const deleteAnswer = (questionId, answerId) => dispatch => {
  axios
    .delete(`/api/questions/answer/${questionId}/${answerId}`)
    .then(res =>
      dispatch({
        type: GET_QUESTION,
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

// Set loading state
export const setQuestionLoading = () => {
  return {
    type: QUESTION_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
