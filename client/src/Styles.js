import React from 'react'
import ReactDOM from 'react-dom'
import Headers from './Header'
import './Styles.css'
import 'antd/dist/antd.css';
import { DoubleRightOutlined, LoadingOutlined , SortAscendingOutlined , SortDescendingOutlined } from '@ant-design/icons'
import { Menu, Drawer, Spin, Checkbox as CB, message } from 'antd';
import { Grommet, Box, CheckBox, Header} from 'grommet';
const dotenv = require('dotenv');


const { SubMenu } = Menu;
const CheckboxGroup = CB.Group;
const topOptions = ['XS', 'S', 'M', 'L', 'xL'];
const bottomOptions = ['XS', 'S', 'M', 'L', 'xL'];
const footwearOptions = ['XS', 'S', 'M', 'L', 'xL'];
const myTheme = {
  text: {
    medium: {
      height: "100px",
      size: '100px',
    },
  },
};

class Styles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Select Toggles
                sBrand: [],
                sArticle: [],
                sPrice: ["0", "999999"],
                sCondition: [],
                sSize: [],
      //All
                allBrands: [],
                allBrandsCount: 0,
                allArticles: [],
                allArticlesCount: 0,
                topPrice: "",
                allItems: [],
                totalItems: 0,
                pageItems: {},

                page: "1",
                totalPages: 0,
                pageList: [],
                collapsed: false,
                loaded: false,
                visible: false,
                placement: 'left',
                open: true,
                limit: "20"

                };
                this.toggleBrands = this.toggleBrands.bind(this)
                this.toggleArticles = this.toggleArticles.bind(this)
                this.toggleConditions = this.toggleConditions.bind(this)
                this.refillFilter = this.refillFilter.bind(this)
                this.handlePaginationChange = this.handlePaginationChange.bind(this)
                this.handlePaginationChangePN = this.handlePaginationChangePN.bind(this)
                this.setPage = this.setPage.bind(this)
                this.switchCollapsible = this.switchCollapsible(this)
                this.postToggle = this.postToggle.bind(this)
                this.displayPage = this.displayPage.bind(this)
                this.amountProducts = this.amountProducts.bind(this)
                this.sortBy = this.sortBy.bind(this)
  };

  postToggle(){
    var payLoad = {
      brand: this.state.sBrand,
      name: this.state.sname, 
      article: this.state.sArticle,
      price: ["0", "99999"],
      condition: this.state.sCondition,
      size: this.state.sSize,
      limit: this.state.limit
    }
    console.log("PAYLOAD", payLoad)
    const env = dotenv.config().parsed;
    fetch(`http://${process.env.REACT_APP_HOME_URL}/API/products`, {
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
          this.setState({
            allBrands: Object.keys(result.allBrands),
            allArticles: Object.keys(result.allArticles),
            allBrandsCount: result.allBrands,
            allArticlesCount: result.allArticles,
            totalItems: result.totalItems,
            totalPages: result.totalPages,
            allItems: result.allItems,
            pageItems: result.pageItems,
            pageList: result.pageList
          }, () => (this.setState({loaded: true}, console.log("ProductPostResult", result))))
        })
  }

  refillFilter (category, value, e) {
    if (category === "brand"){
      if (e){
        this.state.sBrand.push(value)
        this.setState({sBrand: this.state.sBrand}, () => (this.postToggle()))
      }
      else if (!e){
        var newBrand = []
        for (var i of this.state.sBrand){
          if (i != value){
            newBrand.push(i)
          }
        }
        this.setState({sBrand: newBrand}, () => (this.postToggle()))
      }
    }
    if (category === "article"){
      if (e){
        var articleARR = this.state.sArticle
        articleARR.push(value)
        this.setState({sArticle: articleARR}, () => (this.postToggle()))
      }
      else if (!e){
        var newArticle = []
        for (var i of this.state.sArticle){
          if (i != value){
            newArticle.push(i)
          }
        }
        this.setState({sArticle: newArticle}, () => (this.postToggle()))
      }
    }
    if (category === "condition"){
      if (e){
        var conditionARR = this.state.sCondition
        conditionARR.push(value)
        this.setState({sCondition: conditionARR}, () => (this.postToggle()))
      }
      else if (!e){
        var newCondition = []
        for (var i of this.state.sCondition){
          if (i != value){
            newCondition.push(i)
          }
        }
        this.setState({sCondition: newCondition}, () => (this.postToggle()))
      }
    }
  }

  componentDidMount () {
    this.setState({
                sBrand: [],
                sArticle: [],
                sPrice: ["0", "999999"],
                sCondition: [],
                sSize: [],
      //All
                allBrands: [],
                allArticles: [],
                topPrice: "",
                allItems: [],
                totalItems: 0,
                pageItems: [],

                page: "1",
                totalPages: 0,
                pageList: [],
                collapsed: false,
                loaded: false,
                visible: false,
                placement: 'left',
                open: true,
                limit: "20"
    }, () => this.postToggle())
  }

  onChange = e => {
    this.setState({
      placement: e.target.value,
    });
  };

  toggleBrands (value, event) {
    this.refillFilter("brand", value, event)
  }

  toggleArticles (value, event) {
    this.refillFilter("article", value, event)
  }

  toggleConditions (value, event) {
    this.refillFilter("condition", value, event)
  }

  setPage(){
    this.setState({
      displayItems: this.state.adItems[this.state.page]
    })
  }

  handlePaginationChange (e) {
    this.setState({page: e}, () => (this.setPage()))
  }
  handlePaginationChangePN (e) {
    if (e.target.value == "next"){
      if (this.state.page + 1 <= this.state.totalPages){
        this.setState({page: this.state.page + 1}, () => (this.setPage()))
      }
    }
    else if (e.target.value == "prev"){
      if (this.state.page - 1 > 0){
        this.setState({page: this.state.page - 1}, () => (this.setPage()))
      }
    }
  }

  switchCollapsible() {
		this.setState({ open: this.state.open ? false : true });
  }
  
  displayPage() {//remember that _id for onClick
    if (this.state.pageItems != undefined && Object.keys(this.state.pageItems).length > 0){
      return (<div className="productsBox">
                        {this.state.pageItems[this.state.page].map((clothes, index) => (
                        <div key={index} className = "products" color = "white" onClick = {() => this.props.history.push({
                                                                                                  pathname: `/styles/${clothes._id}`,
                                                                                                  })}>                  
                                  <img className = "imageCard" src = "google.com"></img>
                                  <h1 className = "brandCard">{clothes.brand.join(' x ')}</h1>
                                  <h1 className = "nameCard">{clothes.name}</h1>
                                  <h1 className = "costCard">${clothes.price}</h1>
                        </div>
                  ))}
            </div>)
      
    }
    else{
      return (<h1>No items available</h1>)
    }
  }

  amountProducts (category, item) {
    var amount = 0
    if (category == "brand") {
      return (item + "  " + "(" + this.state.allBrandsCount[item] + ")")
    }
    if (category == "article") {
      return (item + "  " + "(" + this.state.allArticlesCount[item] + ")")
    }  
    if (category == "condition") {
      return (item + "  " + "(" + this.state.allArticlesCount[item] + ")")
    }  
  }

  sortBy(value){
    var newItem = {}
    if (value == "b+"){
      newItem = this.state.allItems.sort((a, b) => (a.brand < b.brand) ? 1 : -1)
    }
    else if (value == "b-"){
      newItem = this.state.allItems.sort((a, b) => (a.brand > b.brand) ? 1 : -1)
    }
    else if (value == "m+"){
      newItem = this.state.allItems.sort((a, b) => (a.name< b.name) ? 1 : -1)
    }
    else if (value == "m-"){
      newItem = this.state.allItems.sort((a, b) => (a.name > b.name) ? 1 : -1)
    }
    this.setState({allItems: newItem}, () => {
    var sortedADItems = []
    const limit = 20
    var totalPages = Math.ceil(this.state.allItems.length / limit)
    for (var pages = 1; pages < totalPages + 1; pages ++){
        sortedADItems[String(pages)] = []   
    }
    var pageIndex = 0;
    for (var count = 0; count < this.state.allItems.length; count ++){
        if ((count % limit) == 0){
            pageIndex += 1
            sortedADItems[String(pageIndex)].push(this.state.allItems[count])
        }
        else{
          sortedADItems[String(pageIndex)].push(this.state.allItems[count])
        }
    }
    this.setState({adItems: sortedADItems}, () => this.setState({displayItems: this.state.adItems[this.state.page]}))
  })
  }

  render() {
    const { placement, visible } = this.state;
    if (Object.keys(this.state.pageItems).length){
      return (
        <div className = "allStyles">
          <Headers/>
        <div className = "stylesBox">
          <div className = "filterBox">
              <Menu style = {{paddingLeft: "1vw", paddingRight: "1vw", paddingTop: "1vh"}} theme="light" defaultSelectedKeys={['1']} mode="inline">

              <SubMenu style = {{fontWeight: "600", fontSize: "2.8vh", border: "solid 2px grey", marginBottom: "1vh"}} title="Brands">
                <Grommet>
                    <Box>
                    { this.state.allBrands && this.state.allBrands.map(item => <CheckBox toggle = {true} reverse = {false} className = "filterLabels" label={this.amountProducts("brand", item)} onChange={(event) => this.toggleBrands(item, event.target.checked)}/>)}
                    </Box>
                  </Grommet>
                </SubMenu>
  
                <SubMenu style = {{fontWeight: "600", fontSize: "2.8vh", border: "solid 2px grey", marginBottom: "1vh"}} key="sub4" title="Articles">
            <Grommet>
                <Box>
                { this.state.allArticles && this.state.allArticles.map(item => <CheckBox toggle = {true} reverse = {false} className = "filterLabels" label = {this.amountProducts("article", item)} onChange={(event) => this.toggleArticles(item, event.target.checked)}/>)}
                </Box>
              </Grommet>
            </SubMenu>

                <SubMenu style = {{fontWeight: "600", fontSize: "2.8vh", border: "solid 2px grey", marginBottom: "1vh"}} title="Conditions">
                <Grommet>
                    <Box>
                      <CheckBox toggle = {true} reverse = {false} className = "filterLabels" label = 'Used' onChange={(event) => this.toggleConditions('Used', event.target.checked)}/>
                      <CheckBox toggle = {true} reverse = {false} className = "filterLabels" label = 'New' onChange={(event) => this.toggleConditions('New', event.target.checked)}/>
                    </Box>
                  </Grommet>
                </SubMenu>
              </Menu>
        </div>

          <div className = "rightBox">
            <Menu style = {{height: "1px", width: "1px", padding: "1px", marginTop: "10px", marginLeft: "708px"}} theme="light" defaultSelectedKeys={['1']} mode="inline">
              <SubMenu size = "small" style = {{padding: "1px", height: "50px", position: "absolute", width: "200px", fontWeight: "600", fontSize: "15px", border: "solid 1px grey"}} title="Sort By">
                <Grommet>
                 <Box>
                  <button className = "filterLabels" onClick = {() => this.sortBy("b+")}>Sort by brands <SortDescendingOutlined style = {{fontSize: "3vh"}}/></button>
                  <button className = "filterLabels" onClick = {() => this.sortBy("b-")}>Sort by brands <SortAscendingOutlined style = {{fontSize: "3vh"}}/></button>
                  <button className = "filterLabels" onClick = {() => this.sortBy("m+")}>Sort by names <SortDescendingOutlined style = {{fontSize: "3vh"}}/></button>
                  <button className = "filterLabels" onClick = {() => this.sortBy("m-")}>Sort by names <SortAscendingOutlined style = {{fontSize: "3vh"}}/></button>
                </Box>
                </Grommet>
              </SubMenu>
            </Menu>
            {this.displayPage()}
              <div className = "paging">
                    <ul className = "pgingBox">
                    <button value = "prev" className = "checkBrands" onClick = {e => this.handlePaginationChangePN(e)}>prev</button> 
                    { this.state.allPages && this.state.allPages.map(item => <button style = {{border: "solid 2px purple"}} onClick = {() => this.handlePaginationChange(item)}  className = "checkBrands" >{item}</button> )}
                    <button value = "next" className = "checkBrands" onClick = {e => this.handlePaginationChangePN(e)}>next</button> 
                    </ul>
                  <h1 style = {{fontSize: "15px", marginLeft: "45px", textAlign: "center"}}>Current page: {this.state.page}</h1>
              </div>
 
          </div>

          </div>
        </div>
      );
    }
    else {
      return (
      <div className = "allStyles">
      <Headers/>
    <div className = "stylesBox">
      <div className = "filterBox">
          <Menu style = {{paddingLeft: "1vw", paddingRight: "1vw", paddingTop: "1vh"}} theme="light" defaultSelectedKeys={['1']} mode="inline">

          <SubMenu style = {{fontWeight: "600", fontSize: "2.8vh", border: "solid 2px grey", marginBottom: "1vh"}} title="Brands">
            <Grommet>
                <Box>
                { this.state.allBrands && this.state.allBrands.map(item => <CheckBox toggle = {true} reverse = {false} className = "filterLabels" label={this.amountProducts("brand", item)} onChange={(event) => this.toggleBrands(item, event.target.checked)}/>)}
                </Box>
              </Grommet>
            </SubMenu>

            <SubMenu style = {{fontWeight: "600", fontSize: "2.8vh", border: "solid 2px grey", marginBottom: "1vh"}} key="sub4" title="Articles">
            <Grommet>
                <Box>
                { this.state.allArticles && this.state.allArticles.map(item => <CheckBox toggle = {true} reverse = {false} className = "filterLabels" label = {this.amountProducts("article", item)} onChange={(event) => this.toggleArticles(item, event.target.checked)}/>)}
                </Box>
              </Grommet>
            </SubMenu>

            <SubMenu style = {{fontWeight: "600", fontSize: "2.8vh", border: "solid 2px grey", marginBottom: "1vh"}} title="Conditions">
                <Grommet>
                    <Box>
                      <CheckBox toggle = {true} reverse = {false} className = "filterLabels" label = 'Used' onChange={(event) => this.toggleConditions('Used', event.target.checked)}/>
                      <CheckBox toggle = {true} reverse = {false} className = "filterLabels" label = 'New' onChange={(event) => this.toggleConditions('New', event.target.checked)}/>
                    </Box>
                  </Grommet>
                </SubMenu>
            
          </Menu>
    </div>
      <div className = "rightBox">
        <Menu style = {{height: "1px", width: "1px", padding: "1px", marginTop: "10px", marginLeft: "708px"}} theme="light" defaultSelectedKeys={['1']} mode="inline">
          <SubMenu size = "small" style = {{padding: "1px", height: "50px", position: "absolute", width: "200px", fontWeight: "600", fontSize: "15px", border: "solid 1px grey"}} title="Sort By">
            <Grommet>
             <Box>
              <button className = "filterLabels" onClick = {() => this.sortBy("b+")}>Sort by brands <SortDescendingOutlined style = {{fontSize: "3vh"}}/></button>
              <button className = "filterLabels" onClick = {() => this.sortBy("b-")}>Sort by brands <SortAscendingOutlined style = {{fontSize: "3vh"}}/></button>
              <button className = "filterLabels" onClick = {() => this.sortBy("m+")}>Sort by names <SortDescendingOutlined style = {{fontSize: "3vh"}}/></button>
              <button className = "filterLabels" onClick = {() => this.sortBy("m-")}>Sort by names <SortAscendingOutlined style = {{fontSize: "3vh"}}/></button>
            </Box>
            </Grommet>
            </SubMenu>
            </Menu>
            <div style = {{marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>
            <Spin style = {{marginTop: "50px", marginLeft: "auto", marginRight: "auto", textAlign: "center"}} size = "large"/>
            <br/>
            <br/>
            <h4 className = "errorMSG">No data retrieved, please change the filters or refresh the page.</h4>
            <h4 className = "errorMSG">If this persists, there may be a problem with the server.</h4>
            </div>
        </div>
      </div>
    </div>
      );
    }
  }
}
export default Styles

ReactDOM.render(<Styles />, document.querySelector("#root"));

/*
                                    <Pagination
            activePage={this.state.page}
            onPageChange={this.handlePaginationChange}
            totalPages={this.state.totalPages}
            color="red"
          />

          <Icon size = "large" aria-label = "Filter" name='angle double right'/>



<div className = "paging">
                    <ul className = "pgingBox">
                    <button value = "prev" className = "checkBrands" onClick = {e => this.handlePaginationChangePN(e)}>prev</button> 
                    { this.state.allPages && this.state.allPages.map(item => <button onClick = {() => this.handlePaginationChange(item)}  className = "checkBrands" >{item}</button> )}
                    <button value = "next" className = "checkBrands" onClick = {e => this.handlePaginationChangePN(e)}>next</button> 
                    </ul>
                  <h1 style = {{fontSize: "15px", marginLeft: "45px", textAlign: "center"}}>Current page: {this.state.page}</h1>
              </div>
          */