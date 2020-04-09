import React,{ useState, useEffect } from "react";
import {Link,Redirect,withRouter} from "react-router-dom";

import '../../App.css';
import {render} from "react-dom";
import auth from "./auth";
import KeyComponent from "../KeyComponent";
import Axios from "axios";

class ProfileComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            item: [],
            keysData: [],
            password:"",
            username:"",
            url:`/api/users/`,
            loggedIn:false
        }
    }
    componentDidMount() {
        this.setState({
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password"),

        })

            this.fetchItemById(this.state.url)
    }


    fetchItemById =  async (url) => {
        const fetchItemById =  await fetch(url+`${this.props.location.state.username}`);
        const item = await fetchItemById.json();
        this.setState({
            item:item,
            password:this.props.location.state.password,
            username:this.props.location.state.username,
            keysData:this.props.location.state.keyList
        })
        if (localStorage.getItem("isAuth") === "false") {
            if (item !== null && (this.state.item.password === this.state.password)) {
                this.setState({loggedIn: true})
                this.setState({keysData: item.keyList})
                localStorage.setItem("username", this.state.username)
                localStorage.setItem("password", this.state.password)
                localStorage.setItem("savedProducts",JSON.stringify(item.keyList))
                localStorage.setItem("isAuth", true)
                localStorage.setItem("linkToProfile", true)

                auth.login()
            } else {
                this.setState({loggedIn: false})
                auth.logout()
                localStorage.setItem("username", "")
                localStorage.setItem("password", "")
                localStorage.setItem("isAuth", false)
                localStorage.setItem("linkToProfile", false)

                if (!window.alert("Wrong username or password, please try again."))
                    this.props.history.push({
                        pathname: `/`,
                        state: {
                            username: "",
                            password: ""
                        }
                    })
            }
        }
        this.state.item === null || this.state.password !== this.state.item.password ?
            this.props.onLogIn(false) : this.props.onLogIn(true)
    }

    render() {
        let data = []
        if (localStorage.getItem("isAuth") === "true")
            data = JSON.parse(localStorage.getItem("savedProducts")).map(key => <KeyComponent key={key.name} name={key.name}
                                                                                              size={key.size}
                                                                                              description={key.description}
                                                                                              price={key.price}
                                                                                              onStock={key.onStock}
                                                                                              imageUrl={key.imageUrl}
                                                                                              added={true}/>)

            return (
                localStorage.getItem("isAuth") === "true" ?
                    <div>
                        <div>
                            <div id="profileStyle" className="bg-warning text-white">
                        <span id="profileFont">Hello, <i>{localStorage.getItem("username")}</i>
                            <button id="btnEdit" className="btn btn-danger btn-sm mr-1" onClick={() => {
                                this.props.history.push("/users/editProfile")
                            }}>Edit profile</button></span>
                            </div>
                            <br/>

                            <h3><u><i>Your list of products: </i></u></h3><br/>
                        </div>
                        {this.state.keysData.length < 1 || localStorage.getItem("savedProducts") === '' ? <div>
                            You have not added any products yet.
                            <button onClick={() => {
                                this.props.history.push("/keys")
                            }}>Click here to see available products</button>
                        </div> : data}
                    </div> : null
            )

    }

}
export default withRouter(ProfileComponent)
