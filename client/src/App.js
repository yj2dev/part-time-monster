import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Layout from "./layouts";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import JobPostWritePage from "./pages/JobPostWritePage";
import JobPostDetailPage from "./pages/JobPostDetailPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*<Route path="/user/setting" element={<JobPostWritePage />}></Route>*/}
          <Route path="/post/:postId" element={<JobPostDetailPage />}></Route>
          <Route path="/post/write" element={<JobPostWritePage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
