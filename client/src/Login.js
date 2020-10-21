import React, {Component} from 'react';
import { TextInput, Button } from 'grommet'
import Header from './Header'
import './Login.css';
import Add from './Add'


class Login extends Component{ 

    constructor(props) {
        super(props);
        this.state = [
                    {email: ""},
                    {password: ""},
                    {add: false},
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
          fetch('http://35.170.149.7:9000/login', {
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
          console.log("login result", result)
          if (result.login){
            this.setState({add: true}, () => console.log("add result", this.state.add))
          }
          else if (!result.login){
            this.setState({error: result.message}, () => console.log("error", this.state.error))
          }
        })
    }

    componentDidMount () {
        console.log("Mounted!")
        this.setState({
            email: "",
            password: "",
            add: false,
            error: ""
        })
      }
    
      returnError () {
          console.log("error", this.state.error)
          return (<h1 style = {{margin: "auto", fontSize: "2vh", textAlign: "center", color: "red"}}>{this.state.error}</h1>)
      }

    render(){
        if (!this.state.add || this.state.add == undefined){
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
                            <br/>
                        <Button primary label="Signup" active = "false" />
                        <br/>
                        <Button style = {{marginTop: "2vh"}}primary label="Login" active = "false" onClick = {() => this.onSubmit("login")}/>
                    </div>
                    <h1>{this.returnError()}</h1>
                </div>
            );
        }
        else {
            return (
                <Add/>
            );
        }
    }
}

//onClick = {() => this.onSubmit("signup")}

export default Login;