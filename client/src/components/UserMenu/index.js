import { Container } from "./styled";
import axios from "axios";

const UserMenu = ({ user }) => {
  function onClickLogout() {
    axios.get("/api/user/logout").then((res) => {
      console.log(res);
    });
  }
  return (
    <Container>
      <button onClick={onClickLogout}>로그아웃</button>

      {user.name}
    </Container>
  );
};

export default UserMenu;
