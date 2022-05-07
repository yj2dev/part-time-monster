import { Container, SearchMessage } from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../Layouts/Header";
import { JobPostWrapper, SupportButton } from "../LandingPage/styled";
import getSummaryAddress from "../../utils/getSummaryAddress";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [post, setPost] = useState(null);

  function getSearchResult() {
    const keyword = searchParams.get("keyword");
    console.log(searchParams.get("keyword"));
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
    console.log("검색");
    getSearchResult();
  }, []);

  const onClickDetail = (e) => {
    navigate(`/post/${e.target.value}`);
  };

  return (
    <>
      <Header />
      {/*<SearchMessage>총 {post.length}건의 알바가 있어요.</SearchMessage>*/}
      <Container>
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
      </Container>
    </>
  );
};

export default SearchPage;
