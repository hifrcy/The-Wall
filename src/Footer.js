import React from "react";
import "./Footer.css";
import { Container, Row, Col } from "reactstrap";

const Footer = () => (
  <Container fluid>
    <Row className="background">
      <Col sm="6">
        <img className="img" src="images/logo_wall_white.png" alt="logo_wall" />
      </Col>
      <Col className="text-right wilders" sm="6">
        Made with <span className="heart">❤</span> by{" "}
        <a
          className="test"
          href="https://www.linkedin.com/in/quentin-da-silva-50b58b16b/"
        >
          Quentin
        </a>{" "}
        -{" "}
        <a
          className="test"
          href="https://www.linkedin.com/in/benoît-niveau-a34ba9133/"
        >
          Benoît
        </a>{" "}
        -{" "}
        <a
          className="test"
          href="https://www.linkedin.com/in/corentin-de-soto-cobet-b5b78b170/"
        >
          Corentin
        </a>{" "}
        -{" "}
        <a
          className="test"
          href="https://www.linkedin.com/in/leuthsouline-chanthathirath-776723170/"
        >
          Leuthsouline
        </a>
      </Col>
    </Row>
  </Container>
);

export default Footer;
