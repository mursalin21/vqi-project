import axios from "axios";
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

export const listQaTasks = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: QATASK_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/qaTaskTracker`, config);

    dispatch({
      type: QATASK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: QATASK_LIST_FAIL,
      payload: message,
    });
  }
};

export const listAdminTasks = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_LIST_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/qaTaskTracker/qaAdminTasks`, config);

    dispatch({
      type: ADMIN_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ADMIN_LIST_FAIL,
      payload: message,
    });
  }
};

export const adminExportList = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_EXPORT_LIST_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "text/csv",
      },
    };
    const { data } = await axios.get("/api/qaTaskTracker/getCsvFile", config);
    dispatch({
      type: ADMIN_EXPORT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ADMIN_EXPORT_LIST_FAIL,
      payload: message,
    });
  }
};

export const createTaskAction =
  (job_number, task_received_date, total_volume, edited_volume) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: QATASK_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/qaTaskTracker/qaTaskCreate`,
        {
          job_number,
          task_received_date,
          total_volume,
          edited_volume,
        },
        config
      );

      dispatch({
        type: QATASK_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: QATASK_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateAdminTaskAction =
  (
    id,
    job_number,
    email,
    total_volume,
    edited_volume,
    task_received_date,
    status
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ADMIN_TASK_UPDATE_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/qaTaskTracker/${id}`,
        {
          job_number,
          email,
          total_volume,
          edited_volume,
          task_received_date,
          status,
        },
        config
      );

      dispatch({
        type: ADMIN_TASK_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: ADMIN_TASK_UPDATE_FAIL,
        payload: message,
      });
    }
  };
