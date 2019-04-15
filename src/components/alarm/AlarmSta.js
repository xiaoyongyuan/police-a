import React, { Component } from "react";
import "../../style/ztt/css/alarmSta.css";

class AlarmSta extends Component {
  render() {
    return (
      <div className="AlarmSta">
        <div className="alarmMap" />
        <div className="columnChart" />
      </div>
    );
  }
}

export default AlarmSta;
