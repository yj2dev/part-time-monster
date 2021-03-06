import {
  Container,
  CloseIcon,
  JobPostWrapper,
  SupportSubmit,
  Space,
  SupportModal,
  SupportModalCloseBtn,
  Smoke,
} from "./styled";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowBack, IoIosClose } from "react-icons/io";
import { IoCalendarClearOutline, IoCalendarOutline } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsClock } from "react-icons/bs";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineDollarCircle,
} from "react-icons/ai";
import { dateFormat, timeFormat } from "../../utils/time";
import { intOfKr, phoneFormat } from "../../utils/currency";
import { useSelector } from "react-redux";

const JobPostDetailPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [supportContent, setSupportContent] = useState("");
  const [showSupportModal, setShowSupportModal] = useState(false);

  useEffect(() => {
    getPostDetail();
    getUserFavorite();
  }, []);

  function getUserFavorite() {
    axios
      .get(`/api/job-post/${postId}/favorite-check`)
      .then(({ data }) => {
        if (data.success && data.data) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getPostDetail() {
    axios
      .get(`/api/job-post/${postId}/detail`)
      .then(({ data }) => {
        if (data.success) {
          setPost(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onClickFavorite() {
    axios
      .get(`/api/job-post/${postId}/favorite`)
      .then(({ data }) => {
        console.log("data >> ", data);
        if (data.success && data.data) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onClickSupport() {
    if (!supportContent) return;

    axios
      .post(`/api/job-post/${postId}/support`, { content: supportContent })
      .then(({ data }) => {
        if (data.success) {
          setShowSupportModal(false);
          setSupportContent("");
          alert("??????????????? ??????????????????.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Container>
      <div className="detail_page_title">????????????</div>
      <div className="favorite" onClick={onClickFavorite}>
        {!isFavorite ? (
          <AiOutlineStar />
        ) : (
          <AiFillStar style={{ color: "#ffb300" }} />
        )}
      </div>
      <CloseIcon onClick={() => navigate("/")}>
        <IoIosArrowBack />
      </CloseIcon>
      <JobPostWrapper>
        <div className="content info">
          <div className="company_name">{post && post.fromCompany.name}</div>
          <div className="title">{post && post.title}</div>
          <div className="created_at">
            ????????? {post && dateFormat(post.createdAt)}
          </div>
          <div className="info_item_wrapper">
            <div className="info_item pay">
              <AiOutlineDollarCircle
                style={{ fontSize: "72px", color: "#c57d24" }}
              />
              {post && post.payType}&nbsp;{post && intOfKr(post.pay)}???
            </div>

            <div className="info_item working_period">
              <IoCalendarClearOutline style={{ fontSize: "72px" }} />
              {post && post.workingPeriod} <br />
            </div>

            <div className="info_item working_day">
              <IoCalendarOutline style={{ fontSize: "72px" }} />
              {post && post.workingDay}
            </div>

            <div className="info_item working_time">
              <BsClock style={{ fontSize: "64px" }} />
              {post && timeFormat(post.workingStartTime)}&nbsp;~&nbsp;
              {post && timeFormat(post.workingEndTime)}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="sub_title">????????????</div>
          <table>
            <tr>
              <td>????????????</td>
              <td>
                {post && post.recruitStartAt} ~{post && post.recruitEndAt}
              </td>
            </tr>
            <tr>
              <td>????????????</td>
              <td>{post && post.recruitNumber}</td>
            </tr>
            <tr>
              <td>??????</td>
              <td>{post && post.sex}</td>
            </tr>
            <tr>
              <td>??????</td>
              <td>{post && post.age}</td>
            </tr>
            <tr>
              <td>??????</td>
              <td>{post && post.education}</td>
            </tr>
          </table>
        </div>
        <div className="content">
          <div className="sub_title">????????????</div>
          <table>
            <tr>
              <td>??????</td>
              <td>
                {post && post.payType}&nbsp;
                <span style={{ color: "red" }}>
                  {post && intOfKr(post.pay)}
                </span>
                ???
              </td>
            </tr>
            <tr>
              <td>????????????</td>
              <td>{post && post.workingPeriod}</td>
            </tr>
            <tr>
              <td>????????????</td>
              <td>
                {post && post.workingDay}&nbsp;(???&nbsp;
                {post && post.workingDay.length}???)
              </td>
            </tr>
            <tr>
              <td>????????????</td>
              <td>
                {post && timeFormat(post.workingStartTime)}&nbsp;~&nbsp;
                {post && timeFormat(post.workingEndTime)}
              </td>
            </tr>
          </table>
        </div>
        <div className="content">
          <div className="sub_title">??????????????????</div>
          <div className="description">{post && post.content}</div>
        </div>
        <div className="content">
          <div className="sub_title">????????????</div>
          <table>
            <tr>
              <td>?????????</td>
              <td>{post && post.fromCompany.name}</td>
            </tr>
            <tr>
              <td>????????????</td>
              <td>{post && post.fromCompany.ceoName}</td>
            </tr>
            <tr>
              <td>????????????</td>
              <td>{post && post.fromCompany.address}</td>
            </tr>
            <tr>
              <td>????????????</td>
              <td>{post && post.fromUser.name}</td>
            </tr>
            <tr>
              <td>?????????</td>
              <td>{post && phoneFormat(post.fromUser.phone)}</td>
            </tr>
          </table>
        </div>
      </JobPostWrapper>
      <Space />
      <SupportSubmit>
        <button
          onClick={() => {
            console.log(user);
            if (!user.isSignin) {
              alert("????????? ??? ?????????????????????.");
              return;
            }
            if (user.isSignin.data.isCompany) {
              alert("??????????????? ????????? ??? ????????????.");
              return;
            }
            setShowSupportModal((prev) => !prev);
          }}
        >
          ????????????
        </button>
      </SupportSubmit>
      <SupportModal id={showSupportModal && "active"}>
        <SupportModalCloseBtn
          onClick={() => {
            setShowSupportModal(false);
          }}
        >
          <IoIosClose />
        </SupportModalCloseBtn>
        <p>
          <RiSendPlaneFill />
          ????????????
        </p>
        <div className="user_info">
          {user && user.isSignin && (
            <tr>
              <td width={200}>????????? ??????</td>
              <td>{user && user.isSignin.data.name}</td>
            </tr>
          )}

          {user && user.isSignin && (
            <tr>
              <td width={200}>????????? ?????????</td>
              <td>{user && phoneFormat(user?.isSignin.data.phone)}</td>
            </tr>
          )}
        </div>
        <div className="support_length">{supportContent.length} / 500</div>
        <textarea
          placeholder="????????? ????????? ??????????????????."
          value={supportContent}
          onChange={(e) => {
            if (e.target.value.length > 500) return;
            setSupportContent(e.target.value);
          }}
        ></textarea>
        <button className="support_submit" onClick={onClickSupport}>
          ????????????
        </button>
      </SupportModal>
      {showSupportModal && <Smoke />}
    </Container>
  );
};

export default JobPostDetailPage;
