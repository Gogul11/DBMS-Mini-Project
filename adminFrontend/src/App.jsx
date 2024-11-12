import {BrowserRouter, Routes, Route} from "react-router-dom"
import Admin_home from "./Component/admin_home"
import Admin_login from "./Component/admin_login"
import AdminProfile from "./Component/admin_profile"
import Admin_supplier from "./Component/admin_supplier"
import User from "./Component/user_info"
import Supplier from "./Component/Suppiler_info"
import Order from "./Component/order_info"
import Part from "./Component/Part_info"
import UserProfile from "./Component/User_profile"
import SupplierProfile from "./Component/supplier_profile"
import OrderProfile from "./Component/order_profile"
function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Admin_login/>}/>
          <Route path="/home" element={<Admin_home/>}/>
          <Route path="/add-supplier" element={<Admin_supplier/>}/>
          <Route path="/admin_profile" element={<AdminProfile/>}/>
          <Route path="/login" element={<Admin_login/>}/>
          <Route path="/supplier" element={<Supplier/>}/>
          <Route path="/user" element={<User/>}/>
          <Route path="/order" element={<Order/>}/>
          <Route path="/parts" element={<Part/>}/>
          <Route path="/supplier/profile" element={<SupplierProfile/>}/>
          <Route path="/user/profile" element={<UserProfile/>}/>
          <Route path="/order/profile" element={<OrderProfile/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
  


export default App

