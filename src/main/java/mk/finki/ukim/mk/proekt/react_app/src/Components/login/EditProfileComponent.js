import React from "react";
import { withRouter } from 'react-router-dom'
import PasswordMask from 'react-password-mask';
import axios from "axios";
import { useState, useEffect } from 'react';


const EditProfileComponent = props => {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const fetchItemById = await fetch(`/api/users/${username}`);
        const item = await fetchItemById.json();

        if (item !== null)
            window.alert("Username already exists")

        else {
            return axios.post('/api/users', {
                username: username,
                password: password,
                keyList: []
            }).then(function () {
                if (!window.alert("Successfuly signed up"))
                    props.history.push("/")
            }).then(function (response) {
                console.log(response);
            })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    return(
        <div >
            {localStorage.getItem("showSignUp") === "true" ?
                <div className="card text-white bg-light mb-3">
                    <h1><i className="signUpHeader">Edit profile: {localStorage.getItem("username")}</i></h1>


                    <input type="text" placeholder="New username" onChange={handleUsername}/><br/>
                    <PasswordMask type="text" placeholder="Current password" onChange={handlePassword} useVendorStyles={true}/><br/>
                    <PasswordMask type="text" placeholder="New password" onChange={handlePassword} useVendorStyles={true}/><br/>

                    <div><button className="btnSignUp" onClick={handleSubmit}>Confirm</button></div>
                </div>
                : null }
        </div>
    )
}

export default withRouter(EditProfileComponent)