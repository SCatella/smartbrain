import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';

import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';

import './App.css';

const personalAccessToken = process.env.REACT_APP_CLARIFAI_PAT;

const returnClarifaiRequestOptions = (imageURL) => {
  const PAT = personalAccessToken;
  const USER_ID = '1ezm97mwpzy8';       
  const APP_ID = '34532c71b4964643ab1db1c251aae348';
  // const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageURL;
  
  const raw = JSON.stringify({
  "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
  },
  "inputs": [
      {
          "data": {
              "image": {
                  "url": IMAGE_URL
              }
          }
      }
  ]
  });
  
  const requestOptions = {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
  },
  body: raw
  };

  return requestOptions;
}
  


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
    }
  }

  componentDidMount() { }
  
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  
  onSubmit = () => {
    this.setState({ imageURL: this.state.input })
    
    fetch('https://api.clarifai.com/v2/models/face-detection/outputs', returnClarifaiRequestOptions(this.state.input))
    .then(response => response.json())
    .catch(error => console.log('error', error))
    .then(response => {
      console.log('hi:', response.outputs[0].data.regions[0].region_info.bounding_box)
    })
  }
  
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
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit}
          />
          {
          <FaceRecognition imageUrl={this.state.imageURL} />
          }
        </main>
      </div>
    );
  }
}

export default App;
