import { Container } from "./styled";
import { useEffect, useState } from "react";
import { RegisterSubmit, SubTitle } from "../../styled";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditUserInfoSection = ({ user, isCompany }) => {
  const navigate = useNavigate();
  // 개인정보수정
  const [userName, setUserName] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [userIsWoman, setUserIsWoman] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const setUser = (user) => {
    if (!user) navigate("/");

    setUserName(user.name);
    setUserBirth(user.birth);
    setUserIsWoman(user.sex === "남자" ? false : true);
    setUserEmail(user.email);
    setUserPhone(user.phone);
  };

  useEffect(() => {
    setUser(user.isSignin.data);
  }, []);

  function onSubmit() {
    if (!userName || !userBirth || !userEmail || !userPhone) return;

    const payload = {
      name: userName,
      birth: userBirth,
      sex: userIsWoman ? "여자" : "남자",
      email: userEmail,
      phone: userPhone,
    };
    axios
      .patch(`/api/user/info`, payload)
      .then(({ data }) => {
        console.log("data >> ", data);
        if (data.success) {
          alert("개인정보가 성공적으로 수정되었습니다.");
        } else {
          alert("개인정보가 수정에 실패했습니다..");
        }
      })
      .catch((err) => {
        alert("개인정보가 수정에 실패했습니다..");
        console.log(err);
      });
  }

  return (
    <Container>
      <SubTitle>개인정보수정</SubTitle>
      <table>
        <tr>
          <td width="200px">이름</td>
          <td>
            <input
              type="text"
              placeholder="이름을 입력하세요"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>
            생년월일<span>(선택)</span>
          </td>
          <td>
            <input
              type="text"
              placeholder="YYYYMMDD / EX) 19990806"
              value={userBirth}
              onChange={(e) => setUserBirth(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>
            성별<span>(선택)</span>
          </td>
          <td>
            <div className="radio-register">
              <input
                type="radio"
                id="selected-man"
                name="user-sex"
                value="남자"
                checked={!userIsWoman}
                onClick={() => setUserIsWoman(false)}
              />
              <label htmlFor="selected-man">남자</label>
              <input
                type="radio"
                id="selected-woman"
                name="user-sex"
                value="여자"
                checked={userIsWoman}
                onClick={() => setUserIsWoman(true)}
              />
              <label htmlFor="selected-woman">여자</label>
            </div>
          </td>
        </tr>
        <tr>
          <td>이메일</td>
          <td>
            <input
              type="text"
              placeholder="EX) example@email.com"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>휴대폰</td>
          <td>
            <input
              type="text"
              placeholder="EX) 01012345678"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
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

export default EditUserInfoSection;
