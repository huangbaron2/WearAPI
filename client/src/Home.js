import React, {Component} from 'react';
import Header from './Header'
import './Home.css';
import { Carousel } from 'grommet'
import Breds from './img/Breds.jpg'

const textArray = ["Clothes", "Shoes", "Watches", "Bags"];

class Home extends Component{
    constructor() {
        super();
        this.state = { textIdx: 0 };
      }

    componentDidMount() {
        this.timeout = setInterval(() => {
          let currentIdx = this.state.textIdx;
          this.setState({ textIdx: currentIdx + 1 });
        }, 3000);
      }

  render(){
    let textThatChanges = textArray[this.state.textIdx % textArray.length];
    return (
        <div>
        <Header/>
            <div style = {{alignFont: "center"}} className = "homeBox">
                <br/>
                <h1 className = "discover">Discover new <h1 className = "wearables">{textThatChanges}</h1></h1>
                <br/>

                    <div className = "carouselBox">
                    <Carousel play="2500" initialChild = {0}>
                       
                            <img style = {{maxHeight: "400px", maxWidth: "500px", objectFit: "contain"}}
                                className="d-block w-50 m-auto"
                                src= { Breds } alt = "https://www.thefashionisto.com/wp-content/uploads/2019/04/Acne-Studios-Navid-Logo-Print-Stretch-Jersey-T-Shirt-Men-White.jpg"
                                alt="First slide"
                            />
     
                            <img style = {{maxHeight: "400px", maxWidth: "500px", objectFit: "contain"}}
                                className="d-block w-50 m-auto"
                                src= { Breds }
                                alt="Third slide"
                            />
    
                            <img style = {{maxHeight: "400px", maxWidth: "500px", objectFit: "contain"}}
                                className="d-block w-50 m-auto"
                                src= { Breds } alt = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/FU6A2?wid=1144&hei=1144&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1555353617178"
                                alt="Third slide"
                            />

                            <img style = {{maxHeight: "400px", maxWidth: "500px", objectFit: "contain"}}
                                className="d-block w-50 m-auto"
                                src= { Breds } alt = "https://cdn.bike24.net/i/mb/90/49/44/335783-00-d-708524.jpg"
                                alt="Third slide"
                            />
    
                    </Carousel>
                    </div>
                    <div className = "byBox">
                        <div style = {{display: "flex"}}><h1 style = {{textAlign:"left", fontSize: "20px"}}>Shop By Category</h1><a style = {{marginLeft: "850px", fontSize: "13px", fontWeight: "600", color: "navy"}}>See More</a></div>
                            <div className = "byBoxList">
                                <div className = "byBoxProps">
                                    <img className = "byImg" src = "https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:70/compress/https://www.filepicker.io/api/file/TbSXDerBQLuINlutawvQ"></img>
                                    <h1 className = "byText">Top</h1>
                                </div>
                                <div className = "byBoxProps">
                                    <img className = "byImg" src = "https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:70/compress/https://www.filepicker.io/api/file/TbSXDerBQLuINlutawvQ"></img>
                                    <h1 className = "byText">Top</h1>
                                </div>
                                <div className = "byBoxProps">
                                    <img className = "byImg" src = "https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:70/compress/https://www.filepicker.io/api/file/TbSXDerBQLuINlutawvQ"></img>
                                    <h1 className = "byText">Top</h1>
                                </div>
                                <div className = "byBoxProps">
                                    <img className = "byImg" src = "https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:70/compress/https://www.filepicker.io/api/file/TbSXDerBQLuINlutawvQ"></img>
                                    <h1 className = "byText">Top</h1>
                                </div>
                                <div className = "byBoxProps">
                                    <img className = "byImg" src = "https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:70/compress/https://www.filepicker.io/api/file/TbSXDerBQLuINlutawvQ"></img>
                                    <h1 className = "byText">Top</h1>
                                </div>
                            </div>

                            <div style = {{marginTop: "50px", display: "flex"}}><h1 style = {{textAlign:"left", fontSize: "20px"}}>Popular Brands</h1><a style = {{textAlign: "left", marginLeft: "875px", fontSize: "13px", fontWeight: "600", color: "navy"}}>See More</a></div>
                            <div className = "byBoxList">
                                <div className = "byBoxProps">
                                    <img style = {{borderRadius: "50%", height: "170px"}} className = "byImg" src = "https://w7.pngwing.com/pngs/475/281/png-transparent-adidas-logo-adidas-logo-adidas-text-photography-shoes.png"></img>
                                    <h1 className = "byText">Adidas</h1>
                                </div>
                                <div className = "byBoxProps">
                                    <img style = {{borderRadius: "50%", height: "170px"}} className = "byImg" src = "https://w7.pngwing.com/pngs/475/281/png-transparent-adidas-logo-adidas-logo-adidas-text-photography-shoes.png"></img>
                                    <h1 className = "byText">Adidas</h1>
                                </div>
                                <div className = "byBoxProps">
                                    <img style = {{borderRadius: "50%", height: "170px"}} className = "byImg" src = "https://w7.pngwing.com/pngs/475/281/png-transparent-adidas-logo-adidas-logo-adidas-text-photography-shoes.png"></img>
                                    <h1 className = "byText">Adidas</h1>
                                </div>
                                <div className = "byBoxProps">
                                    <img style = {{borderRadius: "50%", height: "170px"}} className = "byImg" src = "https://w7.pngwing.com/pngs/475/281/png-transparent-adidas-logo-adidas-logo-adidas-text-photography-shoes.png"></img>
                                    <h1 className = "byText">Adidas</h1>
                                </div>
                            </div>

                            <div style = {{marginTop: "50px", display: "flex"}}><h1 style = {{textAlign:"left", fontSize: "20px"}}>Recently Added</h1><a style = {{marginLeft: "870px", fontSize: "13px", fontWeight: "600", color: "navy"}}>See More</a></div>
                            <div className = "byBoxList">
                                <div className = "byBoxProps">
                                    <img style = {{borderRadius: "50%"}} className = "byImg" src = "https://w7.pngwing.com/pngs/475/281/png-transparent-adidas-logo-adidas-logo-adidas-text-photography-shoes.png"></img>
                                    <h1 className = "byText">Adidas</h1>
                                    <h1 className = "byText">At $500</h1>
                                </div>
                                <div className = "byBoxProps">
                                    <img style = {{borderRadius: "50%"}} className = "byImg" src = "https://w7.pngwing.com/pngs/475/281/png-transparent-adidas-logo-adidas-logo-adidas-text-photography-shoes.png"></img>
                                    <h1 className = "byText">Adidas</h1>
                                    <h1 className = "byText">At $500</h1>
                                </div>
                                <div className = "byBoxProps">
                                    <img style = {{borderRadius: "50%"}} className = "byImg" src = "https://w7.pngwing.com/pngs/475/281/png-transparent-adidas-logo-adidas-logo-adidas-text-photography-shoes.png"></img>
                                    <h1 className = "byText">Adidas</h1>
                                    <h1 className = "byText">At $500</h1>
                                </div>
                                <div className = "byBoxProps">
                                    <img style = {{borderRadius: "50%"}} className = "byImg" src = "https://w7.pngwing.com/pngs/475/281/png-transparent-adidas-logo-adidas-logo-adidas-text-photography-shoes.png"></img>
                                    <h1 className = "byText">Adidas</h1>
                                    <h1 className = "byText">At $500</h1>
                                </div>
                                <div className = "byBoxProps">
                                    <img style = {{borderRadius: "50%"}} className = "byImg" src = "https://w7.pngwing.com/pngs/475/281/png-transparent-adidas-logo-adidas-logo-adidas-text-photography-shoes.png"></img>
                                    <h1 className = "byText">Adidas</h1>
                                    <h1 className = "byText">At $500</h1>
                                </div>
                            </div>


                        <br/>
                    </div>
            </div>
        </div>
    )}
}

export default Home;
/*
<Row gutter={46} style = {{marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>
<Col className="gutter-row">
<img className = "byImg" src = "https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:70/compress/https://www.filepicker.io/api/file/TbSXDerBQLuINlutawvQ"></img>
<h1 className = "byText">Top</h1>
</Col>
<Col className="gutter-row">
<img className = "byImg" src = "https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:70/compress/https://www.filepicker.io/api/file/CCDIo23FQwyOjtHpCCdf"></img>
<h1 className = "byText">Bottom</h1>
</Col>
<Col className="gutter-row">
<img className = "byImg" src = "https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:70/compress/https://www.filepicker.io/api/file/CCDIo23FQwyOjtHpCCdf"></img>
<h1 className = "byText">Bottom</h1>
</Col>
<Col className="gutter-row">
<img className = "byImg" src = "https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:70/compress/https://www.filepicker.io/api/file/CCDIo23FQwyOjtHpCCdf"></img>
<h1 className = "byText">Bottom</h1>
</Col>
<Col className="gutter-row">
<img className = "byImg" src = "https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:70/compress/https://www.filepicker.io/api/file/CCDIo23FQwyOjtHpCCdf"></img>
<h1 className = "byText">Bottom</h1>
</Col>
</Row>

*/