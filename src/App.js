import React, { Component } from 'react';
import './App.css';
import Container from './Components/Container';
import Form from './Components/Form';

const Footer = () => (
  <div className="footer centered">
    <p>This is just a test</p>
  </div>
);

class App extends Component {
  render() {
    return (
      <div className="App"> 
        <Container>
          <Form />
          <Footer />
        </Container>
      </div>
    );
  }
}

export default App;
