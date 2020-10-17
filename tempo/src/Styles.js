import React from 'react'
import ReactDOM from 'react-dom'
import Headers from './Header'
import './App.css';
import 'antd/dist/antd.css';
import 'semantic-ui-css/semantic.min.css'
import { Menu, Drawer, Space} from 'antd';
import { Pagination } from 'semantic-ui-react'
import { Grommet, Box, Button} from 'grommet';

const { SubMenu } = Menu;

class Styles extends React.Component {
  constructor(props) {
    super(props);
    this.state = [
                {sBrand:"Any"},
                {sModel:"Any"},
                {sColor:"Any"},
                {sArticle:"Any"},
                {allBrands: []},
                {allModels: []},
                {allColors: []}, 
                {allArticles: []},
                {allImages: []},
                {allItems: []},
                {displayItems: []},
                {page: "1"},
                {totalPages: 0},
                {collapsed: false},
                {loaded: false},
                {visible: false},
                {placement: 'left'},
                ];
                this.toggleBrands = this.toggleBrands.bind(this)
                this.addAll = this.addAll.bind(this)
                this.toggleModels = this.toggleModels.bind(this)
                this.refillFilter = this.refillFilter.bind(this)
                this.updateHandler = this.updateHandler.bind(this)
                this.paginate = this.paginate.bind(this)
                this.handlePaginationChange = this.handlePaginationChange.bind(this)
                this.setPage = this.setPage.bind(this)
  };

  setPage(){
    this.setState({
      displayItems: this.state.allItems[this.state.page]
    })
  }

  updateHandler() {
    console.log("s", this.state.page, this.state.sBrand, this.state.sModel, this.state.sColor, this.state.sArticle)
    fetch(`http://35.170.149.7:9000/brand=${this.state.sBrand}&model=${this.state.sModel}&color=${this.state.sColor}&article=${this.state.sArticle}?page=${this.state.page}&limit=6`)
      .then(res => res.json())
      .then(
        (result) => {
          if (result){
          this.setState({
            displayItems: result.results[this.state.page],
            totalPages: result.totalPages,
            allBrands: result.allBrands,
            allModels: result.allModels,
            allColors: result.allColors,
            allArticles: result.allArticles,
          }, () => (console.log("B", result.totalPages)))}},
        (error) => {
          this.setState({
            items: [],
            error
          });
        }
      )
  }

  refillFilter (category, value) {
    if (category === "brand"){
      this.setState({sBrand: value})
    }
    if (category === "model"){
      this.setState({sModel: value})
    }
    if (category === "color"){
      this.setState({sColor: value})
    }
    if (category === "article"){
      this.setState({sArticle: value})
    }
    this.setState({}, () => {
      if (this.state.sBrand === undefined){
        this.setState({sBrand: "Any"})
      }
      if (this.state.sModel === undefined){
        this.setState({sModel: "Any"})
      }
      if (this.state.sColor === undefined){
        this.setState({sColor: "Any"})
      }
      if (this.state.sArticle === undefined){
        this.setState({sArticle: "Any"})
      }
      console.log("above updateHandler")
      this.setState({}, () => this.updateHandler())
    })
  }

  //Populates allItems
  addAll() {
    fetch(`http://35.170.149.7:9000/brand=Any&model=Any&color=Any&article=Any?page=${this.state.page}&limit=6`)
        .then(res => res.json())
          .then(
            (result) => {
              console.log(result)
              this.setState({
                allItems: result.results,
                displayItems: result.results[this.state.page],
                totalPages: result.totalPages,
                allBrands: result.allBrands,
                allModels: result.allModels,
                allColors: result.allColors,
                allArticles: result.allArticles,
                sBrand: "Any",
                sModel: "Any",
                sColor: "Any",
                sArticle: "Any",
              }, () => (console.log("RE", this.state.totalPages), this.updateHandler(), this.setState({loaded: true})));
            },
            (error) => {
              this.setState({
                error
              });
            }
          )
  }

