import { Container, Logo, SearchSection, AccountInfoSection } from "./styled";
import { AiOutlineUser, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [showAccountInfo, setShowAccountInfo] = useState(false);

  return (
    <Container>
      <Logo>
        <img src="img/logo.png" />
        <h3>알바 몬스터</h3>
        <div
          id="account_info"
          className={showAccountInfo && "show_account_info"}
          onClick={() => setShowAccountInfo((prev) => !prev)}
        >
          {!showAccountInfo ? (
            <AiOutlineUser style={{ fontSize: "32px" }} />
          ) : (
            <AiOutlineClose style={{ fontSize: "32px" }} />
          )}
        </div>
      </Logo>
      <SearchSection>
        <input type="text" />
        <p>
          <AiOutlineSearch style={{ fontSize: "24px" }} />
        </p>
      </SearchSection>
      {showAccountInfo && (
        <AccountInfoSection>
          <div className="account_message">
            로그인하고 알바몬스터의 다양한 서비스를 경험해보세요.
          </div>
          <div className="button_wrapper">
            <button
              onClick={() => navigate("/login")}
              style={{ background: "#ffffff" }}
            >
              로그인
            </button>
            <button
              onClick={() => navigate("/register")}
              style={{ background: "#363d4d", color: "#ffffff" }}
            >
              회원가입
            </button>
          </div>
        </AccountInfoSection>
      )}
    </Container>
  );
};

export default Header;
