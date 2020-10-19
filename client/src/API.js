import React, {Component} from 'react';
import './Api.css';
import Header from './Header';
import { Box } from 'grommet';
import { CopyOutlined } from '@ant-design/icons';


class API extends Component{ 
    render(){
        return(
            <div>
                <Header/>
                <div>
                    <Box animation = "slideLeft" style = {{fontSize: "3vh", margin: "auto", width: "80vw"}}>
                        The API is on port 9000 of this website.
                        For all items in the database, use this link:
                        <br/>
                        <Box style = {{border: "solid 1px black", borderRadius: "10vh", width: "20.5vw", display: "inline"}}><p style = {{marginBottom: "-1vh", marginLeft: "1vw", fontSize: "2.5vh"}}>baronswearapi.com:9000/alldb<CopyOutlined style = {{backgroundColor: "white", marginLeft: "1vw", borderRadius: "50%", border: "solid 1px black", padding: "0.85vh"}}/></p></Box>
                        <br/>
                        For items that have certain values in their names:
                        <Box style = {{border: "solid 1px black", borderRadius: "10vh", width: "25.8vw", display: "inline"}}><p style = {{marginBottom: "-1vh", marginLeft: "1vw", fontSize: "2.5vh"}}>baronswearapi.com:9000/toggle?limit=6<CopyOutlined style = {{backgroundColor: "white", marginBottom: "0.8px", marginLeft: "1vw", borderRadius: "50%", border: "solid 1px black", padding: "0.85vh"}}/></p></Box>
                        This is a post request with the body in this format:
                        <br/>
                        <p>
                            ["brand": [], 
                        "model": [], 
                        "color": [], 
                        "article": []
                        ]
                        <p>You can add strings of names/ products you want to filter by in the brackets. If the bracket is left blank, all items in the databse is returned.</p>
                        
                        </p>
                        
                    </Box>
                </div>
            </div>
        );
    }
}

export default API;