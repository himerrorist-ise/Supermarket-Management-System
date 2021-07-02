import React, { useState, useEffect }from "react"
import Home from "./components/Home.js"
import Login from "./components/login/Login.js"
import Manager from "./components/manager/Manager.js"
import About from "./components/About"
import ContactUs from "./components/ContactUs"
import Category from "./components/category/Category.js"
import Seller from "./components/seller/Seller.js"
import Selling from "./components/selling/Selling.js"
import Navbar from "./components/Navbar.js"
import ManagerNavbar from "./components/managerNavbar/ManagerNavbar.js"
import SellingNavbar from "./components/sellingNavbar/SellingNavbar.js"
import Product from "./components/product/Product.js"
import {Route, Switch, BrowserRouter as Router} from "react-router-dom"

function App() {
  const [isLogin, setIsLogin] = useState(0)
  const [isManager, setIsManager] = useState(0)
  const [isSeller, setIsSeller] = useState(0)
  const [sellerName, setSellerName] = useState("")

  const handleLoginChange = (prop) => {
    setIsLogin(prop)
  }

  const handleManagerChange = (prop) => {
    setIsManager(prop)
  }

  const handleSellerChange = (prop,prop2) => {
    setIsSeller(prop)
    setSellerName(prop2)
  }

  useEffect(() => {
    const value = Number(localStorage.getItem("isLogin") || 0)
    const value1 = Number(localStorage.getItem("isManager") || 0)
    const value2 = Number(localStorage.getItem("isSeller") || 0)
    const value3 = (localStorage.getItem("sellerName") || "")
    setIsLogin(value)
    setIsManager(value1)
    setIsSeller(value2)
    setSellerName(value3)
  },[])

  useEffect( () => {
    localStorage.setItem("isLogin", isLogin)
    localStorage.setItem("isManager", isManager)
    localStorage.setItem("isSeller", isSeller)
    localStorage.setItem("sellerName", sellerName)
    
  }, [isLogin])

  return (
    <div>
      {isLogin === 0 ?
        <div>
          <Router>
            <Navbar/>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/Login"render={()=><Login func={handleLoginChange} funcManager={handleManagerChange} funcSeller={handleSellerChange}/>}/>
              <Route path="/Manager" component={Manager}/>
              <Route path="/About" component={About} />
              <Route path="/ContactUs" component={ContactUs} />
              <Route path="/Selling"render={()=><Selling sellerName={sellerName}/>}/>
            </Switch>
          </Router>
        </div> : (isManager === 1 && isSeller === 0 ? 
          <div>
            <Router>
              <ManagerNavbar func={handleLoginChange} funcManager={handleManagerChange} funcSeller={handleSellerChange}/>
              <Switch>
                <Route path="/Login" render={()=><Login func={handleLoginChange} funcManager={handleManagerChange} funcSeller={handleSellerChange}/>}/>
                <Route path="/Manager" component={Manager}/>
                <Route path="/Product" component={Product}/>
                <Route path="/Category" component={Category}/>
                <Route path="/Seller" component={Seller}/>
              </Switch>
              </Router>
          </div> :
          <div>
          <Router>
            <SellingNavbar func={handleLoginChange} funcManager={handleManagerChange} funcSeller={handleSellerChange}/>
            <Switch>
              <Route path="/Login" render={()=><Login func={handleLoginChange} funcManager={handleManagerChange} funcSeller={handleSellerChange}/>}/>
              <Route path="/Selling" render={()=><Selling sellerName={sellerName}/>} />
            </Switch>
            </Router>
        </div> )
      }
    </div>
  )
}

export default App;
