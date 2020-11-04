import React, {Component} from 'react';
import { TextInput, Button } from 'grommet'
import Header from './Header'
import './Login.css';
import logged from './Seller'

class Login extends Component{ 

    constructor(props) {
        super(props);
        this.state = [
                    {email: ""},
                    {password: ""},
                    {error: ""}
                    ];
                    this.setValue = this.setValue.bind(this)
                    this.onSubmit = this.onSubmit.bind(this)
                    this.returnError = this.returnError.bind(this)
      };

    setValue(e, which){
        if (which == "em"){
            this.setState({email: e})
        }
        else if (which == "pw"){
            this.setState({password: e})
        }
    }

    onSubmit (e) {
        console.log(this.state.email, ":", this.state.password)
        var payLoad = {
            email: this.state.email,
            password: this.state.password,
            mode: e
          }
          //35.170.149.7:9000
          fetch(`http://${process.env.REACT_APP_HOME_URL}/API/login`, {
              method: 'POST',
              mode: 'cors',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
              body: JSON.stringify(payLoad)
          })
    .then(res => res.json())
      .then(
        (result) => {
          if (result.login){
            this.props.Store.loggingIn(result.email, result.name, result.id)
            this.setState({logged: true}, localStorage.setItem('loggedIn', result.id), window.location.reload())
          }
          else if (!result.login){
            this.setState({error: result.message}, () => console.log("error"))
          }
        })
    }

    componentDidMount () {
        console.log("Mounted!")
        this.setState({
            email: "",
            password: "",
            error: ""
        })
      }
    
      returnError () {
          console.log("error", this.state.error)
          return (<h1 style = {{margin: "auto", fontSize: "2vh", textAlign: "center", color: "red"}}>{this.state.error}</h1>)
      }

    render(){
        if (localStorage.getItem('loggedIn') == 'none'){
            return(
                <div>
                    <Header/>
                    <div style = {{margin: "auto", textAlign: "center", marginTop: "15vh", width: "25vw"}}>
                        *Regristrations are closed for the time being.*
                        <TextInput
                        placeholder="Email"
                        type = "email"
                        onChange={event => this.setValue(event.target.value, "em")}
                        />
                            <br/>
                        <TextInput
                        placeholder="Password"
                        type = "password"
                        onChange={event => this.setValue(event.target.value, "pw")}
                        />
                        <Button primary label="Login" active = "false" onClick = {() => this.onSubmit("login")}/>
                    </div>
                    <h1>{this.returnError()}</h1>
                </div>
            );
        }
        else{
            return(
                <div>
                    <Header/>
                    <h1 style = {{margin: "auto", textAlign: "center"}}> YOUR LOGGED IN </h1>
                </div>
            );
        }
    }
}

export default Login;