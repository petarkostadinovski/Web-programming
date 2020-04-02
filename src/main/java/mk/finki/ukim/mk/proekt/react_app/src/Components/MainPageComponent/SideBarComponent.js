import React from "react";
import {Link} from 'react-router-dom'
import {BrowserRouter as Router, Redirect, Route,Switch} from 'react-router-dom'
import $ from 'jquery'
import "../../App.css"
import App from "../../App";
import KeyService from "../../Repository/axiosKeyRepository";
import FilterCarsComponent from "../FilterComponent/FilterCarsComponent";

class SideBarComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            product: "products",
            filterCarsModal: false,
            searchValue: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const {name,value} = event.target;
        this.setState({
            [name]:value
        })
    }

    toggleFilterCarsModal = () => {
        this.setState(prevState=>{
            return{
                filterCarsModal: !prevState.filterCarsModal
            }
        });
        //console.log("filterCarsModal = " + this.state.filterCarsModal)
    };
    setModalToFalse = () => {
        this.setState({
            filterCarsModal: false
        })
    };
    
    render() {

        $(".btn").click(function(){
                $(".aaa").animate({right: '10px'},400);
        });
        return (
            <div className="container-fluid">
                <div className="row">
                    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                        <div className="sidebar-sticky">
                            <ul className="nav flex-column">
                                <Link to={this.state.product}><li>
                                    <select className="browser-default custom-select"
                                            value={this.state.product}
                                            onChange={this.handleChange}
                                            name="product"
                                    >
                                        <option selected>Products</option>
                                        <option value="/keys">Keys</option>
                                        <option value="/keyrings">Keyrings</option>
                                    </select>
                                </li></Link>

                            </ul>
                        </div>
                    </nav>

                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                        <div
                            className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                            <h1 className="h2"></h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div>
                                    <button className="btn btn-info" type="submit" onClick={this.toggleFilterCarsModal}>Filter Cars</button>
                                    <div className="btn-group mr-2">
                                        <input className="form-control mr-sm-2 " name="searchValue" type="text" placeholder="Search" onChange={this.handleChange}
                                               aria-label="Search"/>
                                    </div>
                                    <button type="button" className="btn btn-secondary" name="searchValue" onClick={this.searchKey}>Search</button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

                <div className="aaa" id="aa">
                    <FilterCarsComponent showModal={this.state.filterCarsModal} rendered="rendered"/>
                </div>
            </div>
        )
    }
}

export default SideBarComponent