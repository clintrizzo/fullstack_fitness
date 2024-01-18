import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home.js'
import Login from './pages/Login/Login.js'
import Register from './pages/Login/Register.js'

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
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </>
  );
}

export default App;