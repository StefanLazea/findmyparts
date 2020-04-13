import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import AddPart from "./components/Part/AddPart";


export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/add/part" exact component={AddPart} />
            <Route component={NotFound} />
        </Switch>
    );
}