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
                    <Box style = {{fontSize: "3vh", margin: "auto", width: "80vw"}}>
                        <h4 style = {{marginLeft: "30px"}}>API is on port 9000 of this domain, but is currently under development.</h4>

                    </Box>
                </div>
            </div>
        );
    }
}

export default API;