import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header.jsx'
import Footer from './components/Footer/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreens'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/userListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import NotFound from './screens/NotFound'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import MyAcountScreen from './screens/MyAcountScreen'
import ScrollToTop from './utils/ScrollToTop'


const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <main className="py-3" style={{marginTop:"78px"}}>
        <ToastContainer autoClose={1500} closeOnClick={false} />
        <Container>
          {/* <Route path='/order/:id' component={OrderScreen} /> */}
          <Switch>
            <Route path='/orders/:id' component={OrderScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/account' component={MyAcountScreen} />

            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/admin/userlist' component={UserListScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route path='/admin/productlist' component={ProductListScreen} exact />
            <Route path='/admin/productlist/:pageNumber' component={ProductListScreen} exact />
            <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
            <Route path='/admin/orderlist' component={OrderListScreen} />
            <Route path='/search/:keyword' component={HomeScreen} />
            <Route path='/page/:pageNumber' component={HomeScreen} exact />
            <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} />
            <Route path='/' component={HomeScreen} exact />
            <Route path='*' component={NotFound}  />
          </Switch>
        </Container>
      </main>

      <Footer />

    </Router>
  );
}

export default App;
