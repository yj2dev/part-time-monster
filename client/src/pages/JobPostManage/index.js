import {
  CloseIcon,
  Container,
  ContainerTitle,
  Content,
  PostWrapper,
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
          post.map((v, i) => (
            <PostWrapper>
              <div className="time">{dateFormat(v.createdAt)}</div>
              <div className="company_name">{v.fromCompany.name}</div>
              <div className="title">{v.title}</div>
              <div className="pay">
                <span>{v.payType}</span> {intOfKr(v.pay)}원
              </div>
              <div className="address">
                <FaMapMarkerAlt style={{ marginRight: "6px" }} />
                {getSummaryAddress(v.fromCompany.address)}
              </div>
              <div className="day">
                <IoTimeSharp style={{ marginRight: "6px" }} />주
                {v.workingDay.length}일&nbsp;·&nbsp;
                {timeFormat(v.workingStartTime)}&nbsp;~&nbsp;
                {timeFormat(v.workingEndTime)}
              </div>
              <div className="content">
                <h3>지원 내용</h3>
                {v.content}
              </div>

              <button className="delete_btn" value={v.id} onClick={null}>
                삭제
              </button>
              <button value={`${v.id}/${i}`} onClick={null}>
                수정
              </button>
              <button value={v.id} onClick={null}>
                상세보기
              </button>
            </PostWrapper>
          ))}
      </Content>
    </Container>
  );
};

export default JobPostManage;
