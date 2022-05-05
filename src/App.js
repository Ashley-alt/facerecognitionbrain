import React, {Component} from 'react';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import './App.css';
import 'tachyons'; 

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation></Navigation>
        <Logo></Logo>
        <ImageLinkForm></ImageLinkForm>
        {/*<FaceRecognition></FaceRecognition>*/}
      </div>
    );
  }
  
}

export default App;
