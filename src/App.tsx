import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import AppNavbar from './Components/Navbar/AppNavbar'
import ItemListContainer from './Components/Products/ItemList/ItemListContainer'
import UsersListContainer from './Components/Users/UsersListContainer'
import ItemDetailContainer from './Components/Products/ItemDetail/ItemDetailContainer'

function App() {
  

  return (
    <>
      <BrowserRouter>
          <AppNavbar/>
            <Routes>
              <Route path='/home' element={<ItemListContainer/>}/>
              <Route path='/dasboardUsers' element={<UsersListContainer/>} /> 
              <Route path='/item/:id' element={<ItemDetailContainer/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
