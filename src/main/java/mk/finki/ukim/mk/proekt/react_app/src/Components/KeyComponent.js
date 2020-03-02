import React from "react";

import {Link} from "react-router-dom";

import '../App.css';

class KeyComponent extends React.Component{
    render() {
        return(
            <div>
                <div className="cardStyle" key={this.props.name}><Link to={`/keys/${this.props.name}`}>
                    <div className="card text-white bg-light mb-3" styles="max-width: 10rem;">
                        <div className="card-header">Name: {this.props.name}</div>
                        <div className="card-body">

                            <h4 className="card-title">{this.props.onStock ? <h3 style={{color : 'green', float: 'right'}}>On Stock</h3> : <h3 style={{color : 'red',float: 'right'}}>On Stock</h3>}</h4>
                            <img src={this.props.imageUrl} className="keyImage" alt=""/>
                            <h4 className="card-title">Size: {this.props.size}</h4>
                            <h4 className="card-title">Description: {this.props.description}</h4>
                            <h4 className="card-title">Price: {this.props.price}</h4>
                        </div>
                    </div></Link>
                </div>
            </div>
        )
    }

}
export default KeyComponent