import {
  GET_JOB,
  GET_JOBS,
  JOB_LOADING,
  CLEAR_CURRENT_JOB
} from '../actions/types';

const initialState = {
  job: null,
  jobs: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case JOB_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_JOB:
      return {
        ...state,
        job: action.payload,
        loading: false
      };
    case GET_JOBS:
      return {
        ...state,
        jobs: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_JOB:
      return {
        ...state,
        job: null
      };
    default:
      return state;
  }
}
