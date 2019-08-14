import React from 'react';

class SignIn extends React.Component{
    constructor(props){
      super(props);
      //create state
      this.state = {
        signInEmail:'',
        signInPassword:''
      }
    }
    
    onEmailChange =(event) =>{
      //listen to the onChange event of the email input
      this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event)=>{
      //listen to the onChange event of the password input
      this.setState({signInPassword: event.target.value})
    }
    onSubmitSignIn = ()=> {
      //here we will fetch the data.
      fetch('https://agile-mesa-91661.herokuapp.com/signin', {
        method:'post',
        headers: {'Content-type':'application/json'},
        //the body will contain what we have in the state
        body:JSON.stringify({
          email:this.state.signInEmail,
          password:this.state.signInPassword
        })
      })
      .then(response =>response.json())
      .then(user => {
        //direct the user to the homepage
        if(user.id){
          this.props.loadUser(user);
          this.props.onRouteChange('home')
        }
      })
      
    }

render(){
    //destructure the props so we can use them inside of return
    const {onRouteChange} = this.props;
  return(
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
      <div className="measure center">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f1 fw6 ph0 mh0">Sign In</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input
             onChange ={this.onEmailChange}
             className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input
            onChange={this.onPasswordChange} 
            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
          </div>
          </fieldset>
        <div className="">
          <input
          onClick = {this.onSubmitSignIn}
           className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
             value="Sign in"/>
        </div>
        <div className="lh-copy mt3">
          <p onClick = {() =>onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
          </div>
      </div>
    </main>
  </article>
  )
}
}

export default SignIn;