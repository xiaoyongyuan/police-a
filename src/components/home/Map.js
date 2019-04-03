import React, { Component } from "react";
import { connect } from "react-redux";
import * as homeActions from "../../action/index";

import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import BMap from "BMap";
import pointRed from "../../style/jhy/imgs/point.jpg";
import pointBlue from "../../style/jhy/imgs/point2.jpg";

class Map extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  componentWillReceiveProps(nextProps) {
    // console.log("父组件传来的数据", markerList);
    this.initializeMap(nextProps);
  }
  initializeMap = nextProps => {
    const { markerList, deviceInfo } = nextProps;
    const { getDeviceInfo } = this.props;
    const routerhistory = this.context.router.history;
    var map = new BMap.Map("mapContainer"); // 创建Map实例
    map.centerAndZoom("西安", 15);
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    markerList.map((v, i) => {
      if (v.count === "") {
        var pt = new BMap.Point(v.lng, v.lat);
        var myIcon = new BMap.Icon(`${pointBlue}`, new BMap.Size(35, 40));
        var marker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
        var opts = {
          width: 200, // 信息窗口宽度
          height: 100, // 信息窗口高度
          title: `${v.addrname}`, // 信息窗口标题
          enableMessage: true, //设置允许信息窗发送短息
          message: ""
        };
        var infoWindow = new BMap.InfoWindow(`地址：${v.location}`, opts); // 创建信息窗口对象
        marker.addEventListener("click", function() {
          getDeviceInfo(v.code);
          console.log("deviceInfo的数据", deviceInfo);
          map.openInfoWindow(infoWindow, pt); //开启信息窗口
        });
        map.addOverlay(marker); // 将标注添加到地图中
      } else if (v.count > 0) {
        var pt2 = new BMap.Point(v.lng, v.lat);
        var myIcon2 = new BMap.Icon(`${pointRed}`, new BMap.Size(35, 40));
        var marker2 = new BMap.Marker(pt2, { icon: myIcon2 }); // 创建标注
        marker2.addEventListener("click", function() {
          routerhistory.push("/app/alarm/AlarmDetail");
        });
        map.addOverlay(marker2);
      }
    });
  };

  componentDidMount() {}
  render() {
    return <div id="mapContainer" style={{ width: "100%", height: "600px" }} />;
  }
}

const mapState = state => {
  return {
    deviceInfo: state.homeMoudle.deviceInfo
  };
};
const mapDispatch = dispatch => {
  return {
    getDeviceInfo(params) {
      dispatch(homeActions.getDeviceInfo(params));
    }
  };
};
export default connect(
  mapState,
  mapDispatch
)(Map);
