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
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const EditJobPostWritePage = () => {
  const navigate = useNavigate();

  // 근무 조건
  const [workingPeriod, setWorkingPeriod] = useState("");
  const [workingDay, setWorkingDay] = useState("");
  const workingDayList = useRef(["월", "화", "수", "목", "금", "토", "일"]);
  const isWorkingDay = useRef(Array.from({ length: 7 }, () => false));
  const [workingStartTime, setWorkingStartTime] = useState("");
  const createTimeList = () => {
    return Array.from({ length: 48 }, (_, i) => {
      i *= 30;
      const hour = parseInt(i / 60).toString();
      const fHour = hour < 10 ? `0${hour}` : hour;
      const min = (i % 60).toString();
      const fMin = min < 10 ? `0${min}` : min;
      return `${fHour}:${fMin}`;
    });
  };

  const workingTimeList = useRef(createTimeList());
  const [workingEndTime, setWorkingEndTime] = useState("");
  const [pay, setPay] = useState(9160);
  const [payType, setPayType] = useState("시급");
  const payTypeList = useRef(["시급", "주급", "월급", "건당", "상의후 결정"]);

  // 자격 조건
  const [sex, setSex] = useState("무관");
  const sexList = useRef(["무관", "남자", "여자"]);
  const [age, setAge] = useState("무관");
  const ageList = useRef(["무관", "성인", "20대", "30대", "40대", "50대 이상"]);
  const [education, setEducation] = useState("무관");
  const educationList = useRef(["무관", "중졸", "고졸", "대졸"]);

  // 모집 조건
  const [recruitNumber, setRecruitNumber] = useState("");
  const [recruitStartAt, setRecruitStartAt] = useState(
    moment().format("YYYY-MM-DD")
  );

  const [recruitEndAt, setRecruitEndAt] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [params] = useSearchParams();
  const [postId] = useState(params.get("no"));

  useEffect(() => {
    getPostDetail(postId);
  }, []);

  const setWorkingDayState = (days) => {
    isWorkingDay.current = Array.from({ length: 7 }, () => false);
    days = days.split("");

    for (let i = 0; i < days.length; i++) {
      console.log(i);
      switch (days[i]) {
        case "월":
          isWorkingDay.current[0] = true;
          break;
        case "화":
          isWorkingDay.current[1] = true;
          break;
        case "수":
          isWorkingDay.current[2] = true;
          break;
        case "목":
          isWorkingDay.current[3] = true;
          break;
        case "금":
          isWorkingDay.current[4] = true;
          break;
        case "토":
          isWorkingDay.current[5] = true;
          break;
        case "일":
          isWorkingDay.current[6] = true;
          break;
        default:
          break;
      }
    }
  };

  function getPostDetail(postId) {
    axios
      .get(`/api/job-post/${postId}/detail`)
      .then(({ data }) => {
        console.log("data >> ", data);
        if (data.success) {
          setWorkingPeriod(data.data.workingPeriod);
          setWorkingDayState(data.data.workingDay);
          setWorkingDay(data.data.workingDay);
          setWorkingStartTime(data.data.workingStartTime.substr(0, 5));
          setWorkingEndTime(data.data.workingEndTime.substr(0, 5));
          setPay(data.data.pay);
          setPayType(data.data.payType);
          setSex(data.data.sex);
          setAge(data.data.age);
          setEducation(data.data.education);
          setRecruitNumber(data.data.recruitNumber);
          setRecruitStartAt(data.data.recruitStartAt);
          setRecruitEndAt(new Date(data.data.recruitEndAt));
          setTitle(data.data.title);
          setDescription(data.data.content);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onChangeWorkingDay = (e) => {
    const dayArr = workingDayList;
    const findIndex = dayArr.current.findIndex((v) => v === e.target.value);

    if (e.target.checked) isWorkingDay.current[findIndex] = true;
    else isWorkingDay.current[findIndex] = false;

    let resultWorkingDay = "";
    isWorkingDay.current.forEach((day, i) => {
      if (day) {
        resultWorkingDay += `${workingDayList.current[i]}`;
      }
    });
    setWorkingDay(resultWorkingDay);
  };

  const getFormatDate = (date) => {
    let year = date.getFullYear();
    let month = 1 + date.getMonth();
    month = month >= 10 ? month : "0" + month;
    let day = date.getDate();
    day = day >= 10 ? day : "0" + day;
    return `${year}-${month}-${day}`;
  };

  function onSubmitWrite() {
    const payload = {
      workingPeriod,
      workingDay,
      workingStartTime,
      workingEndTime,
      pay,
      payType,
      sex,
      age,
      education,
      recruitNumber,
      recruitStartAt,
      recruitEndAt: getFormatDate(recruitEndAt),
      title,
      description,
    };

    console.log("payload >> ", payload);

    axios
      .post("/api/job-post/create", payload)
      .then(({ data }) => {
        console.log("data >> ", data);
        if (data.success) {
          alert("채용게시글이 작성되었습니다..");
          navigate("/post/manage");
          return;
        }
        alert("채용게시글 작성에 실패했습니다.\n잠시후에 다시 시도해주세요");
      })
      .catch((err) => {
        console.error(err);
        alert("채용게시글 작성에 실패했습니다.\n잠시후에 다시 시도해주세요");
      });
  }

  return (
    <Container>
      <Title>
        채용게시글 수정
        <CloseIcon onClick={() => navigate("/post/manage")}>
          <IoIosArrowBack />
        </CloseIcon>
      </Title>

      <WriteForm>
        <SubTitle>근무 조건</SubTitle>
        <table>
          <tr>
            <td width="200px">근무기간</td>
            <td>
              <input
                type="text"
                placeholder="EX) 15일, 1달, 3달"
                value={workingPeriod}
                onChange={(e) => setWorkingPeriod(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>근무요일</td>
            <td className="working_day">
              {workingDayList.current.map((item, idx) => (
                <>
                  <input
                    type="checkbox"
                    id={item}
                    value={item}
                    onClick={onChangeWorkingDay}
                    checked={isWorkingDay.current[idx]}
                  />
                  <label htmlFor={item}>{item}</label>
                </>
              ))}
            </td>
          </tr>
          <tr>
            <td>근무시간</td>
            <td className="working_time">
              <select
                value={workingStartTime}
                onChange={(e) => setWorkingStartTime(e.target.value)}
              >
                {workingTimeList.current.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
              에서
              <select
                value={workingEndTime}
                onChange={(e) => setWorkingEndTime(e.target.value)}
              >
                {workingTimeList.current.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
              까지
            </td>
          </tr>
          <tr>
            <td>급여</td>
            <td className="pay">
              <select
                value={payType}
                onChange={(e) => setPayType(e.target.value)}
              >
                {payTypeList.current.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="EX) 9160"
                value={pay}
                onChange={(e) => setPay(e.target.value)}
              />
              원
            </td>
          </tr>
        </table>

        <SubTitle>자격 조건</SubTitle>
        <table>
          <tr>
            <td width="200px">성별</td>
            <td>
              <select value={sex} onChange={(e) => setSex(e.target.value)}>
                {sexList.current.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>연령</td>
            <td>
              <select value={age} onChange={(e) => setAge(e.target.value)}>
                {ageList.current.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>학력</td>
            <td>
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              >
                {educationList.current.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </td>
          </tr>
        </table>

        <SubTitle>모집 조건</SubTitle>
        <table>
          <tr>
            <td width="200px">모집인원</td>
            <td className="recruit_number">
              <input
                type="text"
                placeholder="EX) 3"
                value={recruitNumber}
                onChange={(e) => setRecruitNumber(e.target.value)}
              />
              명
            </td>
          </tr>
          <tr>
            <td>모집기간</td>
            <td className="recruit_term">
              <div>시작일</div>
              {recruitStartAt}
              <div className="recruit_end_at">
                마감일:
                <DatePicker
                  selected={recruitEndAt}
                  onChange={(date) => {
                    if (new Date() > date) {
                      alert("마감일은 시작일보다 이전일 수 없습니다.");
                      return;
                    }
                    setRecruitEndAt(date);
                  }}
                  dateFormat="yyyy-MM-dd"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>제목</td>
            <td>
              <input
                type="text"
                placeholder="제목을 입력해주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </td>
          </tr>
        </table>

        <table className="description_input">
          <tr>
            <td>상세내용</td>
          </tr>
          <tr>
            <textarea
              placeholder="상세내용을 입력해주세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
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

export default EditJobPostWritePage;
