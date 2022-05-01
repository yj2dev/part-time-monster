import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Layout from "./layouts";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/" element={<LandingPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
