import React, { Component } from 'react';
import "../../style/ztt/css/alarmSta.css";

class AlarmSta extends Component {
    render() {
        return (
            <div className="AlarmSta">
                <div className="alarmMap"></div>
                <div className="columnChart"></div>
            </div>
        )
    }
}

export default AlarmSta;