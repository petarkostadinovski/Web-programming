import React,{ useState, useEffect } from "react";
import {Link,Redirect} from "react-router-dom";

import '../App.css';
import {render} from "react-dom";

class ProfileComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        console.log(this.state)
        this.fetchItemById();
    }

    fetchItemById =  async () => {
        const fetchItemById = await fetch(`/api/users/${this.props.match.params.username}`);
        const item = await fetchItemById.json();

        console.log(item)
    }

    render(){

        return(

                <div>

                </div>

        )}

}
export default ProfileComponent
