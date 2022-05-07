import { Container, CloseIcon, JobPostWrapper } from "./styled";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { IoCalendarClearOutline, IoCalendarOutline } from "react-icons/io5";
import { BsClock } from "react-icons/bs";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineDollarCircle,
} from "react-icons/ai";
import { dateFormat, timeFormat } from "../../utils/time";
import { intOfKr } from "../../utils/currency";

const JobPostDetailPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
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
  }, []);

  return (
    <Container>
      <div className="detail_page_title">채용정보</div>
      <div className="favorite">
        {!false ? (
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
              <td>{post && post.fromUser.phone}</td>
            </tr>
          </table>
        </div>
      </JobPostWrapper>
    </Container>
  );
};

export default JobPostDetailPage;
