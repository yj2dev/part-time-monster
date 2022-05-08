import { Container } from "./styled";
import { RegisterSubmit, SubTitle } from "../../styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditCompanySection = ({ user, isCompany }) => {
  const navigate = useNavigate();

  // 비밀번호수정
  const [userId, setUserId] = useState("");
  const [userCurrentPassword, setUserCurrentPassword] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");

  const [error, setError] = useState({ passwordCheck: false });

  const setUser = (user) => {
    if (!user) navigate("/");

    setUserId(user.id);
  };
  useEffect(() => {
    setUser(user.isSignin.data);
  }, []);

  function onSubmit() {
    if (!userCurrentPassword || !userPassword || !userPasswordCheck) return;
    if (userPassword !== userPasswordCheck) {
      setError({ ...error, passwordCheck: true });
      return;
    } else setError({ ...error, passwordCheck: false });

    const payload = {
      currentPassword: userCurrentPassword,
      updatePassword: userPasswordCheck,
    };
    axios
      .patch(`/api/user/password`, payload)
      .then(({ data }) => {
        console.log("data >> ", data);
        if (data.success) {
          alert(
            "비밀번호가 성공적으로 수정되었습니다.\n확인을 위해 재로그인 해주세요."
          );
          navigate("/login");
        } else {
          alert("비밀번호 수정에 실패했습니다.");
        }
      })
      .catch((err) => {
        alert("비밀번호 수정에 실패했습니다.");
        console.log(err);
      });
  }

  return (
    <Container>
      <SubTitle>비밀번호수정</SubTitle>
      <table>
        <tr>
          <td width="200px">아이디 (수정불가)</td>
          <td>
            <input disabled={true} type="text" value={userId} />
          </td>
        </tr>
        <tr>
          <td>현재 비밀번호</td>
          <td>
            <input
              type="password"
              placeholder="4~15자 영문, 숫자"
              value={userCurrentPassword}
              onChange={(e) => setUserCurrentPassword(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>변경할 비밀번호</td>
          <td>
            <input
              type="password"
              placeholder="6~16자 영문, 숫자, 특수기호"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>
            {error.passwordCheck ? (
              <div style={{ color: "red" }}>
                <b>비밀번호 불일치</b>
              </div>
            ) : (
              <div>변경할 비밀번호 확인</div>
            )}
          </td>
          <td>
            <input
              type="password"
              placeholder="비밀번호 재확인"
              value={userPasswordCheck}
              onChange={(e) => setUserPasswordCheck(e.target.value)}
            />
          </td>
        </tr>
      </table>
      <RegisterSubmit>
        <button className={isCompany && "register-company"} onClick={onSubmit}>
          수정하기
        </button>
      </RegisterSubmit>
    </Container>
  );
};

export default EditCompanySection;
