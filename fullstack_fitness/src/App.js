import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home.js'
import Login from './pages/Login/Login.js'


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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;