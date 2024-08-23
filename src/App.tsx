import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import AppNavbar from './Components/Navbar/AppNavbar'
import ItemListContainer from './Components/Products/ItemListContainer'

function App() {
  

  return (
    <>
      <BrowserRouter>
          <AppNavbar/>
            <Routes>
              <Route path='/' element={<ItemListContainer/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
