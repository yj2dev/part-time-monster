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
          alert("알바지원에 성공했습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Container>
      <div className="detail_page_title">채용정보</div>
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
            등록일 {post && dateFormat(post.createdAt)}
          </div>
          <div className="info_item_wrapper">
            <div className="info_item pay">
              <AiOutlineDollarCircle
                style={{ fontSize: "72px", color: "#c57d24" }}
              />
              {post && post.payType}&nbsp;{post && intOfKr(post.pay)}원
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
          <div className="sub_title">모집조건</div>
          <table>
            <tr>
              <td>모집기간</td>
              <td>
                {post && post.recruitStartAt} ~{post && post.recruitEndAt}
              </td>
            </tr>
            <tr>
              <td>모집인원</td>
              <td>{post && post.recruitNumber}</td>
            </tr>
            <tr>
              <td>성별</td>
              <td>{post && post.sex}</td>
            </tr>
            <tr>
              <td>연령</td>
              <td>{post && post.age}</td>
            </tr>
            <tr>
              <td>학력</td>
              <td>{post && post.education}</td>
            </tr>
          </table>
        </div>
        <div className="content">
          <div className="sub_title">근무조건</div>
          <table>
            <tr>
              <td>급여</td>
              <td>
                {post && post.payType}&nbsp;
                <span style={{ color: "red" }}>
                  {post && intOfKr(post.pay)}
                </span>
                원
              </td>
            </tr>
            <tr>
              <td>근무기간</td>
              <td>{post && post.workingPeriod}</td>
            </tr>
            <tr>
              <td>근무요일</td>
              <td>
                {post && post.workingDay}&nbsp;(주&nbsp;
                {post && post.workingDay.length}일)
              </td>
            </tr>
            <tr>
              <td>근무시간</td>
              <td>
                {post && timeFormat(post.workingStartTime)}&nbsp;~&nbsp;
                {post && timeFormat(post.workingEndTime)}
              </td>
            </tr>
          </table>
        </div>
        <div className="content">
          <div className="sub_title">상세모집내용</div>
          <div className="description">{post && post.content}</div>
        </div>
        <div className="content">
          <div className="sub_title">회사정보</div>
          <table>
            <tr>
              <td>회사명</td>
              <td>{post && post.fromCompany.name}</td>
            </tr>
            <tr>
              <td>대표자명</td>
              <td>{post && post.fromCompany.ceoName}</td>
            </tr>
            <tr>
              <td>회사위치</td>
              <td>{post && post.fromCompany.address}</td>
            </tr>
            <tr>
              <td>담당자명</td>
              <td>{post && post.fromUser.name}</td>
            </tr>
            <tr>
              <td>연락처</td>
              <td>{post && phoneFormat(post.fromUser.phone)}</td>
            </tr>
          </table>
        </div>
      </JobPostWrapper>
      <Space />
      <SupportSubmit>
        <button onClick={() => setShowSupportModal((prev) => !prev)}>
          지원하기
        </button>
      </SupportSubmit>
      <SupportModal id={showSupportModal && "active"}>
        <SupportModalCloseBtn onClick={() => setShowSupportModal(false)}>
          <IoIosClose />
        </SupportModalCloseBtn>
        <p>
          <RiSendPlaneFill />
          지원하기
        </p>
        <div className="user_info">
          {user && user.isSignin && (
            <tr>
              <td width={200}>지원자 성함</td>
              <td>{user.isSignin.data.name}</td>
            </tr>
          )}

          {user && user.isSignin && (
            <tr>
              <td width={200}>지원자 연락처</td>
              <td>{phoneFormat(user.isSignin.data.phone)}</td>
            </tr>
          )}
        </div>
        <div className="support_length">{supportContent.length} / 500</div>
        <textarea
          placeholder="남기실 메모를 작성해주세요."
          value={supportContent}
          onChange={(e) => {
            if (e.target.value.length > 500) return;
            setSupportContent(e.target.value);
          }}
        ></textarea>
        <button className="support_submit" onClick={onClickSupport}>
          작성완료
        </button>
      </SupportModal>
      {showSupportModal && <Smoke />}
    </Container>
  );
};

export default JobPostDetailPage;
