import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';


import DashBoard from './Dashboard/Dashboard';



class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/admin" exact component={ DashBoard } />
                    
                    <Route path="*">
                        <Redirect to="/admin" />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default Routes;