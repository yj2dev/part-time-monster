import { Container, JobPostWrapper, SupportButton, SendIcon } from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { RiSendPlaneFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const Contents = () => {
  const navigate = useNavigate();
  const [jobPost, setJobPost] = useState();

  useEffect(() => {
    axios
      .get("/api/job-post/all")
      .then(({ data }) => {
        if (data.success) {
          setJobPost(data.data);
          console.log(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getSummaryAddress = (address) => {
    address = address.split(" ");
    return `${address[0]} ${address[1]}`;
  };
  const onClickDetail = (e) => {
    navigate(`/post/${e.target.value}`);
  };

  return (
    <Container>
      {jobPost &&
        jobPost.map((v) => (
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
  );
};

export default Contents;
