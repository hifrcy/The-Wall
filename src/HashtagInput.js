import React from "react";
import "./HashtagInput.css";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  UncontrolledTooltip,
  Container,
  Row,
  Col
} from "reactstrap";
import Loading from "./Loading";

const HashtagInput = props => {
  return (
    <div>
      <form>
        <InputGroup size="lg">
          <InputGroupAddon addonType="prepend">#</InputGroupAddon>
          <Input
            className="sizeInput"
            value={props.title}
            placeholder="Your Tag !"
            onChange={props.onInputContent}
            type="text"
            onKeyPress={event => {
              if (event.key === "Enter" && props.title.length > 0) {
                props.getTweet(props.title);
                event.preventDefault();
              }
            }}
          />
          {props.title.length > 0 ? (
            <InputGroupAddon addonType="append">
              <Button color="primary" onClick={props.onXClick}>
                X
              </Button>
            </InputGroupAddon>
          ) : (
            <UncontrolledTooltip placement="right" target="toolTip">
              Enter your tag if you want to put another brick in the Wall
            </UncontrolledTooltip>
          )}
        </InputGroup>
        {!props.startLoad ? (
          <div className="buttonPosition">
            <Container>
              <Row>
                <Col
                  xl={{ size: "auto", offset: 4 }}
                  md={{ size: "auto", offset: 3 }}
                  xs={{ size: "auto", offset: 2 }}
                >
                  <img
                    src="images/twitterwhite.png"
                    className="logotwitter mt-5 mr-3"
                    alt="logoTwitter"
                  />

                  <Button
                    className="w-35 mt-5"
                    color="primary"
                    disabled={props.title.length === 0}
                    onClick={() => props.getTweet(props.title)}
                  >
                    <p id="toolTip" className="buttonText">
                      #Start
                    </p>
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <Loading />
          </div>
        )}
      </form>
    </div>
  );
};

export default HashtagInput;
