 import React from 'react';
 import Logo from '../Logo/Logo';

 const Navigation = ({onRouteChange, isSignedIn})=>{
   
     if(isSignedIn){
       return(
        
        <nav style = {{display: 'flex', justifyContent:'flex-end', margin:'1rem'}}>
         <p onClick = {() => onRouteChange('signout')} className ="f3 link dim black underline par3 pointer ">Sign Out</p>
        </nav>
       )
      
     }else{
       return(
          
           <nav style = {{display: 'flex', flexDirection:'column'}}>
           <Logo/>
            <p onClick = {() => onRouteChange('signin')} className ="f3 link dim black underline par3 pointer ">Sign In</p>
            <p onClick = {() => onRouteChange('register')} className ="f3 link dim black underline par3 pointer ">Register</p>
          </nav>
        )
     }
  }

 export default Navigation;