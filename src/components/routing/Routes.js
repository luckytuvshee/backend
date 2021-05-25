import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Product from '../product/Product';
import Dashboard from '../dashboard/Dashboard';
import Cart from '../Cart/Cart';
import Search from '../products/Search';
import LikedProducts from '../products/LikedProducts';
import BrandProducts from '../products/BrandProducts';
import TypeProducts from '../products/TypeProducts';
import TypeGroupProducts from '../products/TypeGroupProducts';
import Order from '../Cart/Order';
import Payment from '../Cart/Payment';
import PrivateRoute from '../routing/PrivateRoute';
import NotFound from '../layout/NotFound';

const Routes = () => {
  return (
    <section>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/order" component={Order} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/search" component={Search} />
        <Route
          exact
          path="/product/:id"
          component={(props) => (
            <Product {...props} key={window.location.pathname} />
          )}
        />
        <Route
          exact
          path="/products/type/:id"
          component={(props) => (
            <TypeProducts {...props} key={window.location.pathname} />
          )}
        />
        <Route
          exact
          path="/products/type/group/:id"
          component={(props) => (
            <TypeGroupProducts {...props} key={window.location.pathname} />
          )}
        />
        <Route
          exact
          path="/products/brand/:id"
          component={(props) => (
            <BrandProducts {...props} key={window.location.pathname} />
          )}
        />
        <PrivateRoute exact path="/dashboard/liked" component={LikedProducts} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
