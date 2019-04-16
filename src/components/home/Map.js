import React, { Component } from "react";
import { post } from "../../axios/tools.js";
import PropTypes from "prop-types";
import pointRed from "../../style/jhy/imgs/point.png";
import pointBlue from "../../style/jhy/imgs/point2.png";
class Map extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      markerList: [],
      zonename: "",
      deviceInfo: {}
    };
  }
  componentDidMount() {
    this.getMarkerList();
  }
  getMarkerList = () => {
    post({ url: "/api/camera_cop/getlist" }, res => {
      this.setState(
        {
          markerList: res.data,
          zonename: res.zonename
        },
        () => {
          const _this = this;
          this.initializeMap(_this);
        }
      );
    });
  };
  initializeMap = _this => {
    const routerhistory = this.context.router.history;
    var BMap = window.BMap;
    var map = new BMap.Map("mapContainer"); // 创建Map实例
    var mapStyle = { style: "midnight" };
    map.setMapStyle(mapStyle);
    const defpoint = this.state.zonename;
    //以下写法我也很无奈，领导要求，就这样吧
    defpoint&&defpoint.indexOf('汉中市汉台区')>0?map.centerAndZoom(new BMap.Point(107.053349,33.191015), 12):map.centerAndZoom(defpoint, 10);
    
    map.setCurrentCity(defpoint);
    map.setDefaultCursor("hand");
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    const getBoundary = () => {
      var bdary = new BMap.Boundary();
      bdary.get(defpoint, function(rs) {
        //获取行政区域
        var count = rs.boundaries.length; //行政区域的点有多少个
        for (var i = 0; i < count; i++) {
          var ply = new BMap.Polygon(rs.boundaries[i], {
            strokeWeight: 2, //设置多边形边线线粗
            strokeColor: "#2eccff", //设置多边形边线颜色
            strokeOpacity: 1, //设置多边形边线透明度0-1
            strokeStyle: "dashed", //设置多边形边线样式为实线或虚线，取值 solid 或 dashed
            fillColor: "#2eccff",
            fillOpacity: 0.2
          }); //建立多边形覆盖物
          map.addOverlay(ply); //添加覆盖物
        }
      });
    };
    getBoundary();
    if (this.state.markerList && this.state.markerList.length > 0) {
      this.state.markerList.map((v, i) => {
        var pt = new BMap.Point(v.lng, v.lat);
        if (!v.count) {
          var myIcon = new BMap.Icon(`${pointBlue}`, new BMap.Size(40, 40));
          var marker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
          map.addOverlay(marker);
          marker.addEventListener("click", function() {
            post(
              { url: "/api/camera_cop/getone", data: { code: v.code } },
              res => {
                _this.setState(
                  {
                    deviceInfo: res.data
                  },
                  () => {
                    var optstit = `<p>
                    用户名：${_this.state.deviceInfo.adminname}
                    <span style="margin-left:30px;">
                    电话：${_this.state.deviceInfo.adminaccount}
                    </span>
                    </p>`;
                    var opts = {
                      width: 300, // 信息窗口宽度
                      height: 120, // 信息窗口高度
                      title: optstit,
                      enableMessage: true, //设置允许信息窗发送短息
                      message: ""
                    };
                    var cont = `
                    <p>设备名：${_this.state.deviceInfo.name}</p>
                           <p>设备地址：${_this.state.deviceInfo.location}</p>
                    `;
                    var infoWindow = new BMap.InfoWindow(cont, opts); // 创建信息窗口对象
                    map.openInfoWindow(infoWindow, pt); //开启信息窗口
                  }
                );
              }
            );
          });
        } else if (v.count > 0) {
          var myIcon2 = new BMap.Icon(`${pointRed}`, new BMap.Size(40, 40));
          var marker2 = new BMap.Marker(pt, { icon: myIcon2 }); // 创建标注
          map.addOverlay(marker2);
          marker2.addEventListener("click", function() {
            routerhistory.push(`/app/alarm/AlarmDetail?id=${v.code}`);
          });
        }
        return "";
      });
    } else {
    }
  };

  render() {
    return <div id="mapContainer" style={{ width: "100%", height: "100%" }} />;
  }
}

export default Map;
