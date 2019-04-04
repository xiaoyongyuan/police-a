import React, { Component } from "react";
import { connect } from "react-redux";
import * as homeActions from "../../action/index";

import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import BMap from "BMap";
import pointRed from "../../style/jhy/imgs/point.jpg";
import pointBlue from "../../style/jhy/imgs/point2.jpg";

class Map extends Component {
  constructor(props) {
    super(props);
    this.myDevice = {
      deviceInfo: {}
    };
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    this.initializeMap(nextProps);
  }
  getDerivedStateFromProps(props, state) {
    this.updateData(props);
  }
  updateData = params => {
    // const { getDeviceInfo } = this.props;
    console.log(
      "弹窗点击之后获取的数据传给自定义的值",
      this.myDevice.deviceInfo
    );
    this.myDevice.deviceInfo = params;
  };
  initializeMap = nextProps => {
    const { markerList } = nextProps;
    this.updateData(this.myDevice.deviceInfo);
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
          title: `账号:${
            this.myDevice.deviceInfo.adminaccount
          }&nbsp;&nbsp;&nbsp;用户名:${this.myDevice.deviceInfo.adminname}` // 信息窗口标题
          // enableMessage: true,//设置允许信息窗发送短息
          // message: ""
        };
        var infoWindow = new BMap.InfoWindow(
          `地址${this.myDevice.deviceInfo.city_name}${
            this.myDevice.deviceInfo.town_name
          }${this.myDevice.deviceInfo.village_name}`,
          opts
        ); // 创建信息窗口对象
        marker.addEventListener("click", function() {
          getDeviceInfo(v.code);

          map.openInfoWindow(infoWindow, new BMap.Point(v.lng, v.lat)); //开启信息窗口
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
  componentDidUpdate() {
    const { deviceInfo } = this.props;
    this.myDevice.deviceInfo = deviceInfo;
  }
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
