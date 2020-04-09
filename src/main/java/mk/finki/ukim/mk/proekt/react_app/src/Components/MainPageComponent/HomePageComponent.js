import React from "react";
import {BrowserRouter as Router, Link, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import "../../App.css"
import qs from "qs";
import Axios from "../../custom-axios/axios";
import car_keychains_image from "../../images/car_keychains_image.jpg"


const HomePageComponent = props => {
    return(
        <div>
            <div className="cardStyle" style={{"width":"1000px","position":"relative"}}>
                <div className="card text-white bg-dark mb-3" styles="max-width: 10rem;">
                    <div className="card-header"><span className="card-header text-white">KEYS</span></div>
                    <div className="card-body text-white">
                       <div>
                           <table style={{"border" : "1px solid lightblue","border-collapse" : "collapse"}}>
                              <td><img src={car_keychains_image} className="car_keychains_image"/></td>
                              <td><img src={car_keychains_image} style={{"position":"relative","margin-left":"50px"}} className="car_keychains_image"/></td>
                           </table>
                       </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default withRouter(HomePageComponent);