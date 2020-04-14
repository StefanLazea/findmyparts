import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import AddPart from "./components/Part/AddPart";
import Login from "./components/Login/Login";


export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/add/part" exact component={AddPart} />
        </Switch>
    );
}