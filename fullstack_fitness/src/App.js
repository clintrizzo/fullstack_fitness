import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home.js'
import Login from './pages/Login/Login.js'
import Register from './pages/Login/Register.js'
import Header from './components/Header/Header.js'
import Footer from './components/Footer/Footer.js'
import Profile from "./pages/userProfile/userProfile.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  return (
    <>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home/:userId" element={<Home />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;