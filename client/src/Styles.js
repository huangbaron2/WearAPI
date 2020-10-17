import React from 'react'
import ReactDOM from 'react-dom'
import Headers from './homeHeader'
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Checkbox} from 'antd';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class SiderDemo extends React.Component {

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
                {page: "1"},
                {totalPages: 0},
                {collapsed: false},
                {loaded: false}
                ];
                this.addAll = this.addAll.bind(this)
                this.categoryAll = this.categoryAll.bind(this)
  };

  categoryAll() {
    this.setState({allBrands: ["Any"], allModels: ["Any"], allColors: ["Any"], allArticles: ["Any"]}, () => {    
      for (var i of this.state.allItems){
        for (var o of i.brand){
          if (!this.state.allBrands.includes(o)){
            this.state.allBrands.push(o)
          }
        }
        for (var o of i.model){
          if (!this.state.allModels.includes(o)){
            this.state.allModels.push(o)
          }
        }
        for (var o of i.color){
          if (!this.state.allColors.includes(o)){
            this.state.allColors.push(o)
          }
        }
        for (var o of i.article){
          if (!this.state.allArticles.includes(o)){
            this.state.allArticles.push(o)
          }
        }
        this.setState({loaded: true})
    }})
  }

  addAll() {
    fetch("http://35.170.149.7:9000/allDB")
        .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                allItems: result
              }, () => (console.log("DB", this.state.allItems), this.categoryAll()));
            },
            (error) => {
              this.setState({
                error
              });
            }
          )
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  componentDidMount () {
    console.log("Mounted!")
    this.addAll()
    this.setState({
      page: "1",
    })
  }


  render() {
    if (this.state.loaded){
      return (
        <div>
        <Layout  style={{ minHeight: '100vh' }}>
          <Sider style={{overflow: 'auto',height: '100vh',left: 0,}} width = "150px" theme = "dark" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu  theme="dark" defaultSelectedKeys={['1']} mode="inline">
  
              <SubMenu key="sub1" icon={<UserOutlined />} title="Brands">
                  { this.state.allBrands && this.state.allBrands.map(item => <div ><Checkbox defaultChecked = "true" style = {{color: "white", marginBottom: "3px", textAlign: "right", border: "solid 2px red", paddingTop: "2px", paddingBottom: "2px"}}>{item}</Checkbox></div>)}
              </SubMenu>
              <SubMenu key="sub2" icon={<UserOutlined />} title="Models">
                  { this.state.allModels && this.state.allModels.map(item => <Menu.Item >{item}</Menu.Item> )}
              </SubMenu>
              <SubMenu key="sub3" icon={<UserOutlined />} title="Colors">
                  { this.state.allColors && this.state.allColors.map(item => <Menu.Item >{item}</Menu.Item> )}
              </SubMenu>
              <SubMenu key="sub4" icon={<UserOutlined />} title="Articles">
                  { this.state.allArticles && this.state.allArticles.map(item => <Menu.Item >{item}</Menu.Item> )}
              </SubMenu>
            </Menu>
          </Sider>
          <div>
          <Headers/>
          <br/>
          <div className="listBox">
                      {this.state.allItems.map((clothes, index) => (
                      <div key={index} className = "bundles">
                          <img className = "imageTitle" src = {clothes.image}></img>
                          <h3 className = "brandTitle">{clothes.brand}</h3>
                          <p className = "modelTitle">{clothes.model}</p>
                          <p className = "colorTitle">{clothes.color}</p>
                      </div>
                      ))}
                </div>
          </div>
        </Layout>
        </div>
      );
    }
    else {
      return (
        <div><h1>Loading</h1></div>
      );
    }
  }
}

ReactDOM.render(<SiderDemo />, document.querySelector("#root"));