import React from "react";
import "./Header.css";
import { Container, Row, Col } from "reactstrap";

const Header = () => (
  <header>
    <Container fluid>
      <Row>
        <Col>
          <img
            className="logo"
            src="images/logo_wall_white.png"
            alt="logo wall"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="text-center">Transform your tag into an event</p>
        </Col>
      </Row>
    </Container>
  </header>
);

export default Header;
