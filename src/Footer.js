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
        Made with <span className="heart">❤</span> by Quentin - Benoît -
        Corentin - Leuthsouline <br />
        reactivated and uploaded by <a href="https://github.com/hifrcy" className="link">
        HiFrcy
</a>
      </Col>
    </Row>
  </Container>
);

export default Footer;
