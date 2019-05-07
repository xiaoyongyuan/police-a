import React, { Component, Fragment } from "react";
import { Row, Col, Modal, Icon } from "antd";
import { post } from "../../axios/tools";
import "../../style/jhy/css/shortVideo.css";

class ShortVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videolist: [],
      visible: false
    };
    this.handleModal = this.handleModal.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
  }
  componentDidMount() {
    post({ url: "/api/alarm_cop/getlist_video" }, res => {
      this.setState(
        {
          videolist: res.data
        },
        () => {}
      );
    });
    localStorage.setItem("vidtit", "");
    localStorage.setItem("vidpath", "");
  }
  handleModal = (name, path) => {
    this.setState({
      visible: true
    });
    localStorage.setItem("vidtit", name);
    localStorage.setItem("vidpath", path);
  };
  cancelModal = () => {
    this.setState({
      visible: false
    });
    localStorage.setItem("vidtit", "");
    localStorage.setItem("vidpath", "");
  };
  locationtype = loc => {
    if (typeof loc === "string") {
      if (loc.indexOf(",") > 0) {
        return <p className="elli ">{loc.split(",")[1]}</p>;
      } else {
        return <p className="elli ">{loc}</p>;
      }
    } else {
      return <p className="elli ">{loc}</p>;
    }
  };
  render() {
    return (
      <div className="shortVideo">
        <Row>
          {this.state.videolist.length > 0
            ? this.state.videolist.map((item, index) => {
                return (
                  <Col
                    xl={6}
                    xxl={4}
                    key={item.code.toString()}
                    className="vidwrap"
                  >
                    <video
                      src={item.videopath ? item.videopath : null}
                      style={{ width: "100%", height: "100%" }}
                      loop
                      autoPlay
                    />
                    <div className="videotit">
                      {this.locationtype(item.location)}
                      <p>{item.atime}</p>
                      <Icon
                        type="fullscreen"
                        className="arrowbtn"
                        style={{
                          padding: "10px",
                          fontSize: "16px"
                        }}
                        onClick={() =>
                          this.handleModal(item.name, item.videopath)
                        }
                      />
                    </div>
                  </Col>
                );
              })
            : null}
          <Modal
            title={`设备名称: ${localStorage.getItem("vidtit")}`}
            visible={this.state.visible}
            footer={null}
            destroyOnClose={true}
            onCancel={this.cancelModal}
            width="50%"
            centered={true}
            bodyStyle={{ textAlign: "center" }}
          >
            <video
              src={localStorage.getItem("vidpath")}
              autoPlay="autoplay"
              controls="controls"
              width="100%"
              style={{ display: "inline-block" }}
            />
          </Modal>
        </Row>
      </div>
    );
  }
}

export default ShortVideo;