  componentDidMount () {
    console.log("Mounted!")
    this.setState({
      page: "1",
    }, () => this.addAll())
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

  toggleBrands (value) {
    if (value !== undefined){
      this.state.allBrands[value] = !this.state.allBrands[value]
    }
    this.refillFilter("brand", value)
  }
  toggleModels (value) {
    if (value !== undefined){
      this.state.allModels[value] = !this.state.allModels[value]
    }
    this.refillFilter("model", value)
  }
  toggleColors (value) {
    if (value !== undefined){
      this.state.allColors[value] = !this.state.allColors[value]
    }
    this.refillFilter("color", value)
  }
  toggleArticles (value) {
    if (value !== undefined){
      this.state.allArticles[value] = !this.state.allArticles[value]
    }
    this.refillFilter("article", value)
  }

  paginate (e) {
    if (e !== this.state.page){
      this.setState ({
        page: e
      }, () => {
        console.log(e, this.state.page)
        this.updateHandler()
      });
    }
  }
  handlePaginationChange = (e, { activePage }) => this.setState({ page: activePage }, () => (console.log(this.state.page), this.setPage()))

  render() {
    const { placement, visible } = this.state;
    if (this.state.loaded){
      return (
        <div>
          <Headers/>
          <div>
          <Space>
            <button className = "filterBTN" onClick={this.showDrawer}></button>
          </Space>
          <Drawer
            title="Filter by:"
            placement="left"
            closable={false}
            onClose={this.onClose}
            visible={visible}
            key={placement}
          >
              <Menu style = {{paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px"}} theme="light" defaultSelectedKeys={['1']} mode="inline">
                
                <SubMenu style = {{fontWeight: "600", fontSize: "20px", border: "solid 1px grey", marginBottom: "5px"}} title="Brands">
                <Grommet>
                    <Box>
                    {/* <CheckBox toggle = "true" className = "checkBrands" label="Any" onClick={() => this.toggleBrands("Any")}/> */}
                    { this.state.allBrands && this.state.allBrands.map(item => <Button style = {{border: "solid 1px #DCD3F6", marginTop: "5px", borderRadius: "1px"}} size = "small" fill = "true" className = "checkBrands" label={item} onClick={() => this.toggleBrands(item)}/> )}
                    </Box>
                  </Grommet>
                </SubMenu>
  
                <SubMenu style = {{fontWeight: "600", fontSize: "20px", border: "solid 1px grey", marginBottom: "5px"}} title="Models">
                <Grommet>
                    <Box>
                    {/* <CheckBox checked = "true" className = "checkModels" label="Any" onClick={() => this.toggleModels("Any")}/> */}
                    { this.state.allModels && this.state.allModels.map(item => <Button style = {{border: "solid 1px #DCD3F6", marginTop: "5px", borderRadius: "1px"}} size = "small" fill = "true" className = "checkBrands" label={item} onClick={() => this.toggleModels(item)}/> )}
                    </Box>
                  </Grommet>
                </SubMenu>
  
                <SubMenu style = {{fontWeight: "600", fontSize: "20px", border: "solid 1px grey", marginBottom: "5px"}} key="sub3" title="Colors">
                <Grommet>
                    <Box>
                    {/* <CheckBox checked = "true" className = "checkColors" label="Any" onClick={() => this.toggleColors("Any")}/> */}
                    { this.state.allColors && this.state.allColors.map(item => <Button style = {{border: "solid 1px #DCD3F6", marginTop: "5px", borderRadius: "1px"}} size = "small" fill = "true" className = "checkBrands" label={item} onClick={() => this.toggleColors(item)}/> )}
                    </Box>
                  </Grommet>
                </SubMenu>
  
                <SubMenu style = {{fontWeight: "600", fontSize: "20px", border: "solid 1px grey", marginBottom: "5px"}} key="sub4" title="Articles">
                <Grommet>
                    <Box>
                    {/* <CheckBox checked = "true" className = "checkArticles" label="Any" onClick={() => this.toggleArticles("Any")}/>*/}
                    { this.state.allArticles && this.state.allArticles.map(item => <Button style = {{border: "solid 1px #DCD3F6", marginTop: "5px", borderRadius: "1px"}} size = "small" fill = "true" className = "checkBrands" label={item} onClick={() => this.toggleArticles(item)}/> )}
                    </Box>
                  </Grommet>
                </SubMenu>
              </Menu>
          </Drawer>
        </div>
          <div className="listBox">
                        {this.state.displayItems.map((clothes, index) => (
                        <div key={index} className = "bundles" color = "white">                  
                          <Box border= "true" alignContent = "center" className = "bundles_1" background="white">
                            <img className = "imageTitle" src = {clothes.image}></img>
                              <h1 className = "brandTitle">{clothes.brand}</h1>
                              <h1 className = "modelTitle">{clothes.model}</h1>
                              <h1 className = "colorTitle">{clothes.color}</h1>
                          </Box>
                        </div>
                  ))}
            </div>
          <div className = "paging">
          <Pagination
            activePage={this.state.page}
            onPageChange={this.handlePaginationChange}
            totalPages={this.state.totalPages}
            color="red"
          />
          </div>
        </div>  
      );
    }
    else {
      return (
        <div>Loading</div>
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