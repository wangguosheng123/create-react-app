import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";

import App from "./App";

export class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={App} />
      </Router>
    );
  }
}
