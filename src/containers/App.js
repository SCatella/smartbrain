import React, { Component } from 'react';

import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import SignIn from './SignIn/SignIn';
import Register from './Register/Register';
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
      imageUrl: '',
      box: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
      }
    }
  };

  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
      }
    })
  };

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const clarifaiFace = data.outputs[0].data.regions;
    
    if (data.status.code === 30002) {
      alert('Cannot process request. Insufficient permissions or copyright');
      throw new Error(data.status.description);
    } else {
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
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };
  
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };
  
  onSubmit = () => {
    const { input } = this.state;
    const { displayFaceBox, calculateFaceLocation } = this;
    this.setState({ imageUrl: input })
    
    fetch('https://api.clarifai.com/v2/models/face-detection/outputs', returnClarifaiRequestOptions(input))
      .then(response => response.json())
      .catch(error => console.log(error))
      .then(response => displayFaceBox(calculateFaceLocation(response)))
      .catch(error => console.log(error))
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({route: route});
  };

  onFieldChange = (key) => (event) => {
    const user = this.state.user;

    user[key] = event.target.value;
    this.setState({ user })
  };

  onUserSubmit = (route) => () => {
    const { name, email, password } = this.state.user;
    fetch(`http://localhost:3000/${route}`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.userValid === true) {
          this.loadUser(data.user);
          this.onRouteChange('home');            
        } else {
          new Error('Response Code:', data.responseCode, ':', data.errorMessage);
          alert(data.errorMessage);
        }
      })
  };

  
  render() {
    const { onRouteChange, onFieldChange, onInputChange, onSubmit, onUserSubmit, loadUser } = this;
    const { isSignedIn, user, route, imageUrl, box } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange}>
            <Logo />  
          </Navigation>
        </header>
        <main className="App-main">
        {(route === 'home')
          ? <div>
              <Rank
                userName={user.name}
                userEntries={user.entries}
              />
              <ImageLinkForm
                onInputChange={onInputChange}
                onSubmit={onSubmit}
              />
              
              <FaceRecognition
                imageUrl={imageUrl}
                box={box}
              />
            </div>
          : (
            (route === 'signin')
              ? <SignIn
                  onRouteChange={onRouteChange}
                  onFieldChange={onFieldChange}
                  onUserSubmit={onUserSubmit}
                  loadUser={loadUser}
                />
              : <Register
                  onRouteChange={onRouteChange}
                  onFieldChange={onFieldChange}
                  onUserSubmit={onUserSubmit}
                />
          )
        }
        </main>
      </div>
    );
  };
};

export default App;
