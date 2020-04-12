import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";


export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}