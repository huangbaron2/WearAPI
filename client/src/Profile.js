import React, {Component} from 'react';
import { TextInput, Button } from 'grommet'
import Header from './Header'
import './Profile.css';

class Profile extends Component{ 

    constructor(props) {
        super(props);
        this.state = [
                    {name: ""},
                    {email: ""},
                    {password: ""},
                    {error: ""}
                    ];
      };

    componentDidMount () {
        console.log("Mounted!")
        this.setState({
            email: "",
            password: "",
            error: ""
        })
      }


    render(){
        if (JSON.parse(localStorage.getItem('loggedIn')) == 0){
            return(
                <div>
                    {
                    this.props.history.push({
                        pathname: `/Login`,
                    })
                     }
                </div>
            );
        }
        else{
            return(
                <div>
                    <Header/>
                    <div className = "profileBox">
                         <div className = "personalInfo">
                            <img className = "profilePic"></img>
                            <h1 className = "userName">{JSON.parse(localStorage.getItem('user'))[1]}</h1>
                            <h1 style = {{fontSize: "16px", marginLeft: "-90px", marginTop: "90px"}}className = "userName">Joined 2020</h1>
                            <div className="vl"></div>
                            <h1 style = {{fontSize: "16px", marginTop: "90px", marginLeft: "15px"}} className = "userName">Primary email: {JSON.parse(localStorage.getItem('user'))[2]}</h1>
                            <div className="vl"></div>
                            <div style = {{display: "inline-block"}}>
                            <h1 style = {{fontSize: "18px", marginTop: "55px"}} className = "userName">0</h1>
                            <h1 style = {{fontWeight: "400", fontSize: "16px", marginTop: "0px"}} className = "userName">Favorites</h1>
                            </div>
                            <div className="vl"></div>
                            <div style = {{display: "inline-block"}}>
                            <h1 style = {{fontSize: "18px", marginTop: "55px"}} className = "userName">0</h1>
                            <h1 style = {{fontWeight: "400", fontSize: "16px", marginTop: "0px"}} className = "userName">Transactions</h1>
                            </div>
                            <div className="vl"></div>
                            <div style = {{display: "inline-block"}}>
                            <h1 style = {{fontSize: "18px", marginTop: "55px"}} className = "userName">0</h1>
                            <h1 style = {{fontWeight: "400", fontSize: "16px", marginTop: "0px"}} className = "userName">Listings</h1>
                            </div>
                            
                         </div>
                         <div className = "orderInfo">

                         </div>
                    </div>
                </div>
            );
        }
    }
}

export default Profile;