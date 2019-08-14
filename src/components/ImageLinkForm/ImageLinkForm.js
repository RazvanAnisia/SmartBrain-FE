import React from 'react';
import './form.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit})=>{
  return(
    <div>
      <p className ='f3'>
      {'Our Smart AI is capable of detecting faces in pictures.Give it a try'}
      </p>
      <div>
        <div  className='pa4 br3 shadow-5 form'>
          <input className ='f4 pa2 w-70 center ' onChange ={onInputChange}  type = 'text'/>
          <button className ='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
          onClick={onButtonSubmit}>Detect</button>
        </div>
      </div>

    </div>
  ) 
} 

export default ImageLinkForm;