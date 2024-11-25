import {BrowserRouter, Routes, Route} from "react-router-dom"
import Admin_home from "./Component/admin_home"
import Admin_login from "./Component/admin_login"
import AdminProfile from "./Component/admin_profile"
import Admin_supplier from "./Component/admin_supplier"
import User from "./Component/user_info"
import Supplier from "./Component/Suppiler_info"
import Order from "./Component/order_info"
import Part from "./Component/Part_info"


function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin_login/>}/>
          <Route path="/admin/home" element={<Admin_home/>}/>
          <Route path="/admin/add-supplier" element={<Admin_supplier/>}/>
          <Route path="/admin/admin_profile" element={<AdminProfile/>}/>
          <Route path="/admin/supplier" element={<Supplier/>}/>
          <Route path="/admin/user" element={<User/>}/>
          <Route path="/admin/order" element={<Order/>}/>
          <Route path="/admin/parts" element={<Part/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
  


export default App

