import React,{ useState, useEffect } from "react";
import {Link,Redirect} from "react-router-dom";

import '../App.css';
import {render} from "react-dom";

class ProfileComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            item: [],
            password:"",
            url:`/api/users/`,
            loggedIn:false
        }
    }

    componentDidMount() {
        this.fetchItemById(this.state.url);
        console.log("state is")
        console.log(this.state)
    }

    fetchItemById =  async (url) => {
        const fetchItemById = await fetch(url+`${this.props.match.params.username}`);
        console.log(url+`${this.props.match.params.username}`)
        const item = await fetchItemById.json();
        this.setState({item:item})
        if (!this.state.loggedIn)
            this.setState({password:this.props.location.state.password})
        console.log(item)
        console.log("asdasdasdapasvord")
        console.log(this.state.password)
        console.log(this.state.item.password)
        if (this.state.item.password === this.state.password)
            this.setState({loggedIn:true})

        this.state.item === null || this.state.password !== this.state.item.password ?
            this.props.onLogIn(false) : this.props.onLogIn(true)
    }

    render(){

        return(

        (this.state.item === null || this.state.password !== this.state.item.password) ?
             (
                    <div>wrong</div>
                )
            :
                <div>
                    Welcome <br/>
                    {this.state.item.username}<br/>
                    {this.state.item.password}
                </div>

        )}

}
export default ProfileComponent
