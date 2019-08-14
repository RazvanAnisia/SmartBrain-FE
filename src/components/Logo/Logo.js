import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';
// import brain from './brain_img.jpg';

const Logo = () =>{
  return(
    <div className ="ma4 mt0">
      <h1>Smart Brain</h1>
      <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner pa3">
          <img style={{ width:'100%', height:'100%'}} alt='logo' src={brain}/>
        </div>
      </Tilt>
    </div>
  )
}

export default Logo; 