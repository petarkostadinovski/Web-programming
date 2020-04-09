import React from "react";

import {Link, withRouter} from "react-router-dom";

import '../App.css';
import carService from '../Repository/axiosCarRepository'
import qs from "qs";
import Axios from "../custom-axios/axios";

class KeyComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            added: false
        }
    }

    componentDidMount() {
        console.log(this.props)
        if (this.props.added)
            this.setState({added:true})
        this.fetchItem()
    }

    fetchItem = async () => {
        let count = 0;
        if (localStorage.getItem("isAuth") === "true") {
            count = JSON.parse(localStorage.getItem("savedProducts")).filter(key => key.name === this.props.name).length
        }
        if (count !== 0)
            this.setState({
                added:true
            })

    }

    render() {
        return(
            <div>
                <div className="cardStyle" key={this.props.name}>
                    <div className="card text-white bg-light mb-3" styles="max-width: 10rem;">
                        <div className="card-header"><Link to={`/keys/${this.props.name}`}><span className="card-header">Name: {this.props.name}</span></Link></div>
                        <div className="card-body"><Link to={`/keys/${this.props.name}`}>
                            <h4 className="card-title">{this.props.onStock ? <h3 style={{color : 'green', float: 'right'}}>On Stock</h3> : <h3 style={{color : 'red',float: 'right'}}>On Stock</h3>}</h4>
                            <img src={this.props.imageUrl} className="keyImage" alt=""/>
                            <p>Click here for more details...</p></Link>
                            <span className="editAndRemoveBtn">
                                {!this.state.added ?
                                <button type="button" className="btn btn-outline-primary" onClick={() => {
                                    if (localStorage.getItem("isAuth") === "false") {
                                        window.alert("Please log in!")
                                    }
                                    else {
                                        const data = [...new Array(JSON.parse(localStorage.getItem("savedProducts")))];

                                        const keys = {
                                            password:localStorage.getItem("password"),
                                            name: this.props.name,
                                            size: this.props.size,
                                            description: this.props.description,
                                            price: this.props.price,
                                            onStock: this.props.onStock,
                                            imageUrl:this.props.imageUrl
                                        }

                                        const formParams = qs.stringify(keys);
                                        if (window.confirm("Change your informations?")) {
                                            this.setState({added: true})
                                            return Axios.patch(`/api/users/${localStorage.getItem("username")}`, formParams, {
                                                headers: {
                                                    'Content-Type': 'application/x-www-form-urlencoded'
                                                }
                                            })
                                                .then(res => console.log(res))
                                                .catch(err => console.error(err))
                                        }

                                    }
                                }}>Add to your products</button>
                                    : <button type="button" className="btn btn-outline-primary" onClick={() => {
                                        const keys = {
                                            password:localStorage.getItem("password"),
                                            name: this.props.name,
                                            size: this.props.size,
                                            description: this.props.description,
                                            price: this.props.price,
                                            onStock: this.props.onStock,
                                            imageUrl:this.props.imageUrl
                                        }

                                        const formParams = qs.stringify(keys);
                                        if (window.confirm("Change your informations?")) {
                                            this.setState({added:false})
                                            return Axios.patch(`/api/users/${localStorage.getItem("username")}`, formParams, {
                                                headers: {
                                                    'Content-Type': 'application/x-www-form-urlencoded'
                                                }
                                            })
                                                .then(res => console.log(res))
                                                .catch(err => console.error(err))
                                        }
                                    }}>Remove from your products</button>}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default withRouter(KeyComponent)