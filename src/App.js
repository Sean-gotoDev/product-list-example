import React from 'react';
import './App.css';
import {Button, Card, Image, Col, Container, Form, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";


function App() {

  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand>
            <Image src="logo192.png" rounded width="50px"/>
          </Navbar.Brand>

          <Form.Select aria-label="Filter">
            <option disabled selected>Filter list</option>
            <option value="1">All</option>
            <option value="2">Groceries</option>
            <option value="3">Furniture</option>
            <option value="4">Appliances</option>
          </Form.Select>
        </Container>
      </Navbar>


      <Container>
        <Row xs={1} md={2} lg={3}  className="g-4">
          <Col>

              <Card>
                <Card.Img variant="top" src="https://picsum.photos/id/1/600/400" />
                <Card.Body>
                  <Card.Title>Potatoes</Card.Title>
                  <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et massa at sem ultricies interdum eu in sapien. Donec semper erat vitae diam iaculis pellentesque.</Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
          </Col>
        </Row>
      </Container>
    </div>
	);
}
export default App;