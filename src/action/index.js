/**
 * Created by 叶子 on 2017/7/30.
 */
import * as type from "./type";
// import * as http from '../axios/index';
// import * as http from '../axios/tools';
import axios from "axios";
import { message } from "antd";
import { post } from "../axios/tools.js";

const requestData = category => ({
  type: type.REQUEST_DATA,
  category
});
//login时用到过
export const receiveData = (data, category) => ({
  type: type.RECEIVE_DATA,
  data,
  category
});
/**
 * 请求数据调用方法
 * @param funcName      请求接口的函数名
 * @param params        请求接口的参数
 */

export const fetchData = ({ funcName, url, params, stateName }) => dispatch => {
  //lff  登录在用
  !stateName && (stateName = funcName);
  dispatch(requestData(stateName));

  axios
    .post(window.g.loginurl + url, params)
    .then(res => {
      if (res.data.success == 1) {
        dispatch(receiveData(res.data, stateName));
        return res.data;
      } else if (res.data.success == 2) {
        message.warn(res.data.errorinfo);
      } else {
        message.warn(res.data.errorinfo);
      }
    })
    .catch(err => {
      console.log("err", err);
      message.warn("接口异常");
    });
};

// export const getMarker = () => {
//   //取标记
//   return dispatch => {
//     post({ url: "/api/camera_cop/getlist" }, res => {
//       if (res.success === 1) {
//         dispatch({ type: type.GET_MARKER, payload: res.data });
//       }
//     });
//   };
// };
// export const getDeviceInfo = params => {
//   //查看设备详情
//   return dispatch => {
//     post({ url: "/api/camera_cop/getone", data: { code: params } }, res => {
//       if (res.success === 1) {
//         dispatch({ type: type.GET_DEVICEINFO, payload: res.data });
//       }
//     });
//   };
// };

export const getStatistics = () => {
  //获取警报统计
  return dispatch => {
    post({ url: "/api/camera_cop/getcount_e" }, res => {
      dispatch({
        type: type.GET_STATISTICS,
        payload: res.data
      });
    });
  };
};
// export const getAlarmRecord = () => {
//   //获取警报最新十条记录
//   return dispatch => {
//     post({ url: "/api/alarmhandle_cop/gets_ten" }, res => {
//       if (res.success === 1) {
//         dispatch({
//           type: type.GET_ALARMRECORD,
//           payload: res.data
//         });
//       }
//     });
//   };
// };
