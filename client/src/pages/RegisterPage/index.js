import {
  CloseIcon,
  Container,
  RegisterForm,
  RegisterSubmit,
  Space,
  SubTitle,
  Title,
} from "./styled";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import { useState } from "react";
import axios from "axios";
import Modal from "../../components/modal";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isCompany, setIsCompany] = useState(false);
  const [onShowSelectPostCode, setOnShowSelectPostCode] = useState(false);

  // 계정 정보
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");

  // 사용자 정보
  const [userName, setUserName] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [userIsWoman, setUserIsWoman] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  // 기업 정보
  const [companyNumber, setCompanyNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyCeoName, setCompanyCeoName] = useState("");
  const [companyContact, setCompanyContact] = useState("");
  const [companyAddress, setCompanyAddress] =
    useState("지역정보를 입력해주세요.");
  const [companySize, setCompanySize] = useState("스타트업");

  const [error, setError] = useState({ passwordCheck: false });

  function onSubmitRegister() {
    if (userPassword !== userPasswordCheck) {
      setError({ ...error, passwordCheck: true });
      return;
    } else setError({ ...error, passwordCheck: false });

    let payload = {
      id: userId,
      password: userPassword,
      name: userName,
      birth: userBirth,
      sex: !userIsWoman ? "남자" : "여자",
      email: userEmail,
      phone: userPhone,
      isCompany: !isCompany ? 0 : 1,
    };
    if (isCompany) {
      payload = {
        ...payload,
        toCompanyId: companyNumber,
        companyName,
        companyCeoName,
        companyContact,
        companyAddress,
        companySize,
      };
    }

    console.log("paylaod >> ", payload);

    axios
      .post("/api/user/register", payload)
      .then((data) => {
        if (data.data.success) {
          alert("회원가입이 완료되었습니다.");
          navigate("/");
          return;
        }
        alert("회원가입에 실패했습니다.");
      })
      .catch((err) => {
        console.error(err);
        alert("회원가입에 실패했습니다.");
      });
  }

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setOnShowSelectPostCode(false);
    setCompanyAddress(fullAddress);
  };

  return (
    <Container>
      <Title className={isCompany && "register-company"}>
        {!isCompany ? "개인회원" : "기업회원"} 가입
        <CloseIcon onClick={() => navigate("/")}>
          <IoIosArrowBack />
        </CloseIcon>
      </Title>
      <RegisterForm>
        <div className="radio-user-type">
          <input
            type="radio"
            id="selected-private"
            name="register-type"
            value="개인회원"
            checked={!isCompany}
            onClick={() => setIsCompany(false)}
          />
          <label htmlFor="selected-private">개인회원</label>
          <input
            type="radio"
            id="selected-company"
            name="register-type"
            value="기업회원"
            checked={isCompany}
            onClick={() => setIsCompany(true)}
          />
          <label htmlFor="selected-company">기업회원</label>
        </div>
        <SubTitle>계정 정보</SubTitle>
        <table>
          <tr>
            <td width="200px">아이디</td>
            <td>
              <input
                type="text"
                placeholder="4~15자 영문, 숫자"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>비밀번호</td>
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
              {error.passwordCheck && (
                <div style={{ color: "red" }}>
                  <b>비밀번호 불일치</b>
                </div>
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
        <SubTitle>회원 정보</SubTitle>
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
        {isCompany && (
          <>
            <SubTitle>기업 정보</SubTitle>
            <table>
              <tr>
                <td width="200px">사업자번호</td>
                <td>
                  <input
                    type="text"
                    placeholder="1122334455"
                    value={companyNumber}
                    onChange={(e) => setCompanyNumber(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>회사명</td>
                <td>
                  <input
                    type="text"
                    placeholder="회사명을 입력하세요"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>대표자명</td>
                <td>
                  <input
                    type="text"
                    placeholder="대표자명을 입력하세요"
                    value={companyCeoName}
                    onChange={(e) => setCompanyCeoName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>연락처</td>
                <td>
                  <input
                    type="text"
                    placeholder="연락처를 입력하세요"
                    value={companyContact}
                    onChange={(e) => setCompanyContact(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  주소&nbsp;&nbsp;
                  <button onClick={() => setOnShowSelectPostCode(true)}>
                    지역정보 찾기
                  </button>
                </td>
                <td>
                  {companyAddress}
                  <Modal
                    show={onShowSelectPostCode}
                    useCloseButton={false}
                    style={{ width: "550px" }}
                  >
                    <DaumPostcode onComplete={handleComplete} />
                  </Modal>
                </td>
              </tr>
              <tr>
                <td>회사규모</td>
                <td>
                  <select
                    name="company-size"
                    onChange={(e) => setCompanySize(e.target.value)}
                  >
                    <option value="스타트업">스타트업</option>
                    <option value="중소기업">중소기업</option>
                    <option value="중견기업">중견기업</option>
                    <option value="대기업">대기업</option>
                  </select>
                </td>
              </tr>
            </table>
          </>
        )}
        <Space />
      </RegisterForm>
      <RegisterSubmit>
        <button
          className={isCompany && "register-company"}
          onClick={onSubmitRegister}
        >
          가입하기
        </button>
      </RegisterSubmit>
    </Container>
  );
};

export default RegisterPage;
