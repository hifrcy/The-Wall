import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  Container
} from "reactstrap";

class TweetModal extends React.Component {
  render() {
    const closeBtn = (
      <button
        className="close"
        onClick={() => {
          this.props.closeModal();
        }}
      />
    );
    return (
      <div>
        <Modal
          isOpen={this.props.modal}
          toggle={this.props.closeModal}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.closeModal} close={closeBtn}>
            <Container>
              <Row>
                <Col xs="4">
                  <img
                    src={this.props.logo}
                    alt="avatar"
                    style={{ borderRadius: "25px" }}
                  />
                </Col>
                <Col xs="8">
                  <p style={{ fontSize: "15px" }}>
                    {this.props.author}
                    <br />
                    {this.props.userName}
                  </p>
                </Col>
                <p
                  style={{
                    fontSize: "15px",
                    position: "absolute",
                    right: "40px",
                    top: "16px"
                  }}
                >
                  {this.props.date}
                </p>
              </Row>
            </Container>
          </ModalHeader>
          <ModalBody>
            <div>
              {this.props.picture !== "N/A" && (
                <img
                  className="w-100"
                  src={this.props.picture}
                  style={{ maxHeight: "650px" }}
                  alt="tweet"
                />
              )}
            </div>
            <div className="mt-3">
              <p style={{ fontSize: "1.5rem" }}>{this.props.message}</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Col xs="6" className="text-center">
              <span className="heart">❤</span>
              {this.props.likeNb}
            </Col>
            <Col xs="6" className="text-center">
              <img src="images/rt.png" style={{ width: "25px" }} alt="RT" />
              {this.props.rtNb}
            </Col>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default TweetModal;
