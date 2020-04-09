import React from "react";
import {BrowserRouter as Router, Redirect, Route,Switch,withRouter} from 'react-router-dom'
import "../../App.css"
import NavBarComponent from "./NavBarComponent";
import SideBarComponent from "./SideBarComponent";


const MainPageComponent = props => {
    return(
        <div>
            <NavBarComponent/>
            <SideBarComponent/>
        </div>
    )
}
export default withRouter(MainPageComponent);