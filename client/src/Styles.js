import React from 'react'
import ReactDOM from 'react-dom'
import Headers from './Header'
import './App.css';
import 'antd/dist/antd.css';
import { DoubleRightOutlined, LoadingOutlined , SortAscendingOutlined , SortDescendingOutlined } from '@ant-design/icons'
import { Menu, Drawer } from 'antd';
import { Grommet, Box, CheckBox} from 'grommet';


const { SubMenu } = Menu;

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
    this.state = [
                {sBrand: []},
                {sModel: []},
                {sColor: []},
                {sArticle: []},
                {allBrands: []},
                {allModels: []},
                {allColors: []}, 
                {allArticles: []},
                {allImages: []},
                {allItems: []},
                {allPages: []},
                {adItems: []},
                {displayItems: []},
                {displayBrands: []},
                {displayModels: []},
                {displayColors: []}, 
                {displayArticles: []},
                {page: "1"},
                {totalPages: 0},
                {collapsed: false},
                {loaded: false},
                {visible: false},
                {placement: 'left'},
                {open: true}

                ];
                this.toggleBrands = this.toggleBrands.bind(this)
                this.toggleModels = this.toggleModels.bind(this)
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
    var payLoad = [{
      brand: this.state.sBrand,
      model: this.state.sModel, 
      color: this.state.sColor, 
      article: this.state.sArticle
    }]
    console.log("payLoad", payLoad)
    //35.170.149.7:9000
    fetch('http://35.170.149.7:9000/toggle?page=1&limit=6', {
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
          console.log("POST", result)
          this.setState({
              allItems: result.allItems,
              allPages: result.pageList,
              displayItems: result.results[String(this.state.page)],
              displayBrands: result.displayBrands,
              displayModels: result.displayModels,
              displayColors: result.displayColors,
              displayArticles: result.displayArticles,
              adItems: result.adItems,
              allBrands: result.allBrands,
              allModels: result.allModels,
              allColors: result.allColors,
              allArticles: result.allArticles,
              totalPages: result.totalPages
          }, () => (this.setState({loaded: true})))
        })
  }

  refillFilter (category, value, e) {
    if (category === "brand"){
      if (e){
        this.state.sBrand.push(value)
        console.log("true", this.state.sBrand)
        this.setState({sBrand: this.state.sBrand}, () => (this.postToggle()))
      }
      else if (!e){
        const index = this.state.sBrand.indexOf(value);
        this.state.sBrand.splice(index, 1)
        console.log("false", this.state.sBrand)
        this.setState({sBrand: this.state.sBrand}, () => (this.postToggle()))
      }
    }
    if (category === "model"){
      if (e){
        this.state.sModel.push(value)
        this.setState({sModel: this.state.sModel}, () => (this.postToggle()))
      }
      else if (!e){
        const index = this.state.sModels.indexOf(value);
        this.state.sModels.splice(index, 1)
      }
    }
    if (category === "color"){
      if (e){
        this.state.sColor.push(value)
        this.setState({sColor: this.state.sColor}, () => (this.postToggle()))
      }
      else if (!e){
        const index = this.state.sColors.indexOf(value);
        this.state.sColors.splice(index, 1)
        console.log("allColors", this.state.sColors)
      }
    }
    if (category === "article"){
      if (e){
        this.state.sArticle.push(value)
        this.setState({sArticle: this.state.sArticle}, () => (this.postToggle()))
      }
      else if (!e){
        const index = this.state.sArticles.indexOf(value);
        this.state.sArticles.splice(index, 1)
      }
    }
  }

  componentDidMount () {
    console.log("Mounted!")
    this.setState({
      sBrand: [],
      sModel: [],
      sColor: [],
      sArticle: [],
      allBrands: [],
      allModels: [],
      allColors: [], 
      allArticles: [],
      allImages: [],
      allItems: [],
      allPages: [],
      adItems: [],
      displayItems: [],
      displayBrands: [],
      displayModels: [],
      displayColors: [], 
      displayArticles: [],
      page: 1,
      totalPages: 0,
    }, () => this.postToggle())
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = e => {
    this.setState({
      placement: e.target.value,
    });
  };

  toggleBrands (value, event) {
    this.refillFilter("brand", value, event)
  }
  toggleModels (value, event) {
    this.refillFilter("model", value, event)
  }
  toggleColors (value, event) {
    this.refillFilter("color", value, event)
  }
  toggleArticles (value, event) {
    this.refillFilter("article", value, event)
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
  
  displayPage() {
    console.log("DISPLAY", this.state.displayItems)
    if (this.state.displayItems.length > 0){
      return (<div className="listBox">
                        {this.state.displayItems.map((clothes, index) => (
                        <div key={index} className = "bundles" color = "white">                  
                                  <img className = "imageTitle" src = {clothes.image}></img>
                                  <h1 className = "brandTitle">{clothes.brand}</h1>
                                  <h1 className = "modelTitle">{clothes.model}</h1>
                                  <h1 className = "colorTitle">{clothes.color}</h1>
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
      for (var i of this.state.allItems){
        if (i.brand.includes(item)){
          amount += 1
        }
      }
    }
    if (category == "model") {
      for (var i of this.state.allItems){
        if (i.model.includes(item)){
          amount += 1
        }
      }
    }
    if (category == "color") {
      for (var i of this.state.allItems){
        if (i.color.includes(item)){
          amount += 1
        }
      }
    }
    if (category == "article") {
      for (var i of this.state.allItems){
        if (i.article.includes(item)){
          amount += 1
        }
      }
    }
    return (item + "  " + "(" + amount + ")")
  }

  sortBy(value){
    console.log(this.state.allItems)
    var newItem = {}
    if (value == "b+"){
      newItem = this.state.allItems.sort((a, b) => (a.brand < b.brand) ? 1 : -1)
    }
    else if (value == "b-"){
      newItem = this.state.allItems.sort((a, b) => (a.brand > b.brand) ? 1 : -1)
    }
    else if (value == "m+"){
      newItem = this.state.allItems.sort((a, b) => (a.model< b.model) ? 1 : -1)
    }
    else if (value == "m-"){
      newItem = this.state.allItems.sort((a, b) => (a.model > b.model) ? 1 : -1)
    }
    this.setState({allItems: newItem}, () => {
    var sortedADItems = []
    const limit = 6
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
    if (this.state.loaded && this.state.allItems != undefined && this.state.page != undefined){
      return (
        <div className = "allStyles">
          <Headers/>
          <div className = "BGC">

            <button className = "filterBTN" onClick={this.showDrawer}> <DoubleRightOutlined className = "DRO" style={{ marginLeft: "6px", fontSize: '30px', color: 'grey' }} /></button>

          <Drawer
            width = "18vw"
            title="Filter by:"
            placement="left"
            closable={false}
            onClose={this.onClose}
            visible={visible}
            key={placement}
          >
              <Menu style = {{paddingLeft: "1vw", paddingRight: "1vw", paddingTop: "1vh"}} theme="light" defaultSelectedKeys={['1']} mode="inline">

              <SubMenu style = {{fontWeight: "600", fontSize: "2.8vh", border: "solid 2px grey", marginBottom: "1vh"}} title="Sort By">
              <Grommet>
                <Box>
                  <button className = "filterLabels" onClick = {() => this.sortBy("b+")}>Sort by brands <SortDescendingOutlined style = {{fontSize: "3vh"}}/></button>
                  <button className = "filterLabels" onClick = {() => this.sortBy("b-")}>Sort by brands <SortAscendingOutlined style = {{fontSize: "3vh"}}/></button>
                  <button className = "filterLabels" onClick = {() => this.sortBy("m+")}>Sort by models <SortDescendingOutlined style = {{fontSize: "3vh"}}/></button>
                  <button className = "filterLabels" onClick = {() => this.sortBy("m-")}>Sort by models <SortAscendingOutlined style = {{fontSize: "3vh"}}/></button>
                </Box>
                </Grommet>
                </SubMenu>
                
              <SubMenu style = {{fontWeight: "600", fontSize: "2.8vh", border: "solid 2px grey", marginBottom: "1vh"}} title="Brands">
                <Grommet>
                    <Box>
                    { this.state.allBrands && this.state.allBrands.map(item => <CheckBox toggle = {true} reverse = {false} className = "filterLabels" label={this.amountProducts("brand", item)} onChange={(event) => this.toggleBrands(item, event.target.checked)}/>)}
                    </Box>
                  </Grommet>
                </SubMenu>
  
                <SubMenu style = {{fontWeight: "600", fontSize: "2.8vh", border: "solid 2px grey", marginBottom: "1vh"}} title="Models">
                <Grommet>
                    <Box>
                    { this.state.allModels && this.state.allModels.map(item => <CheckBox toggle = {true} reverse = {false} className = "filterLabels" label={this.amountProducts("model", item)} onChange={(event) => this.toggleModels(item, event.target.checked)}/>)}
                    </Box>
                  </Grommet>
                </SubMenu>
  
                <SubMenu style = {{fontWeight: "600", fontSize: "2.8vh", border: "solid 2px grey", marginBottom: "1vh"}} key="sub3" title="Colors">
                <Grommet>
                    <Box>
                    { this.state.allColors && this.state.allColors.map(item => <CheckBox toggle = {true} reverse = {false} className = "filterLabels" label={this.amountProducts("color", item)} onChange={(event) => this.toggleColors(item, event.target.checked)}/>)}
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
              </Menu>
          </Drawer> 
        </div>
        {this.displayPage()}
            <div className = "paging">
              
              <div className = "pgingEverything">
              <ul className = "pgingBox">
              <button value = "prev" className = "checkBrands" onClick = {e => this.handlePaginationChangePN(e)}>prev</button> 
              { this.state.allPages && this.state.allPages.map(item => <button onClick = {() => this.handlePaginationChange(item)}  className = "checkBrands" >{item}</button> )}
              <button value = "next" className = "checkBrands" onClick = {e => this.handlePaginationChangePN(e)}>next</button> 
              </ul>
              <h1 style = {{fontSize: "15px", marginLeft: "45px", textAlign: "center"}}>Current page: {this.state.page}</h1>
              </div>

            
          </div>
            </div>
      );
    }
    else {
      return (
        <div><LoadingOutlined /></div>
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
          */