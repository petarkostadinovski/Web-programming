import React,{ useState, useEffect } from "react";
import {Link,Redirect,withRouter} from "react-router-dom";

import '../../App.css';
import {render} from "react-dom";
import auth from "./auth";
import KeyComponent from "../KeyComponent";
import Axios from "axios";
import car_keys_image from "../../images/car_keys_image.jfif";
import car_keychains_image from "../../images/car_keychains_image.jpg";

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
        let fetchItemById
        console.log(this.props.location.state.username)
        if (localStorage.getItem("isAuth" === "true"))
            fetchItemById =  await fetch(url+`${localStorage.getItem("username")}`);
        else
            fetchItemById =  await fetch(url+`${this.props.location.state.username}`);

        const item = await fetchItemById.json();
        console.log("ITEMMMMMMMMMMM")
        console.log(item)
        if (item === null){
            if (!window.alert("Wrong username or password, please try again."))
                this.props.history.push("/")
        }else {


            if (localStorage.getItem("isAuth" === "true"))
                this.setState({keysData: JSON.parse(localStorage.getItem("savedProducts"))})
            else
                this.setState({keysData: item.keyList})

            this.setState({
                item: item,
                password: this.props.location.state.password,
                username: this.props.location.state.username,
            })
            if (localStorage.getItem("isAuth") === "false") {
                if (item !== null && (this.state.item.password === this.state.password)) {
                    this.setState({loggedIn: true})
                    this.setState({keysData: item.keyList})
                    localStorage.setItem("username", this.state.username)
                    localStorage.setItem("password", this.state.password)
                    localStorage.setItem("savedProducts", JSON.stringify(item.keyList))
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
    }

    render() {
        let data = []
        if (localStorage.getItem("isAuth") === "true")
            data =  this.state.keysData.map(key => <KeyComponent key={key.name} name={key.name}
                                                                                              size={key.size}
                                                                                              description={key.description}
                                                                                              price={key.price}
                                                                                              onStock={key.onStock}
                                                                                              imageUrl={key.imageUrl}
                                                                                              added={true}/>)

            return (
                <div>
                    {localStorage.getItem("loggedOut") === "true" ?
                        this.props.history.push("/") : null
                    }
                    {localStorage.getItem("isAuth") === "true" ?
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
                            You have not added any products yet.<br/>
                            <b>Navigate to certain products from the right navigation bar</b>
                            <div className="rightSidebar">
                                <table style={{"border" : "3px solid lightblue","border-collapse" : "collapse"}}>
                                    <th><span style={{"color":"black","position":"relative","float":"left","fontSize":"20px"}}>Keys</span></th><tr><Link to="/keys"><img src={car_keys_image} className="car_keys_side"/></Link></tr>
                                    <th><span style={{"color":"black","position":"relative","float":"left","fontSize":"20px"}}>Key chains</span></th><tr><Link to="/keychains"><img src={car_keychains_image} style={{"position":"relative"}} className="car_keychains_image_side"/></Link></tr>
                                </table>
                            </div>
                        </div> : <div>
                            <div className="rightSidebar">
                                <table style={{"border" : "3px solid lightblue","border-collapse" : "collapse"}}>
                                    <th><span style={{"color":"black","position":"relative","float":"left","fontSize":"20px"}}>Keys</span></th><tr><Link to="/keys"><img src={car_keys_image} className="car_keys_side"/></Link></tr>
                                    <th><span style={{"color":"black","position":"relative","float":"left","fontSize":"20px"}}>Key chains</span></th><tr><Link to="/keychains"><img src={car_keychains_image} style={{"position":"relative"}} className="car_keychains_image_side"/></Link></tr>
                                </table>
                            </div><div>{data}</div>
                        </div>}
                    </div> : null}
                </div>
            )

    }

}
export default withRouter(ProfileComponent)
