import { Container, ServiceWrapper } from "./styled";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authUser } from "../../_actions/userActions";
import { IoHeartCircleOutline, IoDocumentTextOutline } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";

import Gravatar from "react-gravatar";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const UserMenu = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onClickLogout() {
    axios.get("/api/user/logout").then(({ data }) => {
      if (data.success) {
        dispatch(authUser());
        navigate("/login");
        navigate("/");
      }
    });
  }

  return (
    <Container>
      <ServiceWrapper>
        <div className="info">
          <div className="profile">
            <div className="profile-img">
              <Gravatar email={user.id} size={120} default="wavatar" />
            </div>
            <div className="name">
              <b>{user.name}</b>님&nbsp;
            </div>
            <div className="update-account-link">
              <Link to="/account/update">
                내 정보 수정
                <MdArrowForwardIos
                  style={{
                    fontSize: "16px",
                    position: "absolute",
                    top: "7px",
                  }}
                />
              </Link>
            </div>
            {!user.isCompany ? (
              <div className="badge private-badge">개인회원</div>
            ) : (
              <div className="badge company-badge">기업회원</div>
            )}
          </div>
        </div>

        {!user.isCompany ? (
          <tr className="my-menu">
            <td className="my-menu-item">
              <AiOutlineStar
                style={{
                  color: "#000000",
                  background: "#ffffff",
                  borderRadius: "12px",
                  padding: "8px",
                  marginRight: "12px",
                }}
              />
              관심 알바
            </td>
            <td className="my-menu-item">
              <IoDocumentTextOutline
                style={{
                  color: "#000000",
                  background: "#ffffff",
                  borderRadius: "12px",
                  padding: "8px",
                  marginRight: "12px",
                }}
              />
              내가 지원한 알바
            </td>
          </tr>
        ) : (
          <tr className="my-menu">
            <td
              className="my-menu-item"
              onClick={() => navigate("/post/write")}
            >
              <IoHeartCircleOutline
                style={{
                  color: "#000000",
                  background: "#ffffff",
                  borderRadius: "12px",
                  padding: "8px",
                  marginRight: "12px",
                }}
              />
              채용글 작성
            </td>
            <td className="my-menu-item">
              <IoDocumentTextOutline
                style={{
                  color: "#000000",
                  background: "#ffffff",
                  borderRadius: "12px",
                  padding: "8px",
                  marginRight: "12px",
                }}
              />
              채용글 관리
            </td>
          </tr>
        )}
      </ServiceWrapper>
      <button className="btn_logout" onClick={onClickLogout}>
        로그아웃
      </button>
    </Container>
  );
};

export default UserMenu;
