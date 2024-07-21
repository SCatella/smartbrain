import React, { Component } from "react";
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
        <header className="App-header">
          <Navigation>
            <Logo />
          </Navigation>
          <Rank />
          <ImageLinkForm />
          {
          // <FaceRecognition />
          }
        </header>
        <main>
        </main>
      </div>
    );
  }
}

export default App;
