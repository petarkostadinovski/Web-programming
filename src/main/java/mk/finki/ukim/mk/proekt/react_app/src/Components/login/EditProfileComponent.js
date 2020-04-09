import React from "react";
import { withRouter } from 'react-router-dom'
import PasswordMask from 'react-password-mask';
import Axios from "../../custom-axios/axios";
import { useState, useEffect } from 'react';
import qs from 'qs'


const EditProfileComponent = props => {

    const [username,setUsername] = useState("")
    const [currentPassword,setCurrentPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }
    const handleCurrentPassword = (event) => {
        setCurrentPassword(event.target.value)
    }
    const handleNewPassword = (event) => {
        setNewPassword(event.target.value)
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const fetchItemById = await fetch(`/api/users/${username}`);
        const item = await fetchItemById.json();

        if (localStorage.getItem("password") === currentPassword) {
            const data = {
                password:newPassword,
                name: "",
                size: 0,
                description: "",
                price: 0,
                onStock: false,
                imageUrl:""
            }
            const formParams = qs.stringify(data);
            if (window.confirm("Change your informations?")) {
                props.history.push("/")
                return Axios.patch(`/api/users/${localStorage.getItem("username")}`, formParams, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then(res => console.log(res))
                    .catch(err => console.error(err))
            }
        } else {
            window.alert("Passwords does not match!")
        }

    }
    return(
        <div >
            {localStorage.getItem("showSignUp") === "true" ?
                <div className="card text-white bg-light mb-3">
                    <h1><i className="signUpHeader">Edit profile: {localStorage.getItem("username")}</i></h1>


                    <input type="text" placeholder="New username" onChange={handleUsername}/><br/>
                    <PasswordMask type="text" placeholder="New password" onChange={handleNewPassword} useVendorStyles={true}/><br/>

                    <div>
                        <PasswordMask type="text" placeholder="Type the current password to confirm" onChange={handleCurrentPassword} useVendorStyles={true}/><br/>
                        <button className="btnSignUp" onClick={handleSubmit}>Confirm</button>
                    </div>
                </div>
                : null }
        </div>
    )
}

export default withRouter(EditProfileComponent)