
import React, { Component } from 'react';
import {Form, InputGroup, Button, Col} from 'react-bootstrap';

export default class NewSession extends Component{
    constructor(props) {
      super(props);
        
      this.state = { 
          validated: false,
          name: '',
          IdPlayer1: '',
          memory: '',
          othello: '',
          level: '', 
          score: ''
        };
    }
  
    handleSubmit(event) {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.setState({ validated: true });
      console.log(event, '<<<<<<<<<<<<<<<<<');
      fetch('http://localhost:8080/session/newsession', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name: this.state.name,
              IdPlayer1: this.state.IdPlayer1,
              IdPlayer2: null,
              memory: this.state.memory,
              othello: this.state.othello,
              level: this.state.level,
              score: this.state.score
          })
      });
    }
  
    render() {
      const { validated } = this.state;
      return (
        <Form
          noValidate
          validated={validated}
          onSubmit={e => this.handleSubmit(e)}
        >
        <div className="jumbotron">
        <Col md={{ span: 6, offset: 3 }}>
        <h1 className="display-5 text-center">Crear nueva Sesion</h1>
          <Form.Row>
          <Form.Group md="6" controlId="validationSessionname">
          
              <Form.Label>Nombre de la Session</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">#</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="SessionName"
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Escoja un nombre para la sesion.
                </Form.Control.Feedback>
              </InputGroup>
              
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group md="6" controlId="validationMemory">
              <Form.Label>Juegos de Memoria</Form.Label>
              <Form.Control type="number" placeholder="Memory" required />
              <Form.Control.Feedback type="invalid">
                determine la cantidad de juegos de memoria.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group md="6" controlId="validationOthello">
              <Form.Label>Juegos de Othelo</Form.Label>
              <Form.Control type="number" placeholder="Othello" required />
              <Form.Control.Feedback type="invalid">
                determine la cantidad de juegos de othelo.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
          <Form.Group md="6" controlId="validationSessionname">
              <Form.Label>Nivel de Juego</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">lvl</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="number"
                  placeholder="SessionName"
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Escoja el nivel de la sesion.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Check
              required
              label="Esta deacuerdo con las condiciones"
              feedback="Debe acceder a las condiciones"
            />
          </Form.Group>
          <Button variant="primary" size="lg" type="submit">Crear Sesion</Button>
          </Col>
          </div>
        </Form>
      );
    }
  }
  