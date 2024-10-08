import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import AppNavbar from './Components/Navbar/AppNavbar'
import ItemListContainer from './Components/Products/ItemList/ItemListContainer'
import UsersListContainer from './Components/Users/UsersListContainer'
import ItemDetailContainer from './Components/Products/ItemDetail/ItemDetailContainer'
import Login from './Auth/Login/Login'
import Profile from './Components/Users/Profile/Profile'
import Logout from './Auth/sessions/Logout'
import CartContainer from './Components/Cart/CartContainer'


function App() { 
  return (
    <>
      <BrowserRouter>
          <AppNavbar/>
            <Routes>
              <Route path='/login' element={<Login/>} />
                <Route path='/home' element={<ItemListContainer/>}/>
                <Route path='/dashboard' element={<UsersListContainer/>} /> 
                <Route path='/item/:id' element={<ItemDetailContainer/>}/>
                <Route path='/profile/:id' element={<Profile/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path='/cart/:id' element={<CartContainer/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
