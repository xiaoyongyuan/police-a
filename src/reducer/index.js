import { combineReducers } from "redux";
import * as type from "../action/type";

const defaultState = {
  markerList: [],
  deviceInfo: {},
  deviceStatistics: [],
  alarmStatistics: [],
  alarmRecord: []
};

const handleData = (state = { isFetching: true, data: {} }, action) => {
  switch (action.type) {
    case type.REQUEST_DATA:
      return { ...state, isFetching: true };
    case type.RECEIVE_DATA:
      return { ...state, isFetching: false, data: action.data };
    default:
      return { ...state };
  }
};
const httpData = (state = {}, action) => {
  switch (action.type) {
    case type.RECEIVE_DATA:
    case type.REQUEST_DATA:
      return {
        ...state,
        [action.category]: handleData(state[action.category], action)
      };
    default:
      return { ...state };
  }
};

const homeMoudle = (state = defaultState, action) => {
  switch (action.type) {
    case type.GET_MARKER:
      return {
        ...state,
        markerList: action.payload
      };
    case type.GET_DEVICEINFO:
      return {
        ...state,
        deviceInfo: action.payload
      };
    case type.GET_DEVICESTATISTICS:
      return {
        ...state,
        deviceStatistics: action.payload
      };
    case type.GET_ALARMSTATISTICS:
      return {
        ...state,
        alarmStatistics: action.payload
      };
    case type.GET_ALARMRECORD:
      return {
        ...state,
        alarmRecord: action.payload
      };
    default:
      return { ...state };
  }
};

export default combineReducers({
  httpData,
  homeMoudle
});
