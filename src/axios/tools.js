/**
 * http通用工具函数
 */
import axios from "axios";
import { message } from "antd";
/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
const Httpurl = window.g.url;

/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const citypost = async (
  { url, msg = "接口异常", data = {} },
  callback
) => {
  axios
    .post(Httpurl + url, data)
    .then(res => {
      if (res.data.success === 1) {
        return callback(res.data);
      } else {
        message.warn(res.data.errorinfo);
        return callback(false);
      }
    })
    .catch(err => {
      console.log("err", err);
      message.warn(msg);
    });
};

export const post = async ({ url, msg = "接口异常", data = {} }, callback) => {
  const token = localStorage.getItem("policetoken");
  const comid = localStorage.getItem("policecomid");
  const account = localStorage.getItem("policeaccount");

  if (
    !account ||
    account === "undefined" ||
    !token ||
    !comid ||
    token === "undefined" ||
    comid === "undefined"
  ) {
    window.location.href = "#/login";
    return callback(false);
  }
  const head = {
    headers: {
      AUTHORIZATION: token
    }
  };

  axios
    .post(
      Httpurl + url,
      Object.assign({ comid: comid, user: account }, data),
      head
    )
    .then(res => {
      if (res.data.success === 1) {
        return callback(res.data);
      } else if (res.data.success === 2) {
        window.location.href = "#/login";
        return callback(false);
      } else {
        message.warn(res.data.errorinfo);
        return callback(false);
      }
    })
    .catch(err => {
      console.log("err", err);
      message.warn(msg);
    });
};
