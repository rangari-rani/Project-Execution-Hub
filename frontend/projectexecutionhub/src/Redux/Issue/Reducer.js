import {
  ASSIGNED_ISSUE_TO_USER_FAILURE,
  ASSIGNED_ISSUE_TO_USER_REQUEST,
  ASSIGNED_ISSUE_TO_USER_SUCCESS,
  CREATE_ISSUES_FAILURE,
  CREATE_ISSUES_REQUEST,
  CREATE_ISSUES_SUCCESS,
  DELETE_ISSUES_FAILURE,
  DELETE_ISSUES_REQUEST,
  DELETE_ISSUES_SUCCESS,
  FETCH_ISSUES_BY_ID_REQUEST,
  FETCH_ISSUES_BY_ID_SUCCESS,
  FETCH_ISSUES_FAILURE,
  FETCH_ISSUES_REQUEST,
  FETCH_ISSUES_SUCCESS,
  UPDATE_ISSUES_STATUS_FAILURE,
  UPDATE_ISSUES_STATUS_REQUEST,
  UPDATE_ISSUES_STATUS_SUCCESS,
} from "./ActionTypes";

const initialState = {
  issues: [],
  loading: false,
  error: null,
  issueDetails: null,
};

const issueReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ISSUES_REQUEST:
    case CREATE_ISSUES_REQUEST:
    case UPDATE_ISSUES_STATUS_REQUEST:
    case DELETE_ISSUES_REQUEST:
    case FETCH_ISSUES_BY_ID_REQUEST:
    case ASSIGNED_ISSUE_TO_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ISSUES_SUCCESS:
      
      return {
        ...state,
        loading: false,
        issues: action.issues,
      };
    case FETCH_ISSUES_BY_ID_SUCCESS:
    case UPDATE_ISSUES_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        issueDetails: action.issues,
      };
    case CREATE_ISSUES_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: [...state.issues, action.issue],
      };
    case ASSIGNED_ISSUE_TO_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: state.issues.map((issue) =>
          issue.id === action.issue.id ? action.issue : issue
        ),
      };
    case DELETE_ISSUES_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: state.issues.filter((issue) => issue.id !== action.issueId),
      };
    case FETCH_ISSUES_FAILURE:
    case CREATE_ISSUES_FAILURE:
    case UPDATE_ISSUES_STATUS_FAILURE:
    case DELETE_ISSUES_FAILURE:
    case ASSIGNED_ISSUE_TO_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
export default issueReducer;
