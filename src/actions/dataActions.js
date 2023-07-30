// src/actions/dataActions.js

import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  UPDATE_DATA_REQUEST,
  FETCH_DATA_FAILURE,
  UPDATE_DATA_SUCCESS,
} from "./types";
import axios from "axios"; // You can use your preferred HTTP client library

const options = {
  headers: {
    "Content-Type": "application/json", // You can set other headers as needed
  },
};
const fetchDataRequest = () => {
  return {
    type: FETCH_DATA_REQUEST,
  };
};

const updateDataRequest = () => {
  return {
    type: UPDATE_DATA_REQUEST,
  };
};

const fetchDataSuccess = (data) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data,
  };
};

const updateDataSuccess = (data) => {
  return {
    type: UPDATE_DATA_SUCCESS,
    payload: data,
  };
};

const fetchDataFailure = (error) => {
  return {
    type: FETCH_DATA_FAILURE,
    payload: error,
  };
};
export const fetchData = (search = "") => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    const response = await axios.get(
      `http://localhost:4000/list?q=${search}`,
      options
    );
    console.log(response);
    if (response.data)
      // Replace with your API endpoint
      dispatch(fetchDataSuccess(response.data));
    else if (response.error) dispatch(fetchDataFailure(response.error));
  };
};

export const bookAppointment = (data) => {
  return async (dispatch) => {
    const response = await axios.patch(
      `http://localhost:4000/list/${data.id}`,
      data
    );
    dispatch(fetchData());
    console.log(response);
    if (response?.data) return { msg: "Appointment Booked Successfully!" };
    else return { msg: "Something went wrong!" };
  };
};
