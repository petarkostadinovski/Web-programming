import React from 'react';
import './App.css';
import KeyComponent from "./Components/KeyComponent";
import MainPage from "./Components/MainPageComponent/MainPage"
import {BrowserRouter as Router, Redirect, Route,Switch} from 'react-router-dom'
import KeyService from "./Repository/axiosKeyRepository";
import KeyComponentDetails from "./Components/KeyComponentDetails"
import ProfileComponent from "./Components/ProfileComponent";
import FilteredByKeys from "./Components/FilterComponent/FilteredByKeys"
import KeyComponentEdit from "./Components/KeyComponentEdit"
import FilterCarsComponent from "./Components/FilterComponent/FilterCarsComponent";
import {Link} from "react-router-dom";
import axios from "axios";
import $ from 'jquery'
import CarService from "./Repository/axiosCarRepository";


class App extends React.Component{

    constructor() {
        super();
        this.state = {
            keysApi: [],
            keysApiByCar:[],
            keysApiById: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });
        this.loadKeys();
    }


    loadKeys = () => {
        KeyService.fetchKeyData().then(response => {
            const keysApi = response.data;
            this.setState({keysApi,isLoading:false})
        })
    };

    render() {

        const keysData = this.state.keysApi.map(key => <KeyComponent name={key.name} size={key.size} description={key.description} price={key.price} onStock={key.onStock} imageUrl={key.imageUrl}/>)


        const routing = (
            <Router>
                <MainPage/>
                <div className="keysData">
                    <Route path={"/keys"} exact render={()=> keysData}>
                </Route></div>

                <div className="keysData">
                    <Route
                        path={"/keys/:name"}
                        component={KeyComponentDetails}>
                    </Route>
                </div>

                <div className="keysData">
                    <Route
                        path={"/users/profile/:username"}
                        component={ProfileComponent}>
                    </Route>
                </div>

                <div className="keysData">
                    <Route
                        path={"/cars/filteredByKeys"}
                        component={FilteredByKeys}>
                    </Route>
                </div>
            </Router>
        )

        return(
            <div>
                <div>
                    {routing}
                </div>

            </div>
        )
    }
}
export default App
