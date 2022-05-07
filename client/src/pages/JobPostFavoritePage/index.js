import {
  Container,
  ContainerTitle,
  CloseIcon,
  PostWrapper,
  TotalCount,
  Content,
} from "./styled";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";

const JobPostFavorite = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);

  useEffect(() => {
    axios
      .get("/api/job-post/all/favorite")
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

  function onClickFavorite(e) {
    const postId = e.target.value;
    console.log("postId >> ", postId);
    axios
      .get(`/api/job-post/${postId}/favorite`)
      .then(({ data }) => {
        console.log("data >> ", data);
        if (data.success) {
          navigate("/");
          navigate("/post/favorite");
        } else {
          alert("관심 알바 해제에 실패했습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Container>
      <ContainerTitle>관심 알바</ContainerTitle>
      <CloseIcon onClick={() => navigate("/")}>
        <IoIosArrowBack />
      </CloseIcon>

      <Content>
        <TotalCount>
          총 <span>{post.length}</span>건
        </TotalCount>

        {post &&
          post.map((v) => (
            <PostWrapper>
              <div className="company_name">{v.toJobPost.fromCompany.name}</div>
              <div className="post_title">{v.toJobPost.title}</div>
              <div className="pay">
                <span>{v.toJobPost.payType}</span> {v.toJobPost.pay}
              </div>
              <button
                className="favorite_btn"
                value={v.toJobPostId}
                onClick={onClickFavorite}
              >
                <AiFillStar />
              </button>
            </PostWrapper>
          ))}
      </Content>
    </Container>
  );
};

export default JobPostFavorite;
