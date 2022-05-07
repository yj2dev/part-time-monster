import {
  Container,
  ContainerTitle,
  CloseIcon,
  TotalCount,
  Content,
  PostWrapper,
} from "./styled";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IoIosArrowBack, IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { dateFormat, timeFormat } from "../../utils/time";
import getSummaryAddress from "../../utils/getSummaryAddress";
import { intOfKr, phoneFormat } from "../../utils/currency";
import { IoTimeSharp } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  Smoke,
  SupportModal,
  SupportModalCloseBtn,
} from "../JobPostDetailPage/styled";
import { RiSendPlaneFill } from "react-icons/ri";
import { useSelector } from "react-redux";

const JobPostSupportListPage = () => {
  const user = useSelector((state) => state.user);
  const currentUpdateSupportId = useRef(null);

  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [content, setContent] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    axios
      .get("/api/job-post/all/support")
      .then(({ data }) => {
        console.log("data >> ", data);
        if (data.success) {
          setPost(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const showUpdate = (e) => {
    const [supportId, index] = e.target.value.split("/");
    currentUpdateSupportId.current = supportId;
    setContent(post[index].content);
    setIsEdit((prev) => !prev);
  };

  const onClickDetail = (e) => {
    navigate(`/post/${e.target.value}`);
  };
  const onClickDelete = (e) => {
    axios
      .delete(`/api/job-post/${e.target.value}/support`)
      .then(({ data }) => {
        if (data.success) {
          navigate(`/`);
          navigate(`/post/support-list`);
        } else {
          alert("삭제에 실패했습니다.");
        }
      })
      .catch((err) => {
        alert("삭제에 실패했습니다.");
      });
  };
  const onClickUpdate = (e) => {
    const supportId = currentUpdateSupportId.current;
    axios
      .patch(`/api/job-post/${supportId}/support`, { content })
      .then(({ data }) => {
        if (data.success) {
          alert("수정 완료되었습니다.");
          navigate(`/`);
          navigate(`/post/support-list`);
        } else {
          alert("수정에 실패했습니다.");
        }
      })
      .catch((err) => {
        alert("수정에 실패했습니다.");
      });
  };
  return (
    <Container>
      <ContainerTitle>내가 지원한 알바</ContainerTitle>
      <CloseIcon onClick={() => navigate("/")}>
        <IoIosArrowBack />
      </CloseIcon>
      <Content>
        <TotalCount>
          총 <span>{post.length}</span>건의 알바가 있어요 😄
        </TotalCount>
        {post &&
          post.map((v, i) => (
            <PostWrapper>
              <div className="time">{dateFormat(v.createdAt)}</div>
              <div className="company_name">{v.toJobPost.fromCompany.name}</div>
              <div className="title">{v.toJobPost.title}</div>
              <div className="pay">
                <span>{v.toJobPost.payType}</span> {intOfKr(v.toJobPost.pay)}원
              </div>
              <div className="address">
                <FaMapMarkerAlt style={{ marginRight: "6px" }} />
                {getSummaryAddress(v.toJobPost.fromCompany.address)}
              </div>
              <div className="day">
                <IoTimeSharp style={{ marginRight: "6px" }} />주
                {v.toJobPost.workingDay.length}일&nbsp;·&nbsp;
                {timeFormat(v.toJobPost.workingStartTime)}&nbsp;~&nbsp;
                {timeFormat(v.toJobPost.workingEndTime)}
              </div>
              <div className="content">
                <h3>지원 내용</h3>
                {v.content}
              </div>

              <button
                className="delete_btn"
                value={v.id}
                onClick={onClickDelete}
              >
                삭제
              </button>
              <button value={`${v.id}/${i}`} onClick={showUpdate}>
                수정
              </button>
              <button value={v.id} onClick={onClickDetail}>
                상세보기
              </button>
            </PostWrapper>
          ))}
      </Content>

      <SupportModal id={isEdit && "active"}>
        <SupportModalCloseBtn
          onClick={() => {
            setIsEdit(false);
          }}
        >
          <IoIosClose />
        </SupportModalCloseBtn>
        <p>
          <RiSendPlaneFill />
          수정하기
        </p>
        <div className="user_info">
          {user && user.isSignin && (
            <tr>
              <td width={200}>지원자 성함</td>
              <td>{user && user.isSignin.data.name}</td>
            </tr>
          )}

          {user && user.isSignin && (
            <tr>
              <td width={200}>지원자 연락처</td>
              <td>{user && phoneFormat(user?.isSignin.data.phone)}</td>
            </tr>
          )}
        </div>
        <div className="support_length">{content.length} / 500</div>
        <textarea
          placeholder="남기실 메모를 작성해주세요."
          value={content}
          onChange={(e) => {
            if (e.target.value.length > 500) return;
            setContent(e.target.value);
          }}
        ></textarea>
        <button className="support_submit" onClick={onClickUpdate}>
          수정완료
        </button>
      </SupportModal>
      {isEdit && <Smoke />}
    </Container>
  );
};

export default JobPostSupportListPage;
