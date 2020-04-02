import React from "react";

import {Link} from "react-router-dom";

import '../App.css';
import ProfileComponent from "./login/ProfileComponent";
import axios from 'axios'

class KeyComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            added: false
        }
    }

    componentDidMount() {
        console.log("PROPSSSSS")
        console.log(this.props)
        if (this.props.added)
            this.setState({added:true})
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
                                    else
                                        this.setState({added:true})

                                }}>Add to your products</button>
                                    : <button type="button" className="btn btn-outline-primary" onClick={() => {
                                        this.setState({added:false})
                                    }}>Remove from your products</button>}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default KeyComponent