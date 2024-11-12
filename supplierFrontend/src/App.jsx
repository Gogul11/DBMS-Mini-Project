import {BrowserRouter, Routes, Route} from "react-router-dom"
import Addpart from "./components/addpart"
import Home from "./components/home"
import Login from "./components/login"
import OrderPage from "./components/order"
import SupplierPage from "./components/product"
import Profile from "./components/profile"


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/supplier-profile" element={<Profile/>}/>
        <Route path="/orders" element={<OrderPage/>}/>
        <Route path="/products" element={<SupplierPage/>}/>
        <Route path="/add-product" element={<Addpart/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
