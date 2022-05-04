import {
  CloseIcon,
  Container,
  Space,
  SubTitle,
  Title,
  WriteForm,
  WriteSubmit,
} from "./styled";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const JobPostWritePage = () => {
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().substr(0, 10).replaceAll("-", "/")
  );
  const [startDate, setStartDate] = useState(new Date());

  // 근무 조건
  const [workingPeriod, setWorkingPeriod] = useState("");
  const [workingDay, setWorkingDay] = useState("");
  const [workingStartTime, setWorkingStartTime] = useState("");
  const [workingEndTime, setWorkingEndTime] = useState("");
  const [pay, setPay] = useState("");
  const [payType, setPayType] = useState("");

  // 자격 조건
  const [userName, setUserName] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [userIsWoman, setUserIsWoman] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  // 모집 조건
  const [companyNumber, setCompanyNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyCeoName, setCompanyCeoName] = useState("");
  const [companyContact, setCompanyContact] = useState("");
  const [companyAddress, setCompanyAddress] =
    useState("지역정보를 입력해주세요.");
  const [companySize, setCompanySize] = useState("스타트업");

  const onChangeDate = (date) => {
    const nowDate = new Date();
    console.log(nowDate);
    console.log("date >> ", date);
  };

  function onSubmitWrite() {
    const payload = {};

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

  return (
    <Container>
      <Title>
        채용게시글 작성
        <CloseIcon onClick={() => navigate("/")}>
          <IoIosArrowBack />
        </CloseIcon>
      </Title>

      <WriteForm>
        <SubTitle>근무 조건</SubTitle>
        <table>
          <tr>
            <td width="200px">근무기간</td>
            <td>
              <input type="text" placeholder="EX) 15일, 1달, 3달" />
            </td>
          </tr>
          <tr>
            <td>근무요일</td>
            <td className="working_day">
              <input type="checkbox" id="monday" />
              <label htmlFor="monday">월</label>

              <input type="checkbox" id="tuesday" />
              <label htmlFor="tuesday">화</label>

              <input type="checkbox" id="wednesday" />
              <label htmlFor="wednesday">수</label>

              <input type="checkbox" id="thursday" />
              <label htmlFor="thursday">목</label>

              <input type="checkbox" id="friday" />
              <label htmlFor="friday">금</label>

              <input type="checkbox" id="saturday" />
              <label htmlFor="saturday">토</label>

              <input type="checkbox" id="sunday" />
              <label htmlFor="sunday">일</label>
            </td>
          </tr>
          <tr>
            <td>근무시간</td>
            <td>
              <input type="text" placeholder="EX) 09:00 ~ 12:30" />
            </td>
          </tr>
          <tr>
            <td>급여</td>
            <td>
              <input type="text" placeholder="EX) 9160" />
            </td>
          </tr>
        </table>

        <SubTitle>자격 조건</SubTitle>
        <table>
          <tr>
            <td width="200px">성별</td>
            <td>
              <input type="text" placeholder="EX) 무관" />
            </td>
          </tr>
          <tr>
            <td>연령</td>
            <td>
              <input type="text" placeholder="EX) 무관" />
            </td>
          </tr>
          <tr>
            <td>학력</td>
            <td>
              <input type="text" placeholder="EX) 무관" />
            </td>
          </tr>
        </table>

        <SubTitle>모집 조건</SubTitle>
        <table>
          <tr>
            <td width="200px">모집인원</td>
            <td>
              <input type="text" placeholder="EX) 3명" />
            </td>
          </tr>
          <tr>
            <td>모집기간</td>
            <td>
              {/*<input type="text" placeholder="EX) 작성일로부터 30일" />*/}
              {currentDate}
              <DatePicker selected={startDate} onChange={onChangeDate} />
            </td>
          </tr>
          <tr>
            <td>제목</td>
            <td>
              <input type="text" placeholder="제목을 입력해주세요" />
            </td>
          </tr>
        </table>

        <table className="description_input">
          <tr>
            <td>상세내용</td>
          </tr>
          <tr>
            <textarea placeholder="상세내용을 입력해주세요" />
          </tr>
        </table>

        <Space />
      </WriteForm>
      <WriteSubmit>
        <button onClick={onSubmitWrite}>작성하기</button>
      </WriteSubmit>
    </Container>
  );
};

export default JobPostWritePage;
