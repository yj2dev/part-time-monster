import React from "react";
import {
  SearchContainer,
  JobPostWrapper,
  SupportButton,
  TotalCount,
} from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import getSummaryAddress from "../../utils/getSummaryAddress";
import {
  AccountInfoSection,
  Container,
  Logo,
  SearchSection,
} from "../../Layouts/Header/styled";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineUser,
} from "react-icons/ai";
import UserMenu from "../../components/UserMenu";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../../_actions/userActions";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [post, setPost] = useState([]);

  function getSearchResult(keyword) {
    axios
      .get(`/api/job-post/${keyword}/search`)
      .then(({ data }) => {
        console.log("data >> ", data);
        setPost(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function initSearchResult() {
    const keyword = searchParams.get("keyword");
    axios
      .get(`/api/job-post/${keyword}/search`)
      .then(({ data }) => {
        console.log("data >> ", data);
        setPost(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    initSearchResult();
    searchRef.current.focus();
  }, []);

  const onClickDetail = (e) => {
    navigate(`/post/${e.target.value}`);
  };

  // ##### Header #####
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const searchRef = React.createRef();

  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(
    searchParams.get("keyword")
  );

  const onSubmitSearch = (e) => {
    searchRef.current.focus();
    e.preventDefault();
    if (!searchKeyword) return;
    navigate(`/search?keyword=${searchKeyword}`);
    getSearchResult(searchKeyword);
  };

  useEffect(() => {
    dispatch(authUser());
  }, []);

  // ##### END HEADER #####
  return (
    <>
      <Container>
        <Logo>
          <img src="img/logo.png" onClick={() => navigate("/")} />
          <h3 onClick={() => navigate("/")}>알바 몬스터</h3>
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
              ref={searchRef}
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

      <TotalCount>
        총 <span>{post.length}</span>건의 알바가 있어요 😃
      </TotalCount>
      <SearchContainer>
        {post &&
          post.map((v) => (
            <JobPostWrapper>
              <div className="company_name">{v.fromCompany.name}</div>
              <div className="post_title">{v.title}</div>
              <div className="company_address">
                {getSummaryAddress(v.fromCompany.address)}
              </div>
              <div className="pay">
                <span>{v.payType}</span> {v.pay}
              </div>
              <SupportButton value={v.id} onClick={onClickDetail}>
                상세보기
              </SupportButton>
            </JobPostWrapper>
          ))}
      </SearchContainer>
    </>
  );
};

export default SearchPage;
