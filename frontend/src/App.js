import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
// import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import NotFound from "./component/layout/NotFound/NotFound";

function App() {
     const { isAuthenticated, user } = useSelector((state) => state.user);

     const [stripeApiKey, setStripeApiKey] = useState("");

     async function getStripeApiKey() {
          const { data } = await axios.get("/api/v1/stripeapikey");

          setStripeApiKey(data.stripeApiKey);
     }

     useEffect(() => {
          WebFont.load({
               google: {
                    families: ["Popins", "Roboto"],
               },
          });

          store.dispatch(loadUser());

          getStripeApiKey();
     }, []);

     //Disable the right click on website
     window.addEventListener("contextmenu", (e)=>e.preventDefault());

     return (
          <Router>
               <Header />

               {isAuthenticated && <UserOptions user={user} />}

               <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/product/:id" element={<ProductDetails />} />
                    <Route exact path="/products/" element={<Products />} />
                    <Route path="/products/:keyword" element={<Products />} />
                    <Route exact path="/search/" element={<Search />} />

                    {isAuthenticated && <Route exact path="/account" element={<Profile />} />}
                    {isAuthenticated && <Route exact path="/me/update" element={<UpdateProfile />} />}
                    {isAuthenticated && <Route exact path="/password/update" element={<UpdatePassword />} />}

                    <Route exact path="/password/forgot" element={<ForgotPassword />} />
                    <Route exact path="/password/reset/:token" element={<ResetPassword />} />
                    <Route exact path="/cart" element={<Cart />} />

                    {isAuthenticated && <Route exact path="/shipping" element={<Shipping />} />}
                    {isAuthenticated && <Route exact path="/order/confirm" element={<ConfirmOrder />} />}
                    {isAuthenticated && (
                         <Route
                              exact
                              path="/process/payment" 
                              element={
                                   <Elements stripe={loadStripe(stripeApiKey)}>
                                        <Payment />
                                   </Elements>
                              }
                         />
                    )}
                    {isAuthenticated && <Route exact path="/success" element={<OrderSuccess />} />}
                    {isAuthenticated && <Route exact path="/orders" element={<MyOrders />} />}
                    {isAuthenticated && <Route exact path="/order/:id" element={<OrderDetails />} />}

                    {isAuthenticated && <Route exact path="/admin/dashboard" element={<Dashboard />} />}
                    {isAuthenticated && <Route exact path="/admin/products" element={<ProductList />} />}
                    {isAuthenticated && <Route exact path="/admin/product" element={<NewProduct />} />}
                    {isAuthenticated && <Route exact path="/admin/product/:id" element={<UpdateProduct />} />}
                    {isAuthenticated && <Route exact path="/admin/orders" element={<OrderList />} />}
                    {isAuthenticated && <Route exact path="/admin/order/:id" element={<ProcessOrder />} />}
                    {isAuthenticated && <Route exact path="/admin/users" element={<UsersList />} />}
                    {isAuthenticated && <Route exact path="/admin/user/:id" element={<UpdateUser />} />}
                    {isAuthenticated && <Route exact path="/admin/reviews" element={<ProductReviews />} />}

                    <Route path="*" element={window.location.pathname === "/process/payment"? null : <NotFound />} />

                    <Route exact path="/login" element={<LoginSignUp />} />
               </Routes>

               <Footer />
          </Router>
     );
}

export default App;
