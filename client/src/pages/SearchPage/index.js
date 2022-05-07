import { Container, SearchMessage } from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [post, setPost] = useState(null);

  function getSearchResult() {
    const keyword = searchParams.get("keyword");
    console.log(searchParams.get("keyword"));
    axios
      .get(`/api/job-post/${keyword}/search`)
      .then(({ data }) => {
        console.log("data >> ", data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getSearchResult();
  }, []);
  return (
    <Container>
      <h3>Bbb</h3>
      {/*<SearchMessage>총 {post.length}건의 알바가 있어요.</SearchMessage>*/}
    </Container>
  );
};

export default SearchPage;
