import React, { Component } from "react";
import { getMarker } from "../../action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BMap from "BMap";
class MapWrap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapJson: [
        {
          code: 1203,
          lat: 34.335823,
          lng: 109.003382,
          name: "测试账号",
          location: "陕西省西安市",
          addrname: "张三",
          addrtel: 13560790543,
          type: 0
        },
        {
          code: 1203,
          lat: 34.33475,
          lng: 108.926199,
          name: "测试账号",
          location: "陕西省西安市",
          addrname: "张三",
          addrtel: 13560790543,
          type: 1
        },
        {
          code: 1203,
          lat: 34.353587,
          lng: 108.959401,
          name: "测试账号",
          location: "陕西省西安市",
          addrname: "张三",
          addrtel: 13560790543,
          type: 1
        }
      ]
    };
  }
  initializeMap = () => {
    console.log(this.state.mapJson, "555");

    // getMarker();

    // var { markerList } = this.props;
    // console.log(markerList, "klslllllllllllllll");
    // map.setCurrentCity("西安"); // 设置地图显示的城市 此项是必须设置的
    var map = new BMap.Map("mapContainer"); // 创建Map实例
    map.centerAndZoom("西安", 15);
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

    // var markers = new BMap.Marker(new BMap.Point(109.003382, 34.335823));
    // map.addOverlay(markers);
    function addMarker(point) {
      // 创建图标对象
      var myIcon = new BMap.Icon("markers.png", new BMap.Size(23, 25), {
        // 指定定位位置。
        // 当标注显示在地图上时，其所指向的地理位置距离图标左上
        // 角各偏移10像素和25像素。您可以看到在本例中该位置即是
        // 图标中央下端的尖角位置。
        // anchor: new BMap.Size(10, 25),
        // 设置图片偏移。
        // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
        // 需要指定大图的偏移位置，此做法与css sprites技术类似。
        // imageOffset: new BMap.Size(0, 0 - index * 25) // 设置图片偏移
      });
      // 创建标注对象并添加到地图
      var markers = new BMap.Marker(point, { icon: myIcon });
      map.addOverlay(markers);
      markers.addEventListener("click", function() {
        alert("您点击了标注");
      });
    }
    // 向地图添加标注

    /*  Array.prototype.markerList.forEach(ele => {
      var point = new BMap.Point(ele.lng, ele.lat);
      addMarker(point);
    }); */
  };

  componentDidMount() {
    this.initializeMap();
    console.log(this.state.mapJson, "555");
  }
  render() {
    return (
      <div id="mapContainer" style={{ width: "100%", height: "600px" }}>
        {this.state.mapJson ? alert(this.state.mapJson) : ""}
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   const { markerList } = state;
//   return { markerList };
// };
// const mapDispatchToProps = dispatch => ({
//   // getMarker: bindActionCreators(getMarker, dispatch)
//   getMarker: dispatch(getMarker)
// });

const Map = connect()(MapWrap);
// mapStateToProps
// mapDispatchToProps
export default Map;
