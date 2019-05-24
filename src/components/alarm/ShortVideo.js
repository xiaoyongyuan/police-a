import React, { Component } from "react";
import { Row, Col, Modal, Icon, Spin } from "antd";
import { post } from "../../axios/tools";
import "../../style/jhy/css/shortVideo.css";
import nodata from "../../style/imgs/nodata.png";

class ShortVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videolist: [],
      visible: false,
      spinning: true
    };
    this.handleModal = this.handleModal.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
  }
  componentDidMount() {
    post({ url: "/api/alarm_cop/getlist_video" }, res => {
      if (res.success) {
        this.setState({
          videolist: res.data,
          spinning: false
        });
      }
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
        <Row style={{ margin: "0 0 20px 0" }}>
          <button
            onClick={() => {
              window.location.href = "/#/app/home/HoneIndex";
            }}
            style={{
              right: "20px",
              top: "20px",
              background: "rgba(255,255,255,.9)",
              color: "#001529",
              display: "inline-block",
              border: "1px solid #001529",
              fontWeight: "bold",
              float: "right",
              padding: "10px 30px",
              borderRadius: "2px"
            }}
          >
            查看总览
          </button>
        </Row>
        <Row>
          <Spin
            spinning={this.state.spinning}
            size="large"
            className="spin"
            tip="加载中..."
            delay={500}
          />
          {this.state.videolist.length > 0 ? (
            this.state.videolist.map((item, index) => {
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
                    loop="loop"
                    autoPlay="autoplay"
                  />
                  <div className="videotit">
                    {this.locationtype(item.location)}
                    <p>{item.atime}</p>
                    <Icon
                      type="fullscreen"
                      className="arrowbtn"
                      style={{
                        padding: "8px",
                        fontSize: "20px"
                      }}
                      onClick={() =>
                        this.handleModal(item.name, item.videopath)
                      }
                    />
                  </div>
                </Col>
              );
            })
          ) : (
            <img src={nodata} alt="" className="shortVNdata" />
          )}
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
