import api from "@/config/api";
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
  FETCH_ISSUES_BY_ID_FAILURE,
  FETCH_ISSUES_BY_ID_REQUEST,
  FETCH_ISSUES_BY_ID_SUCCESS,
  FETCH_ISSUES_FAILURE,
  FETCH_ISSUES_REQUEST,
  FETCH_ISSUES_SUCCESS,
  UPDATE_ISSUES_STATUS_FAILURE,
  UPDATE_ISSUES_STATUS_REQUEST,
  UPDATE_ISSUES_STATUS_SUCCESS,
} from "./ActionTypes";

export const fetchIssues = (id) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ISSUES_REQUEST });
    try {
      const response = await api.get(`/api/issues/project/${id}`);
      console.log("fetch issues", response.data);
      
      dispatch({ type: FETCH_ISSUES_SUCCESS, issues: response.data });
    } catch (error) {
      console.error("Error fetching issues:", error);
      dispatch({
        type: FETCH_ISSUES_FAILURE,
        error: error.message,
      });
    }
  };
};

export const fetchIssueById = (id) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ISSUES_BY_ID_REQUEST });
    try {
      const response = await api.get(`/api/issues/${id}`);
      console.log("fetch issue by id", response.data);
      dispatch({
        type: FETCH_ISSUES_BY_ID_SUCCESS,
        issues: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ISSUES_BY_ID_FAILURE,
        error: error.message,
      });
    }
  };
};

export const updateIssueStatus = ({ id, status }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ISSUES_STATUS_REQUEST });
    try {
      const response = await api.put(`/api/issues/${id}/status/${status}`);
      console.log("update issue status", response.data);
      dispatch({
        type: UPDATE_ISSUES_STATUS_SUCCESS,
        issues: response.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ISSUES_STATUS_FAILURE,
        error: error.message,
      });
    }
  };
};

export const assignedUserToIssue = ({issueId, userId}) => {
    return async (dispatch) => {
        dispatch({type: ASSIGNED_ISSUE_TO_USER_REQUEST})
        try {
            const response = await api.put(`/api/issues/${issueId}/assignee/${userId}`)
            console.log("assignee issue", response.data);
            dispatch({
                type: ASSIGNED_ISSUE_TO_USER_SUCCESS,
                issues: response.data 
            })
        } catch (error) {
            dispatch({
                type:ASSIGNED_ISSUE_TO_USER_FAILURE, error: error.message
            })
        }
    }
}

export const createIssue = (issueData) => {
  return async(dispatch) => {
    dispatch({type: CREATE_ISSUES_REQUEST})
    try {
      const response = await api.post("/api/issues",issueData)
      dispatch({
        type:CREATE_ISSUES_SUCCESS,
        issue: response.data 
      })
      console.log("issue created", response.data);
      
    } catch (error) {
      dispatch({
        type: CREATE_ISSUES_FAILURE,
        error: error.message 
      })
    }
  }
}

export const deleteIssue = (issueId)=>{
  return async(dispatch)=>{
    dispatch({type: DELETE_ISSUES_REQUEST})
    try {
      await api.delete(`/api/issues/${issueId}`)
      dispatch({type: DELETE_ISSUES_SUCCESS, issueId})
    } catch (error) {
      dispatch({
        type: DELETE_ISSUES_FAILURE,
        error: error.message 
      })
    }
  }
}