import { Container } from "./styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authUser } from "../../_actions/userActions";

const UserMenu = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onClickLogout() {
    axios.get("/api/user/logout").then(({ data }) => {
      if (data.success) {
        dispatch(authUser());
        navigate("/login");
        navigate("/");
      }
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
