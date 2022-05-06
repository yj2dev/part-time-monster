import { Container } from "./styled";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const JobPostDetailPage = () => {
  const { postId } = useParams();

  useEffect(() => {
    axios
      .get(`/api/job-post/${postId}`)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <Container>JobPostDetailPage</Container>;
};

export default JobPostDetailPage;
