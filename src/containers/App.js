import React, { Component } from "react";
import ParticlesBg from 'particles-bg';

import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <div className="App">
      <ParticlesBg type="circle" bg={true} />
      <header className="App-header">
        <Navigation>
          <Logo />  
        </Navigation>
      </header>
        <main className="App-main">
          <Rank />
          <ImageLinkForm />
          {
          // <FaceRecognition />
          }
        </main>
      </div>
    );
  }
}

export default App;
