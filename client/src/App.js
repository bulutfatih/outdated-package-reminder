import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Repo from "./components/Repo";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:platform/:namespace/:repository">
          <Repo />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
