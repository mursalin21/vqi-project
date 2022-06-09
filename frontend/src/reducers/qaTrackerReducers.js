import {
  ADMIN_EXPORT_LIST_FAIL,
  ADMIN_EXPORT_LIST_REQUEST,
  ADMIN_EXPORT_LIST_SUCCESS,
  ADMIN_LIST_FAIL,
  ADMIN_LIST_REQUEST,
  ADMIN_LIST_SUCCESS,
  ADMIN_TASK_UPDATE_FAIL,
  ADMIN_TASK_UPDATE_REQUEST,
  ADMIN_TASK_UPDATE_SUCCESS,
  QATASK_CREATE_FAIL,
  QATASK_CREATE_REQUEST,
  QATASK_CREATE_SUCCESS,
  QATASK_LIST_FAIL,
  QATASK_LIST_REQUEST,
  QATASK_LIST_SUCCESS,
} from "../constants/qaTaskConstants";

export const qaTrackerReducer = (state = { qaTasks: [] }, action) => {
  switch (action.type) {
    case QATASK_LIST_REQUEST:
      return { loading: true };

    case QATASK_LIST_SUCCESS:
      return { loading: false, qaTasks: action.payload };

    case QATASK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminTrackerReducer = (state = { qaTasks: [] }, action) => {
  switch (action.type) {
    case ADMIN_LIST_REQUEST:
      return { loading: true };

    case ADMIN_LIST_SUCCESS:
      return { loading: false, qaTasks: action.payload };

    case ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminExportListReducer = (state = { qaTasks: [] }, action) => {
  switch (action.type) {
    case ADMIN_EXPORT_LIST_REQUEST:
      return { loading: true };

    case ADMIN_EXPORT_LIST_SUCCESS:
      return { loading: false, qaTasks: action.payload };

    case ADMIN_EXPORT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const qaCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case QATASK_CREATE_REQUEST:
      return { loading: true };

    case QATASK_CREATE_SUCCESS:
      return { loading: false, success: true };

    case QATASK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminTaskUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_TASK_UPDATE_REQUEST:
      return { taskUpdateLoading: true };

    case ADMIN_TASK_UPDATE_SUCCESS:
      return { taskUpdateLoading: false, success: true };

    case ADMIN_TASK_UPDATE_FAIL:
      return {
        taskUpdateLoading: false,
        taskUpdateError: action.payload,
        success: false,
      };

    default:
      return state;
  }
};
