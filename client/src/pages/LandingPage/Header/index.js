import { Container, Logo, SearchSection, AccountInfoSection } from "./styled";
import {
  AiOutlineUser,
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineMenu,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserMenu from "../../../components/UserMenu";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../../../_actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const onSubmitSearch = (e) => {
    e.preventDefault();
    if (!searchKeyword) return;
    navigate(`/search?keyword=${searchKeyword}`);
    console.log("ds");
  };

  useEffect(() => {
    dispatch(authUser());
  }, []);

  return (
    <Container>
      <Logo>
        <img src="img/logo.png" />
        <h3>알바 몬스터</h3>
        <div id="account_info">
          {!user.isSignin.success ? (
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
        <form onSubmit={onSubmitSearch}>
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button type="submit">
            <AiOutlineSearch style={{ fontSize: "24px" }} />
          </button>
        </form>
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

      {showUserMenu && <UserMenu user={user.isSignin.data} />}
    </Container>
  );
};

export default Header;
