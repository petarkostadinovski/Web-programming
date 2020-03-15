import React from "react";

import "../../App.css"
import NavBarComponent from "./NavBarComponent";
import SideBarComponent from "./SideBarComponent";

function MainPage () {

    return(
        <div>
            <NavBarComponent/>
            <SideBarComponent/>
        </div>
    )

}
export default MainPage