import React from 'react';
import './App.css';
import ReactDOM from 'react-dom'
import KeyComponent from "./Components/KeyComponent";
import {BrowserRouter as Router, HashRouter, MemoryRouter, Route,Switch,withRouter} from 'react-router-dom'
import KeyService from "./Repository/axiosKeyRepository";
import KeyComponentDetails from "./Components/KeyComponentDetails"
import ProfileComponent from "./Components/login/ProfileComponent";
import FilteredByKeys from "./Components/FilterComponent/FilteredByKeys"
import {BrowserRouter} from "react-router-dom";
import NavBarComponent from "./Components/MainPageComponent/NavBarComponent";
import SideBarComponent from "./Components/MainPageComponent/SideBarComponent";
import SignUpComponent from "./Components/login/signUpComponent";
import auth from "./Components/login/auth";
import EditProfileComponent from "./Components/login/EditProfileComponent";
import MainPageComponent from "./Components/MainPageComponent/MainPageComponent";
import HomePageComponent from "./Components/MainPageComponent/HomePageComponent";


class App extends React.Component{

    constructor() {
        super();
        this.state = {
            keysApi: [],
            keysApiByCar:[],
            keysApiById: [],
            isLoading: true,
            loggedIn: false
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

            console.log("prevstatelogin" + prevState.loggedIn)
            console.log("thisstateloggedin" + this.state.loggedIn)
            console.log(auth.isAuthenticated())
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

    onLogIn(logged) {
        this.setState({loggedIn:logged})
    }

    render() {

        const keysData = this.state.keysApi.map(key => <KeyComponent key={key.id} name={key.name} size={key.size} description={key.description} price={key.price} onStock={key.onStock} imageUrl={key.imageUrl}/>)

        const routing = (
            <Router basename={window.location.pathname}>
                <MainPageComponent/>

                <div className="keysData">
                    <Route
                        path={"/"} exact
                        component={HomePageComponent}>
                    </Route>
                </div>

                <div className="keysData">
                    <Route
                        path={"/keys"}
                        exact
                        render={()=> keysData}>
                    </Route>
                </div>

                <div className="keysData">
                    <Route
                        path={"/keys/:name"}
                        component={KeyComponentDetails}>
                    </Route>
                </div>

                <div className="keysData">
                    <Route
                        path={"/users/profile"}
                           render={(props) => <ProfileComponent
                        {...props} onLogIn={this.onLogIn.bind(this)}/>}>
                    </Route>
                </div>

                <div className="keysData">
                    <Route
                        path={"/cars/filteredByKeys"}
                        component={FilteredByKeys}>
                    </Route>
                </div>
                <div className="keysData">
                    <Route
                        path={"/users/signUp"}
                        component={SignUpComponent}>
                    </Route>
                </div>
                <div className="keysData">
                    <Route
                        path={"/users/editProfile"}
                        component={EditProfileComponent}>
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
const rootElement = document.getElementById("root");
ReactDOM.render(<BrowserRouter><App/></BrowserRouter>,rootElement)
export default App
