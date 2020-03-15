import React from "react";
import {BrowserRouter as Router, Redirect, Route,Switch} from 'react-router-dom'
import "../../App.css"
import keyImg from "../../images/key.png"
import keyStoreLogoImg from "../../images/KeyStoreLogo.png"
import {Link} from "react-router-dom";
import MainPage from "./MainPage";
import axios from "axios";
import PasswordMask from 'react-password-mask';

class NavBarComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            logIn: true,
            signUp: false,
            username:"",
            password:"",
            confirmPassword:"",
            linkToProfile: false,
            noData: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        const {name,value} = event.target;
        this.setState({
            [name]:value,
            linkToProfile:false
        })
    }

    handleLogIn = () => {
        if (this.state.username !== "" && this.state.password !== "") {
            this.setState({linkToProfile: true})
        }
       else if ((this.state.username === "" || this.state.password === "") && this.state.logIn)
            window.alert("Please enter all the inputs")

        this.setState({logIn:true,signUp:false})

        console.log("username " + this.state.username)
        console.log("password " + this.state.password)

    }
    handleSignUp = () => {
        if (this.state.username !== "" && this.state.password !== "" && this.state.confirmPassword !== "" && !this.state.linkToProfile)
            this.setState({linkToProfile:true})
        else if ((this.state.username === "" || this.state.password === "" || this.state.confirmPassword ==="") && this.state.signUp)
            window.alert("Please enter all the inputs")

        this.setState({logIn:false,signUp:true})
    }

    render() {

        if (this.state.linkToProfile)
            return (
               <div>
                   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                       <Link to="/"><img src={keyStoreLogoImg} className="keyStoreLogoImg"/></Link>
                       <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02"
                               aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                           <span className="navbar-toggler-icon"></span>
                       </button>

                       <div className="collapse navbar-collapse" id="navbarColor02">
                           <ul className="navbar-nav mr-auto ml-sm-5">
                               <li className="nav-item active">
                                   <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                               </li>
                               <li className="nav-item">
                                   <a className="nav-link" href="/profile">Profile</a>
                               </li>
                           </ul>
                           <div className="form-inline my-2 my-lg-0">
                               {this.state.logIn ?
                                   <div><input className="form-control mr-sm-2 " type="text" name="username" id="username" placeholder="Username" onChange={this.handleChange} aria-label="Search"/>
                                       <input className="form-control mr-sm-2" type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange} aria-label="Search"/></div>
                                   : <div><input className="form-control mr-sm-2 " type="text" name="username" id="username"  placeholder="Username" onChange={this.handleChange} aria-label="Search"/>
                                       <input className="form-control mr-sm-2" type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange} aria-label="Search"/>
                                       <input className="form-control mr-sm-2" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={this.handleChange} aria-label="Search"/></div>}
                               {this.state.logIn ? <div><button className="btn btn-success my-2 mr-sm-1" type="submit" onClick={this.handleLogIn}>Log In</button>
                                       <button className="btn btn-outline-success my-2 my-sm-3" type="submit" onClick={this.handleSignUp}>Sign Up</button></div>
                                   : <div><button className="btn btn-outline-success my-2 mr-sm-1" type="submit" onClick={this.handleLogIn}>Log In</button>
                                       <button className="btn btn-success my-2 my-sm-3" type="submit" onClick={this.handleSignUp}>Sign Up</button></div>}
                           </div>
                       </div>
                   </nav>
                   <Redirect to={{
                       pathname:`users/profile/${this.state.username}`,
                       state: {
                           username: this.state.username,
                           password: this.state.password
                       }
                   }}> </Redirect>
               </div>

                )
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link to="/"><img src={keyStoreLogoImg} className="keyStoreLogoImg"/></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02"
                            aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor02">
                        <ul className="navbar-nav mr-auto ml-sm-5">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/profile">Profile</a>
                            </li>
                        </ul>
                        <div className="form-inline my-2 my-lg-0">
                            {this.state.logIn ?
                               <div><input className="form-control mr-sm-2 " type="text" name="username" placeholder="Username" onChange={this.handleChange} aria-label="Search"/>
                                   <PasswordMask id="password" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} useVendorStyles={true} className="form-control mr-sm-2 "/></div>
                            : <div><input className="form-control mr-sm-2 " type="text" name="username" placeholder="Username" onChange={this.handleChange} aria-label="Search" />
                                    <PasswordMask id="password" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} useVendorStyles={true} className="form-control mr-sm-2 "/>
                                    <PasswordMask id="password" name="confirmPassword" placeholder="Confirm password" value={this.state.confirmPassword} onChange={this.handleChange} useVendorStyles={true} className="form-control mr-sm-2 "/></div>}
                            {this.state.logIn ? <div><button className="btn btn-success my-2 mr-sm-1" type="submit" onClick={this.handleLogIn} onDoubleClick={this.handleSignUp}>Log In</button>
                            <button className="btn btn-outline-success my-2 my-sm-3" type="submit" onClick={this.handleSignUp}>Sign Up</button></div>
                            : <div><button className="btn btn-outline-success my-2 mr-sm-1" type="submit" onClick={this.handleLogIn}>Log In</button>
                                    <button className="btn btn-success my-2 my-sm-3" type="submit" onClick={this.handleSignUp}>Sign Up</button></div>}
                        </div>
                    </div>
                </nav>



            </div>
        );
    }
}
export default NavBarComponent