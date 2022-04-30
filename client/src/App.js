import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Layout from "./layouts";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/" element={<LandingPage />}></Route>
        </Routes>
        <Link to="/">홈</Link>
        <Link to="/login">로그인</Link>
        <Link to="/register">회원가입</Link>
      </BrowserRouter>
    </>
  );
}

export default App;
