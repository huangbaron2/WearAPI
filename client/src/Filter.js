import React, { Component } from 'react'
import {Dropdown, Button, DropdownButton} from 'react-bootstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pagination } from './Pagination';


export class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = [
                    {brand:"Any"},
                    {model:"Any"},
                    {color:"Any"},
                    {article:"Any"},
                    {items: []},
                    {brandAll: []},
                    {modelAll: []},
                    {colorAll: []},
                    {articleAll: []},
                    {imageAll: []},
                    {allDB: []},
                    {page: "1"},
                    {totalPages: 0},
                    {paging: "Any"}
                    ];
        this.handleBrand = this.handleBrand.bind(this)
        this.handleColor = this.handleColor.bind(this)
        this.handleModel = this.handleModel.bind(this)
        this.handleArticle = this.handleArticle.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateArrays = this.updateArrays.bind(this);
        this.paginate = this.paginate.bind(this);
        this.isColor = this.isColor.bind(this);
        this.updateHandler = this.updateHandler.bind(this);
        this.makeAny = this.makeAny.bind(this);
    };

    insertFront (value) {
      var newL = []
      newL.push("Any")
      for (var i of value){
        if (i !== "Any"){
          newL.push(i)
        }
      }
      return newL
    }

    sortallDB () {
      this.setState({
        brandAll:[],
        colorAll:[],
        modelAll:[],
        articleAll:[],
        imageAll:[]},
        () => {
        for (var i of this.state.allDB){
          for (var o of i.brand){
            this.state.brandAll.push(o)
          }
          for (o of i.model){
            this.state.modelAll.push(o)
          }
          for (o of i.color){
            this.state.colorAll.push(o)
          }
          for (o of i.article){
            this.state.articleAll.push(o)
          }
          for (o of i.image){
            this.state.imageAll.push(o)
          }
          this.setState({
            brandAll: this.insertFront(Array.from(new Set(this.state.brandAll)).sort()),
            modelAll: this.insertFront(Array.from(new Set(this.state.modelAll)).sort()),
            colorAll: this.insertFront(Array.from(new Set(this.state.colorAll)).sort()),
            articleAll: this.insertFront(Array.from(new Set(this.state.articleAll)).sort()),
          }, () => {
          })
      }
    })
  
    }

    resultArray (value) {
      var listing = []
      for (var i of value){
        listing.push(i)
      }
      return listing
    }

    handleSubmit(event) {
      event.preventDefault();
      this.makeAny();
      fetch(`http://54.90.119.121:9000/brand=${this.state.brand}&model=${this.state.model}&color=${this.state.color}&article=${this.state.article}&?page=${String(this.state.page)}&limit=8`)
      //http://54.90.119.121:9000/brand=Any&model=Any&color=Any&article=Any
      //localhost:9000/brand=Any&model=Any&color=Any&article=Any&?page=1&limit=5
        .then(res => res.json())
        .then(
          (result) => {
            if (result !== "NO"){
              this.setState({
                items: result.results,
                totalPages: result.totalPages
              },
            this.doPageArray)}},
          (error) => {
            this.setState({
              items: [],
              error
            });
          }
        )
    }

    makeAny() {
      if (this.state.brand === undefined){
        this.setState({brand: "Any"})
      }
      if (this.state.model === undefined){
        this.setState({model: "Any"})
      }
      if (this.state.color === undefined){
        this.setState({color: "Any"})
      }
      if (this.state.article === undefined){
        this.setState({article: "Any"})
      }
    }

    updateHandler() {
      console.log("B", this.state.page)
      fetch(`http://54.90.119.121:9000/brand=${this.state.brand}&model=${this.state.model}&color=${this.state.color}&article=${this.state.article}?page=${String(this.state.page)}&limit=8`)
      //http://54.90.119.121:9000/brand=Nike&model=Any&color=Any&article=Any
        .then(res => res.json())
        .then(
          (result) => {
            if (result !== "NO"){
            this.setState({
              items: result.results,
              totalPages: result.totalPages
            }, this.doPageArray)}},
          (error) => {
            this.setState({
              items: [],
              error
            });
          }
        )
    }

    updateArrays () {
          fetch("http://54.90.119.121:9000/allDB")
        .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                allDB: result
              },
              () => {
                this.sortallDB()
                console.log("DB", this.state.allDB)
              });
            },
            (error) => {
              this.setState({
                error
              });
            }
          )
    }

    componentDidMount () {
        window.addEventListener('load', this.updateArrays, this.updateHandler);
        this.setState({
          page: "1",
        })
    }

    handleBrand(event) {
      this.setState({
        page: "1"
      })
        this.setState({brand: event})
    }

    handleColor(event) {
      this.setState({
        page: "1"
      })
        this.setState({color: event})
    }

    handleModel(event) {
      this.setState({
        page: "1"
      })
        this.setState({model: event})
    }


    handleArticle(event) {
      this.setState({
        page: "1"
      })
        this.setState({article: event})
    }

    handleAll() {
        this.handleBrand("Any");
        this.handleColor("Any");
        this.handleArticle("Any");
        this.handleModel("Any");
    }

    paginate (e) {
      if (e !== this.state.page){
        this.setState ({
          page: e
        }, () => {
          this.updateHandler()
        });
      }
    }

    isColor(e) {
      if (String(e) === this.state.page){
        return "green"
      }
      else{
        return "#9370DB"
      }
    }

    render(){
        if (this.state.items === undefined){
            return (
                <div className = "filterBox">
                <form onSubmit={this.handleSubmit}>
                    <label id = "label">Pick your filters
                        <br/>
                        <div className = "selection">
                        <h4 className = "selectTitle">Brand</h4>
                        <DropdownButton id="dropdown"  title= {this.state.brand}>
                            { this.state.brandAll && this.state.brandAll.map(item => <Dropdown.Item  onClick = {() => this.handleBrand(item)} > {item} <Dropdown.Divider/></Dropdown.Item>  )}
                        </DropdownButton>
                        </div>
                        <div className = "selection">
                        <h4 className = "selectTitle">Model</h4>
                        <DropdownButton id="dropdown" title= {this.state.model}>
                            { this.state.modelAll && this.state.modelAll.map(item => <Dropdown.Item  onClick = {() => this.handleModel(item)}> {item} <Dropdown.Divider/></Dropdown.Item> )}
                        </DropdownButton>
                        </div>
                        <div className = "selection">
                        <h4 className = "selectTitle">Color</h4>
                        <DropdownButton id="dropdown" title= {this.state.color}>
                          { this.state.colorAll && this.state.colorAll.map(item => <Dropdown.Item  onClick = {() => this.handleColor(item)}> {item} <Dropdown.Divider/></Dropdown.Item> )}
                        </DropdownButton>
                        </div>
                        <div className = "selection">
                        <h4 className = "selectTitle">Article</h4>
                        <DropdownButton id="dropdown" title= {this.state.article}>
                          { this.state.articleAll && this.state.articleAll.map(item => <Dropdown.Item  onClick = {() => this.handleArticle(item)}> {item} <Dropdown.Divider/></Dropdown.Item> )}
                        </DropdownButton>
                        </div>           
                    </label>
                    <br/>
                    <Button id = "btnAll" variant="primary" onClick = {() => this.handleAll()}> All </Button>
                    <Button id = "inputButton" as="input" type="submit" value="Submit" />
                </form>
                </div>
            );
        }
        else{
          return(
            <div>                
              <div className = "filterBox">
                <form onSubmit={this.handleSubmit}>
                    <label id = "label">Pick your filters
                    <br/>
                    <div className = "selection">
                    <h4 className = "selectTitle">Brand</h4>
                        <DropdownButton id="dropdown" title= {this.state.brand}>
                            { this.state.brandAll && this.state.brandAll.map(item => <Dropdown.Item  onClick = {() => this.handleBrand(item)}> {item} <Dropdown.Divider/></Dropdown.Item> )}
                        </DropdownButton>
                        </div>
                        <div className = "selection">
                        <h4 className = "selectTitle">Model</h4>
                        <DropdownButton id="dropdown" title= {this.state.model}>
                            { this.state.modelAll && this.state.modelAll.map(item => <Dropdown.Item  onClick = {() => this.handleModel(item)}> {item} <Dropdown.Divider/></Dropdown.Item> )}
                        </DropdownButton>
                        </div>
                        <div className = "selection">
                        <h4 className = "selectTitle">Color</h4>
                        <DropdownButton id="dropdown" title= {this.state.color}>
                          { this.state.colorAll && this.state.colorAll.map(item => <Dropdown.Item  onClick = {() => this.handleColor(item)}> {item} <Dropdown.Divider/></Dropdown.Item> )}
                        </DropdownButton>
                        </div>
                        <div className = "selection">
                        <h4 className = "selectTitle">Article</h4>
                        <DropdownButton id="dropdown" title= {this.state.article}>
                          { this.state.articleAll && this.state.articleAll.map(item => <Dropdown.Item  onClick = {() => this.handleArticle(item)}> {item} <Dropdown.Divider/></Dropdown.Item> )}
                        </DropdownButton>
                        </div>
                    </label>
                    <br/>
                    <Button id = "btnAll" variant="primary" onClick = {() => this.handleAll()}> All </Button>
                    <Button id = "inputButton" as="input" type="submit" value="Submit" />
                </form>
                <div className="listBox">
                    {this.state.items.map((clothes, index) => (
                    <div key={index} className = "bundles">
                        <img className = "imageTitle" src = {clothes.image}></img>
                        <h3 className = "brandTitle">{clothes.brand}</h3>
                        <p className = "modelTitle">{clothes.model}</p>
                        <p className = "colorTitle">{clothes.color}</p>
                    </div>
                    ))}
                </div>
            </div>
            <Pagination totalPages = {this.state.totalPages} paginate = {this.paginate} isColor = {this.isColor}/>
            </div>
          );
        }
    }
}

export default Filter;


