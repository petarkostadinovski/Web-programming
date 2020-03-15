import React from "react";

import {Link} from "react-router-dom";

import '../App.css';
import ProfileComponent from "./ProfileComponent";
import axios from 'axios'

class KeyComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        }
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
                                <Link to={{
                                    pathname:`/profile`,
                                    state: {
                                        name: this.props.name,
                                        onStock: this.props.onStock,
                                        imageUrl: this.props.imageUrl,
                                        useData: true
                                    }
                                }}><button type="button" className="btn btn-outline-primary">Add to your products</button></Link></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default KeyComponent