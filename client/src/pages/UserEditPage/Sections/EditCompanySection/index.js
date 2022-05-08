import { Container } from "./styled";
import { PostCodeButton, RegisterSubmit, SubTitle } from "../../styled";
import Modal from "../../../../components/modal";
import DaumPostcode from "react-daum-postcode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditCompanySection = ({ user, isCompany }) => {
  const navigate = useNavigate();
  const [onShowSelectPostCode, setOnShowSelectPostCode] = useState(false);

  // 기업정보수정
  const [companyNumber, setCompanyNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyCeoName, setCompanyCeoName] = useState("");
  const [companyContact, setCompanyContact] = useState("");
  const [companyAddress, setCompanyAddress] =
    useState("지역정보를 입력해주세요.");
  const [companySize, setCompanySize] = useState("스타트업");

  const setUser = (user) => {
    if (!user) navigate("/");

    if (user.isCompany) {
      setCompanyNumber(user.toCompany.number);
      setCompanyName(user.toCompany.name);
      setCompanyCeoName(user.toCompany.ceoName);
      setCompanyContact(user.toCompany.contact);
      setCompanyAddress(user.toCompany.address);
      setCompanySize(user.toCompany.size);
    }
  };

  function onSubmit() {
    if (!companyName || !companyCeoName || !companyContact || !companySize)
      return;

    const payload = {
      number: companyNumber,
      name: companyName,
      ceoName: companyCeoName,
      contact: companyContact,
      address: companyAddress,
      size: companySize,
      isCompany,
    };
    axios
      .patch(`/api/user/info`, payload)
      .then(({ data }) => {
        console.log("data >> ", data);
        if (data.success) {
          alert("기업정보가 성공적으로 수정되었습니다.");
        } else {
          alert("기업정보가 수정에 실패했습니다..");
        }
      })
      .catch((err) => {
        alert("기업정보가 수정에 실패했습니다..");
        console.log(err);
      });
  }

  useEffect(() => {
    setUser(user.isSignin.data);
  }, []);

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
      <SubTitle>기업정보수정</SubTitle>
      <table>
        <tr>
          <td width="200px">사업자번호 (수정불가)</td>
          <td>
            <input
              disabled={true}
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
              placeholder="연락처를 입력하세요(-제외)"
              value={companyContact}
              onChange={(e) => setCompanyContact(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>
            주소&nbsp;&nbsp;
            <PostCodeButton onClick={() => setOnShowSelectPostCode(true)}>
              지역정보 찾기
            </PostCodeButton>
          </td>
          <td>
            {companyAddress}
            <Modal
              show={onShowSelectPostCode}
              useCloseButton={false}
              close={() => setOnShowSelectPostCode(false)}
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
              <option selected={companySize === "스타트업"} value="스타트업">
                스타트업
              </option>
              <option selected={companySize === "중소기업"} value="중소기업">
                중소기업
              </option>
              <option selected={companySize === "중견기업"} value="중견기업">
                중견기업
              </option>
              <option selected={companySize === "대기업"} value="대기업">
                대기업
              </option>
            </select>
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
