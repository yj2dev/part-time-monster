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

const LoginPage = () => {
  const navigate = useNavigate();
  const [isCompanyUser, setIsCompanyUser] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

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
              <input type="text" placeholder="아이디" />
            </td>
          </tr>
          <tr>
            <td>
              <input type="password" placeholder="비밀번호" />
            </td>
          </tr>
        </table>
        <button className={isCompanyUser && "login-company"}>로그인</button>
      </UserLoginSection>
      <Register>
        계정이 없으세요? <Link to="/register">가입하기</Link>
      </Register>
    </Container>
  );
};

export default LoginPage;
