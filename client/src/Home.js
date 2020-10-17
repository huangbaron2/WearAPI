import React, {Component} from 'react';
import Header from './homeHeader'
import Filter from './Styles'
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Carousel from 'react-bootstrap/Carousel'

class Home extends Component{
  render(){
    return (
        <div className = "allBox">
            <Header/>
            <div style = {{alignFont: "center"}} className = "homeBox">
                <br/>
                <h1 className = "discover">Discover new <h1 className = "wearables">wearables</h1></h1>
                <br/>
                    <Carousel interval="2500" touch="false" pause="false">
                        <Carousel.Item>
                            <br/>
                            <img style = {{maxHeight: "400px", maxWidth: "1000px", objectFit: "contain"}}
                                className="d-block w-50 m-auto h-50"
                                src="https://cdn.bike24.net/i/mb/90/49/44/335783-00-d-708524.jpg"
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img style = {{maxHeight: "400px", maxWidth: "1000px", objectFit: "contain"}}
                                className="d-block w-50 m-auto"
                                src="https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/cache=expiry:max/rotate=deg:exif/resize=width:2400,fit:crop/output=quality:70/compress/https://process.fs.grailed.com/z0qM3P5pR3a9viT9MCon"
                                alt="Third slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img style = {{maxHeight: "500px", maxWidth: "1000px", objectFit: "contain"}}
                                className="d-block w-50 m-auto"
                                src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/FU6A2?wid=1144&hei=1144&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1555353617178"
                                alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>
            </div>
        </div>
    )}
}

export default Home;
