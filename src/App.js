import React, {Component} from 'react';
import { tsParticles } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import Clarifai from 'clarifai';
import Navigation from './components/navigation/navigation';
import Facerecognition from './components/facerecognition/facerecognition';
import Signin from './components/signin/signin';
import Register from './components/register/register';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import Rank from './components/rank/rank';
import './App.css';
import 'tachyons'; 

const app = new Clarifai.App({
  apiKey: '65e62cf2c3844368b2e60c1e1fcddb94'
 });

(async () => {
    await loadFull(tsParticles); // this is needed to load all the features and can be done everywhere before using tsParticles.load

    await tsParticles.load("tsparticles", {
      fps_limit: 60,
      interactivity: {
        detect_on: "canvas",
        events: {
          onclick: { enable: true, mode: "push" },
          onhover: {
            enable: true,
            mode: "attract",
            parallax: { enable: false, force: 60, smooth: 10 }
          },
          resize: true
        },
        modes: {
          push: { quantity: 10 },
          attract: { distance: 200, duration: 0.4, factor: 5 }
        }
      },
      particles: {
        color: { value: "#ffffff" },
        line_linked: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.4,
          width: 1
        },
        move: {
          attract: { enable: false, rotateX: 600, rotateY: 1200 },
          bounce: false,
          direction: "none",
          enable: true,
          out_mode: "out",
          random: false,
          speed: 2,
          straight: false
        },
        number: { density: { enable: true, value_area: 800 }, value: 100 },
        opacity: {
          anim: { enable: false, opacity_min: 0.1, speed: 1, sync: false },
          random: false,
          value: 0.5
        },
        shape: {
          character: {
            fill: false,
            font: "Verdana",
            style: "",
            value: "*",
            weight: "400"
          },
          image: {
            height: 100,
            replace_color: true,
            src: "images/github.svg",
            width: 100
          },
          polygon: { nb_sides: 5 },
          stroke: { color: "#000000", width: 0 },
          type: "circle"
        },
        size: {
          anim: { enable: false, size_min: 0.1, speed: 40, sync: false },
          random: true,
          value: 5
        }
      },
      polygon: {
        draw: { enable: false, lineColor: "#ffffff", lineWidth: 0.5 },
        move: { radius: 10 },
        scale: 1,
        type: "none",
        url: ""
      },
      retina_detect: true
    }); 
  })(); // this must be done after loadFull


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL:"",
      box: {},
      route: "Signin",
      isSignedIn: false,
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === "Signout") {
      this.setState({isSignedIn: false})
    } else if (route === "home") {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
   const {isSignedIn, imageURL, route, box}= this.state;
    return (
      <div className="App">
       <div id="tsparticles"></div>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route === "home"
        ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <Facerecognition box={box} imageURL={imageURL}/>
          </div>
        : (
          route=== "Signin" 
         ? <Signin onRouteChange={this.onRouteChange}/>
         : <Register onRouteChange={this.onRouteChange}/>
        )
        }
      </div>
    );
  }
}

export default App;
