import React, { Component } from 'react';
import {Form, InputGroup, Button, Col} from 'react-bootstrap';

export default class NewGame extends Component{
    constructor(props) {
      super(props);
        
      this.state = { 
        validated: false,
          type:'',
          boardSize:0,
          level:0,
          game:{}
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
      
        let url;
        let type;
        if(event.target.elements.type.value == 1){
            url = 'http://localhost:8000/othello/newgame';
            type = 'othello';
        }else{
            url = 'http://localhost:8000/memory/newgame';
            type = 'memory';
        }
        console.log('url: ', url)
        console.log(event.target.elements.level.value, '<<<<<<<<<<<<<<<<<');
        fetch(url, {
            method: 'POST',
            headers: {
              Authorization: localStorage.getItem('idToken'),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: type,
                IDplayer1 : localStorage.getItem('userId'),
                IDplayer2 : 'pc',
                size: event.target.elements.size.value,
                level : event.target.elements.level.value,
                IDsession : 0,
                auto: true
            })
        }).then(res=>{
            return res.json();
        })
        .then(data=>{
            console.log(data)
            if(data.post){
                this.setState({game: data.post});
                this.props.history.push({pathname: '/board', state: {game: this.state.game}}); 
            }  
        })
        .catch(err=>{
            console.log('error: <<<<<',err)
        });  
      }   
    }
  
    render() {
      const { validated } = this.state.validated;
      return (
        <Form
            
          noValidate
          validated={validated}
          onSubmit={e => this.handleSubmit(e)}
        >
        <div className="jumbotron text-center">
        <Col md={{ span: 6, offset: 3 }} >
        <h1 className="display-5 text-center">Jugador vs PC</h1>
          <Form.Row className='justify-content-md-center'>
          <Form.Group md="6" controlId="validationType">
          
              <Form.Label>Tipo de Juego</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text type="string" placeholder="Type" name="type" required  htmlFor="inputGroupSelect01">#</InputGroup.Text>
                </InputGroup.Prepend>
                <select className="custom-select" id="type">
                    <option defaultValue>Seleccionar...</option>
                    <option value="1">Othello</option>
                    <option value="2">Memoria</option>
                </select>
                
                <Form.Control.Feedback type="invalid">
                  Seleccione el tipo de juego.
                </Form.Control.Feedback>
              </InputGroup>
              
            </Form.Group>
          </Form.Row>
          <Form.Row className='justify-content-md-center'>
            <Form.Group md="6" controlId="validationSize">
              <Form.Label>Tamaño del Tablero</Form.Label>
              <Form.Control type="number" placeholder="Size" name="size" required />
              <Form.Control.Feedback type="invalid">
                determine el tamaño del tablero.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row className='justify-content-md-center'>
          <Form.Group md="6" controlId="validationLevel">
              <Form.Label>Nivel de Dificultad</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">lvl</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="number"
                  placeholder="level"
                  aria-describedby="inputGroupPrepend"
                  name="level"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Existen 3 niveles de dificultad.
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
          <Button variant="primary" size="lg" type="submit">Jugar</Button>
          <a href="/Menu" className="btn btn-secondary btn-lg">Volver</a>
          </Col>
          </div>
        </Form>
      );
    }
  }
  