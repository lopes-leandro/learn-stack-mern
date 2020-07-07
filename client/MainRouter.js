import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from "./core/Home";
import Users from "./user/Users";
import Signup from './user/Signup';

const MainRouter = () => {
    return(<div>
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/users" component={Users}></Route>
            <Route path="/signup" component={Signup}></Route>
        </Switch>
    </div>)
}

export default MainRouter;