import { Container, DeleteAccountTitle, WarningMessage } from "./styled";
import { RegisterSubmit } from "../../styled";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";

const DeleteUserSection = ({ user, isCompany }) => {
  const navigate = useNavigate();

  // 회원탈퇴신청
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [password, setPassword] = useState();

  const setUser = (user) => {
    if (!user) navigate("/");
    setName(user.name);
  };
  useEffect(() => {
    setUser(user.isSignin.data);
  }, []);

  function onSubmit() {
    if (!id || !password) return;

    const payload = {
      id,
      password,
      isCompany: isCompany ? 1 : 0,
    };
    axios
      .delete(`/api/user/account`, { data: { ...payload } })
      .then((res) => {
        console.log("res >> ", res);
        if (res.data.success) {
          alert(
            "회원탈퇴가 완료되었습니다.\n그동안 알바몬스터를 이용해주셔서 감사합니다😀"
          );
          navigate("/");
        } else {
          alert("회원탈퇴에 실패했습니다.\n잠시 후 다시 시도해주세요.");
        }
      })
      .catch((err) => {
        alert("회원탈퇴에 실패했습니다.\n잠시 후 다시 시도해주세요.");
        console.log(err);
      });
  }
  return (
    <Container>
      <WarningMessage>
        <IoIosWarning />
        &nbsp;계정을 탈퇴하면 되돌릴 수 없습니다. 신중히 생각해주세요.
      </WarningMessage>
      <DeleteAccountTitle>회원탈퇴신청</DeleteAccountTitle>
      <div className="desc">
        <span>{name}</span> 님의 계정 정보를 입력해주세요.
      </div>
      <table>
        <tr>
          <td width="200px">아이디</td>
          <td>
            <input
              type="text"
              placeholder="아이디를 입력해주세요."
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td width="200px">비밀번호</td>
          <td>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </td>
        </tr>
      </table>
      <RegisterSubmit>
        <button className={isCompany && "register-company"} onClick={onSubmit}>
          탈퇴하기
        </button>
      </RegisterSubmit>
    </Container>
  );
};

export default DeleteUserSection;
