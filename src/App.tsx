import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import AppNavbar from './Components/Navbar/AppNavbar'
import ItemListContainer from './Components/Products/ItemListContainer'
import UsersListContainer from './Components/Users/UsersListContainer'

function App() {
  

  return (
    <>
      <BrowserRouter>
          <AppNavbar/>
            <Routes>
              <Route path='/home' element={<ItemListContainer/>}/>
              <Route path='/dasboardUsers' element={<UsersListContainer/>} /> 
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
