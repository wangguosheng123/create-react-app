import React from "react";
import { Route, Switch } from "react-router-dom";

import { Home } from "./pages/Home";
import { Nav } from "./components/Nav";

import { Goods } from "./pages/Goods";

import { Detail } from "./pages/Detail";

import { Zhuce } from "./pages/Zhuce";

import { Login } from "./pages/Login";

import { Shopcar } from "./pages/Shopcar";

function App() {
  return (
    <div>
      <Nav></Nav>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/home" component={Home} />
        <Route path="/goods" component={Goods} />
        <Route path="/zhuce" component={Zhuce} />
        <Route path="/login" component={Login} />
        <Route path="/shopcar" component={Shopcar} />
        <Route path="/detail/:goodsid" component={Detail} />
      </Switch>
    </div>
  );
}

export default App;
