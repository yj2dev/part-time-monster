import {
  Container,
  Logo,
  UserTypeSection,
  UserLoginSection,
  CloseIcon,
  Register,
} from "./styled";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isCompanyUser, setIsCompanyUser] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  function onSubmitLogin() {
    if (id.length === 0 || password.length === 0) return;
    axios
      .post("/api/user/login", {
        id,
        password,
        isCompany: isCompanyUser ? 1 : 0,
      })
      .then((res) => {
        if (res.data) {
          navigate("/");
          return;
        }
        alert("회원정보가 일치하지 않습니다.");
      })
      .catch((err) => {
        console.log(err);
        alert("회원정보가 일치하지 않습니다.");
      });
  }

  return (
    <Container>
      <CloseIcon onClick={() => navigate("/")}>
        <AiOutlineClose style={{ fontSize: "32px" }} />
      </CloseIcon>
      <Logo>
        <img src="img/logo.png" />
        <h3>알바 몬스터</h3>
      </Logo>
      <UserTypeSection>
        <button
          value={id}
          onChange={(e) => setId(e.target.value)}
          onClick={() => setIsCompanyUser(false)}
          class={"user-type " + (!isCompanyUser && "select-private")}
        >
          개인회원
        </button>
        <button
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onClick={() => setIsCompanyUser(true)}
          className={"user-type " + (isCompanyUser && "select-company")}
        >
          기업회원
        </button>
      </UserTypeSection>
      <UserLoginSection>
        <table>
          <tr>
            <td>
              <input
                type="text"
                placeholder="아이디"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </td>
          </tr>
        </table>
        <button
          onClick={onSubmitLogin}
          className={isCompanyUser && "login-company"}
        >
          로그인
        </button>
      </UserLoginSection>
      <Register>
        계정이 없으세요? <Link to="/register">가입하기</Link>
      </Register>
    </Container>
  );
};

export default LoginPage;
