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
                        <br/>
                        <br/>
                        For all items in the database, use a GET request here:
                        <br/>
                        <Box style = {{border: "solid 1px black", borderRadius: "10vh", width: "20.5vw", display: "inline"}}><p style = {{marginBottom: "-1vh", marginLeft: "1vw", fontSize: "2.5vh"}}>baronswearapi.com:9000/alldb<CopyOutlined style = {{backgroundColor: "white", marginLeft: "1vw", borderRadius: "50%", border: "solid 1px black", padding: "0.85vh"}}/></p></Box>
                        <br/>
                        To filter for certain items, use a POST request here:
                        <Box style = {{border: "solid 1px black", borderRadius: "10vh", width: "25.8vw", display: "inline"}}><p style = {{marginBottom: "-1vh", marginLeft: "1vw", fontSize: "2.5vh"}}>baronswearapi.com:9000/toggle?limit=6<CopyOutlined style = {{backgroundColor: "white", marginBottom: "0.8px", marginLeft: "1vw", borderRadius: "50%", border: "solid 1px black", padding: "0.85vh"}}/></p></Box>
                        The POST request will be called with the body in this format:
                        <br/>
                        <p>
                            ["brand": [], 
                        "model": [], 
                        "color": [], 
                        "article": []
                        ]
                        <p>You can add strings of you want to filter by in the brackets. If all of the brackets are left blank, then all items in the databse are returned.</p>
                        <br/>
                        <p> *While allDB returns all elements in a array of objects, the toggle request will return all elements if blank, or all elements within the filter values, along with total pages, pages mapped to corresponding items according to the per page limit, arrays of all categories, and other useful categories for displaying data.*</p>
                        </p>
                        
                    </Box>
                </div>
            </div>
        );
    }
}

export default API;