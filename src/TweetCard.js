import React from "react";
import { Card, CardText, CardBody, CardTitle, Row, Col } from "reactstrap";

const TweetCard = props => {
  return (
    <Card
      onClick={() => {
        props.tweetToModal({ ...props });
      }}
      style={{ width: "450px", margin: "10px", cursor: "pointer" }}
      className="mt-1"
    >
      <CardBody className="pt-2 pb-0">
        <Row>
          <CardTitle className="w-100">
            <img
              className="float-left mr-2"
              src={props.logo}
              alt="avatar"
              style={{ borderRadius: "25px" }}
            />
            <span
              className="mr-2 mt-2"
              style={{ fontSize: "15px", float: "right" }}
            >
              {props.date}
            </span>
            <div className="pt-2">
              {props.author}
              <br />
              <span style={{ fontSize: "15px" }}>{props.userName}</span>
            </div>
          </CardTitle>
        </Row>
      </CardBody>

      {props.picture !== "N/A" && (
        <img
          className="w-100"
          src={props.picture}
          style={{ maxHeight: "650px" }}
          alt="tweet"
        />
      )}

      <CardBody className="pb-2">
        <Row>
          {!props.hideText && (
            <Col xs="12">
              <CardText className="pb-2">{props.message}</CardText>
            </Col>
          )}
          <Col xs="6">
            <CardText className="text-center">
              <span className="heart">❤</span>
              {props.likeNb}
            </CardText>
          </Col>
          <Col xs="6">
            <CardText className="text-center">
              <img src="images/rt.png" style={{ width: "25px" }} alt="RT" />
              {props.rtNb}
            </CardText>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default TweetCard;
