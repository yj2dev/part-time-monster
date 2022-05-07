import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import JobPostWritePage from "./pages/JobPostWritePage";
import JobPostDetailPage from "./pages/JobPostDetailPage";
import SearchPage from "./pages/SearchPage";
import Layouts from "./Layouts";
import JobPostSupportListPage from "./pages/JobPostSupportListPage";
import JobPostFavorite from "./pages/JobPostFavoritePage";
import UserEditPage from "./pages/UserEditPage";
import JobPostManage from "./pages/JobPostManage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/post/manage" element={<JobPostManage />}></Route>
          <Route path="/user/edit" element={<UserEditPage />}></Route>
          <Route path="/post/favorite" element={<JobPostFavorite />}></Route>
          <Route
            path="/post/support-list"
            element={<JobPostSupportListPage />}
          ></Route>
          <Route path="/post/write" element={<JobPostWritePage />}></Route>
          <Route path="/post/:postId" element={<JobPostDetailPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/" element={<Layouts />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
