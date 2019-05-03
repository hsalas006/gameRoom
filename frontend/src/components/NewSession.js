
import React, { Component } from 'react';
import {Form, InputGroup, Button, Col} from 'react-bootstrap';

export default class NewSession extends Component{
    constructor(props) {
      super(props);
        
      this.state = { 
          validated: false,
          name: '',
          IdPlayer1: '',
          othello: 0,
          boardSize: 0, 
          score: {player1: 0, player: 0}
        };
    }

    handleSubmit(event) {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      else{
      
        this.setState({ 
          name: event.target.elements.name.value,
          IdPlayer1: localStorage.getItem('userId'),
          othello: event.target.elements.othello.value,
          boardSize: event.target.elements.size.value
        });
        fetch('http://localhost:8000/session/newsession', {
            method: 'POST',
            headers: {
              Authorization: localStorage.getItem('idToken'),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: event.target.elements.name.value,
                IdPlayer1: localStorage.getItem('userId'),
                IdPlayer2: null,
                games: [event.target.elements.othello.value],
                boardSize: event.target.elements.size.value,
                score: 0
            })
        }).then(res=>{
              console.log(res.json());
              this.props.history.push({pathname: '/sessions'}); 
        });  
      }   
    }
  
    render() {
      const { validated } = this.state;
      return (
        <Form
        className='justify-content-md-center'
          noValidate
          validated={validated}
          onSubmit={e => this.handleSubmit(e)}
        >
        <div className="jumbotron">
        <Col md={{ span: 6, offset: 3 }}>
        <h1 className="display-5 text-center">Crear nueva Sesion</h1>
          <Form.Row className='justify-content-md-center'>
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
                  name="name"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Escoja un nombre para la sesion.
                </Form.Control.Feedback>
              </InputGroup>
              
            </Form.Group>
          </Form.Row>
          <Form.Row className='justify-content-md-center'>
            <Form.Group md="6" controlId="validationOthello">
              <Form.Label>Juegos de Othelo</Form.Label>
              <Form.Control type="number" placeholder="Othello" name="othello" required />
              <Form.Control.Feedback type="invalid">
                determine la cantidad de juegos de othelo.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row className='justify-content-md-center'>
          <Form.Group md="6" controlId="validationSessionname">
              <Form.Label>Tamaño del Tablero</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">x</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="number"
                  placeholder="level"
                  aria-describedby="inputGroupPrepend"
                  name="size"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Tamaño del tablero de juegos.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>
          
          <Button className="justify-content-md-center" variant="primary" size="lg" type="submit">Crear Sesion</Button>
          </Col>
          </div>
        </Form>
      );
    }
  }
  