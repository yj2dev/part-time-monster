import { Container, Logo, SearchSection, AccountInfoSection } from "./styled";
import {
  AiOutlineUser,
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineMenu,
} from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../../../utils/swr/fetcher";
import UserMenu from "../../../components/UserMenu";

const Header = () => {
  const { data, err } = useSWR("/api/user/auth", fetcher);
  console.log("data >> ", data);
  const navigate = useNavigate();
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <Container>
      <Logo>
        <img src="img/logo.png" />
        <h3>알바 몬스터</h3>
        <div id="account_info">
          {!data ? (
            <div onClick={() => setShowAccountInfo((prev) => !prev)}>
              {!showAccountInfo ? (
                <AiOutlineUser style={{ fontSize: "32px" }} />
              ) : (
                <AiOutlineClose style={{ fontSize: "32px" }} />
              )}
            </div>
          ) : (
            <div onClick={() => setShowUserMenu((prev) => !prev)}>
              {!showUserMenu ? (
                <AiOutlineMenu style={{ fontSize: "32px" }} />
              ) : (
                <AiOutlineClose style={{ fontSize: "32px" }} />
              )}
            </div>
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

      {showUserMenu && <UserMenu user={data.data} />}
    </Container>
  );
};

export default Header;
