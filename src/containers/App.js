import React, { Component } from 'react';
import Navigation from '../components/navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import SignIn from './SignIn/SignIn';
import Register from './Register/Register';
import './App.css';
import Particles from 'react-particles-js';

const particlesOptions = {
particles: {
  number:{
    value:50,
    density:{
      enable:true,
      value_area :800
    }
  }
}
}

const initialState = {
  input: '',
  imageUrl:'',
  box:{},
  route:'signin',
  isSignedIn:false,
  user:{
    id:'',
    name:'',
    email: '',
    entries: 0,
    joined: ''
    }

}
class App extends Component {
  constructor(){
    super()
    this.state = initialState;

  }

  loadUser =(data)=>{
    this.setState({
      user:{
        id: data.id,
        name:data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
        }
    })
  }

  calculateFaceLocation = (data) =>{
    //console.log(data)
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    //select the image
    const image = document.getElementById('inputImage');
    //get the width and the height of the image
    const width = Number(image.width);
    const height = Number(image.height);
    //return the object with the 4  coordinates for 4 dots
    return{
      leftCol:clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height -(clarifaiFace.bottom_row * height)
    }
  }
  //Display face box, will take in the object we return
    displayFaceBox = (box) =>{
    this.setState({box: box})

  }
  //On input event, set the state of input to the value from the input
  onInputChange = (event) =>{
    this.setState({input:event.target.value})
  }
  //
  onButtonSubmit = () =>{
    //set the imageUrl state to be equal to the input from the user
    this.setState({imageUrl: this.state.input})
    fetch('https://agile-mesa-91661.herokuapp.com/imageURL',{
      method:'post',
      headers: {'Content-type':'application/json'},
      //the body will contain what we have in the state
      body:JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response=> {
      console.log(response)
        if(response){
          fetch('https://agile-mesa-91661.herokuapp.com/image',{
            method:'put',
            headers: {'Content-type':'application/json'},
            //the body will contain what we have in the state
            body:JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count =>{
            this.setState(Object.assign(this.state.user, {entries:count}))
          })
          .catch(err => console.log(err))
        }
        // we passed in the response from Clarifai in the function
        //we passed in displayFaceBox the result of the function
       this.displayFaceBox(this.calculateFaceLocation(response))
      })
    .catch(err =>console.log(err))
  }
  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState(initialState)
    }else if(route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
  }
  render() {
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
       <Particles className ='particles'
              params = {particlesOptions}
       />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>

        {
          route === 'home' ?
            // render the homepage
            <div>
              <Logo/>
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange ={this.onInputChange}
              onButtonSubmit = {this.onButtonSubmit}/>
              <FaceRecognition  box={box} imageUrl={imageUrl}/>
            </div>
            //otherwise
            :(this.state.route ==='signin'?
              //render the signIn form
              <SignIn loadUser ={this.loadUser} onRouteChange = {this.onRouteChange}/>
              //if not render the Register
              :<Register  loadUser ={this.loadUser} onRouteChange ={this.onRouteChange}/>
            )

        }
      </div>
    );
  }
}

export default App;
