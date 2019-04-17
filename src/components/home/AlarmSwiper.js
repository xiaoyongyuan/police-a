import React, { Component } from "react";
import { post } from "../../axios/tools.js";
import { Link } from "react-router-dom";
import nodata from "../../style/imgs/nodata.png";
import nopic from "../../style/jhy/imgs/nopic.png";
class AlarmSwiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alarmList: []
    };
  }

  componentDidMount() {
    var Swiper = window.Swiper;
    new Swiper(".swiper-container", {
      loop: false, //循环
       autoplay: {
         //滑动后继续播放（不写官方默认暂停）
         disableOnInteraction: false
       }, //可选选项，自动滑动
      slidesPerView: 5,
      spaceBetween: 10,
      observer: true,
      observeParents: true,
      observeSlideChildren: true
    });
    post({ url: "/api/alarmhandle_cop/gets_ten" }, res => {
      if (res.success) this.setState({ alarmList: res.data });

      this.dynamicc = setInterval(() => {
        post({ url: "/api/alarmhandle_cop/gets_ten" }, res => {
          if (res.success) this.setState({ alarmList: res.data });
          this.setState({ alarmList: res.data });
        });
      }, 1000 * 5);
    });
  }

  componentWillUnmount() {
    clearInterval(this.dynamicc);
  }
  render() {
    const alarmList = this.state.alarmList;
    return (
      <div className="swiper-container" style={{ height: "100%" }}>
        <div className="swiper-wrapper">
          {alarmList ? (
            alarmList.map((v, i) => (
              <div
                className="swiper-slide"
                key={i}
                style={{ position: "relative" }}
              >
                {v.pic_min !== "" ? (
                  <img src={v.pic_min} alt="" className="newAlarmImg" />
                ) : (
                  <img src={nopic} alt="" className="newAlarmImg" />
                )}

                {/* <div className="newAlarmTit"> */}
                <p className="elli alarmloc">{v.location}</p>
                <p className="elli alarmtime">{v.handletime}</p>
                {/* </div> */}
                <Link
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    zIndex: "1000",
                    position: "absolute",
                    left: 0,
                    top: 0
                  }}
                  to={{
                    pathname: "/app/alarm/AlarmDetail",
                    search: `?id=${v.code}`
                  }}
                />
              </div>
            ))
          ) : (
            <div className="nodata">
              <img src={nodata} alt="" />
              <p style={{ textAlign: "center" }}>暂无数据</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default AlarmSwiper;
