import './App.css';
import 'jquery/dist/jquery.slim'
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from 'react-router-dom'
import MainNavbar from './components/MainNavbar'
import MainPage from './pages/MainPage';
import ProductData from './components/ProductData';
import ProductDetails from './components/ProductDetails';
import Footer from './components/Footer';
import SignUp from './components/User/SignUp';
import Login from './components/User/Login';
import { useEffect, useState } from 'react';
import UserService from './services/UserService';

function App() {

  const [loggedInUser, setLoggedInUser] = useState(UserService.getUser());
  const authenticated = () => {
    setLoggedInUser(UserService.getUser());
  }
  return (
    <div className="App App-header bg-light">
      <MainNavbar loggedInUser={loggedInUser} ></MainNavbar>
      <br></br>
      <br></br>
      <Routes>
        <Route path='/' element={<MainPage></MainPage>}></Route>
        <Route path='/product' element={<ProductData></ProductData>}></Route>
        <Route path='/product'>
          <Route path=':id' element={<ProductDetails></ProductDetails>} ></Route>
        </Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='/login' element={<Login authenticated={authenticated} ></Login>} ></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
