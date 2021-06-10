import { Switch, Route, BrowserRouter } from "react-router-dom";

import React from "react";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AdminDashboard from "./user/AdminDashBoard";
import AddProduct from "./admin/AddProduct";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute path="/user/dashboard" exact component={AdminDashboard} />

        <PrivateRoute
          path="/user/create/product"
          exact
          component={AddProduct}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
