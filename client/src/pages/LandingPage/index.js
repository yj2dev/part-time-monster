import { Container, JobPostWrapper } from "./styled";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
const LandingPage = () => {
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

  return (
    <Container>
      <Header />
      {jobPost &&
        jobPost.map((v) => <JobPostWrapper>{v.title}</JobPostWrapper>)}
    </Container>
  );
};

export default LandingPage;
