import React, {Component} from 'react';
import { TextInput, Button } from 'grommet'
import Header from './Header'
import './Login.css';
import { message } from 'antd'

class Signup extends Component{ 

    constructor(props) {
        super(props);
        this.state = [
                    {email: ""},
                    {password: ""},
                    {username: ""},
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
        else if (which == "un"){
            this.setState({username: e})
        }
    }

    onSubmit (event, e) {
        event.preventDefault()
        var payLoad = {
            email: this.state.email,
            password: this.state.password,
            userName: this.state.username,
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
            if (result.signup){
                this.setState({logged: true}, localStorage.setItem('loggedIn', JSON.stringify(1)), localStorage.setItem('user', JSON.stringify([result.id, result.userName, result.email])), message.success('Successfully signed up!'), 
                this.props.history.push({
                    pathname: `/profile`,
                }))
            }
            else if (!result.signup){
                this.setState({error: result.message}, () => console.log("error"))
            }
        })
    }

    componentDidMount () {
        console.log("Mounted!")
        this.setState({
            email: "",
            password: "",
            username: "",
            error: ""
        })
      }
    
      returnError () {
          console.log("error", this.state.error)
          return (<h1 style = {{margin: "auto", fontSize: "2vh", textAlign: "center", color: "red"}}>{this.state.error}</h1>)
      }

    render(){
        if (JSON.parse(localStorage.getItem('loggedIn')) == 0){
            return(
                <div>
                    <Header/>
                    <div className = "logBox">
                    <form id = "loginForm" onSubmit = {(e) => this.onSubmit(e, "login")}>
                    <div style = {{margin: "auto", textAlign: "center", marginTop: "15vh", width: "25vw"}}>
                        <TextInput
                        placeholder="Email"
                        type = "email"
                        onChange={event => this.setValue(event.target.value, "em")}
                        required/>
                        <br/>
                        <TextInput
                        placeholder="Username"
                        onChange={event => this.setValue(event.target.value, "un")}
                        required/>
                        <br/>
                        <TextInput
                        placeholder="Password"
                        type = "password"
                        onChange={event => this.setValue(event.target.value, "pw")}
                        required/>
                        <br/>
                        <button form = "loginForm" className = "loginBTN" type = "submit" onClick = {(e) => this.onSubmit(e, "signup")}>Signup</button>
                    </div>
                    </form>
                    <br/>
                    <h1>{this.returnError()}</h1>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div>
                    <Header/>
                    <div className = "logBox">
                    <h1 style = {{margin: "auto", textAlign: "center"}}> YOUR LOGGED IN </h1>
                    </div>
                </div>
            );
        }
    }
}

export default Signup;