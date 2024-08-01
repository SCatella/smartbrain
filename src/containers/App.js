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
      box: []
    }
  }

  componentDidMount() { }

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const clarifaiFace = data.outputs[0].data.regions;

    return clarifaiFace.map((obj) => {
      const boundingBox = obj.region_info.bounding_box

      return {
        top: Number(boundingBox.top_row * height),
        right: Number(width - (boundingBox.right_col * width)),
        bottom: Number(height - (boundingBox.bottom_row * height)),
        left: Number(boundingBox.left_col * width),
      }
    })
    
    
  }

  // .then(response => {
  //     if (response.status.code === 30002) {
  //       alert('Could not process request.');
  //       throw new Error('Could not process request due to copyright.');
  //     } else {
  //     }
  //   })        

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }
  
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  
  onSubmit = () => {
    const { input } = this.state;
    const { displayFaceBox, calculateFaceLocation } = this;
    this.setState({ imageURL: input })
    
  fetch('https://api.clarifai.com/v2/models/face-detection/outputs', returnClarifaiRequestOptions(input))
    .then(response => response.json())
    .then(response => displayFaceBox(calculateFaceLocation(response)))
    .catch(error => console.log(error))
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
          
          <FaceRecognition
            imageUrl={this.state.imageURL}
            box={this.state.box}
          />
        </main>
      </div>
    );
  }
}

export default App;
