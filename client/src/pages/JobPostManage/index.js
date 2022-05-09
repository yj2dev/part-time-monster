import {
  CloseIcon,
  Container,
  ContainerTitle,
  Content,
  PostWrapper,
  SupportWrapper,
  TotalCount,
} from "./styled";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { dateFormat, timeFormat } from "../../utils/time";
import { intOfKr } from "../../utils/currency";
import { FaMapMarkerAlt } from "react-icons/fa";
import getSummaryAddress from "../../utils/getSummaryAddress";
import { IoTimeSharp } from "react-icons/io5";

const JobPostManage = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);

  function getPost() {
    axios
      .get(`/api/job-post/wrote-all`)
      .then((res) => {
        console.log("res >> ", res);
        if (res.data.success) {
          setPost(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getPost();
  }, []);

  const onClickDelete = (e) => {
    const inputNo = prompt(
      "게시물 삭제를 확인하기 위해 게시물번호를 입력해주세요."
    );
    if (!inputNo) return;
    if (inputNo !== e.target.value.toString()) {
      alert("게시물번호가 일치하지 않습니다.");
      return;
    }

    console.log("삭제시도");
  };
  const onClickEdit = () => {};
  const onClickDetail = () => {};

  return (
    <Container>
      <ContainerTitle>채용게시글 관리</ContainerTitle>

      <CloseIcon onClick={() => navigate("/")}>
        <IoIosArrowBack />
      </CloseIcon>

      <Content>
        <TotalCount>
          총 <span>{post.length}</span>건
        </TotalCount>

        {post &&
          post.map((post) => (
            <PostWrapper>
              <div className="post_no">게시물번호 {post.id}</div>
              <div className="time">{dateFormat(post.createdAt)}</div>
              <div className="company_name">{post.fromCompany.name}</div>
              <div className="title">{post.title}</div>
              <div className="pay">
                <span>{post.payType}</span> {intOfKr(post.pay)}원
              </div>
              <div className="address">
                <FaMapMarkerAlt style={{ marginRight: "6px" }} />
                {getSummaryAddress(post.fromCompany.address)}
              </div>
              <div className="day">
                <IoTimeSharp style={{ marginRight: "6px" }} />주
                {post.workingDay.length}일&nbsp;·&nbsp;
                {timeFormat(post.workingStartTime)}&nbsp;~&nbsp;
                {timeFormat(post.workingEndTime)}
              </div>
              <div className="content">
                <h3>지원 내용</h3>
                {post.content}
              </div>

              {post.jobPostSupports.length !== 0 ? (
                <>
                  <div className="support_count">
                    지원자 목록 ({post.jobPostSupports.length}명)
                  </div>
                  <SupportWrapper>
                    {post.jobPostSupports &&
                      post.jobPostSupports.map((support) => (
                        <li>
                          <div className="support_no">
                            지원번호 {support.id}
                          </div>
                          <table>
                            <tr>
                              <td>이름</td>
                              <td>
                                {support.fromUser.name} (
                                <b>
                                  {support.fromUser.sex &&
                                  support.fromUser.sex === "남자"
                                    ? "男"
                                    : "女"}
                                  ,&nbsp;
                                  {support.fromUser.birth
                                    .toString()
                                    .substr(0, 4)}
                                </b>
                                년생)
                              </td>
                            </tr>
                            <tr>
                              <td width={200}>휴대폰</td>
                              <td>{support.fromUser.phone}</td>
                            </tr>
                            <tr>
                              <td width={200}>이메일</td>
                              <td>{support.fromUser.email}</td>
                            </tr>
                            <tr>
                              <td width={200}>지원내용</td>
                              <td>{support.content}</td>
                            </tr>
                          </table>
                        </li>
                      ))}
                  </SupportWrapper>
                </>
              ) : (
                <div className="support_count">지원자 없음</div>
              )}

              <button
                className="delete_btn"
                value={post.id}
                onClick={onClickDelete}
              >
                삭제
              </button>
              <button value={post.id} onClick={onClickEdit}>
                수정
              </button>
              <button value={post.id} onClick={onClickDetail}>
                상세보기
              </button>
            </PostWrapper>
          ))}
      </Content>
    </Container>
  );
};

export default JobPostManage;
