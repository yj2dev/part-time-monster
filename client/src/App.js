import './App.css';
import {BrowserRouter, Link, Route} from "react-router-dom";
import Test from "./Test";

function App() {
  return (
    <>
    <BrowserRouter>
      <h3>Monster ... </h3>
      <Link to ="/user/account">로그인</Link>
      {/*<Route path="/" components={Test}>3322</Route>*/}
    </BrowserRouter>
    </>
  );
}

export default App;
