import React, { Component } from 'react';
import BMap from "BMap";
class Map extends Component{
    componentDidMount() {
        var map = new BMap.Map("mapContainer");  // 创建Map实例
        map.centerAndZoom("西安",15);
    }
    render(){
        return(
            <div id="mapContainer" style={{width:"100%", height:"600px"}}></div>
        )
    }
}
export default Map;