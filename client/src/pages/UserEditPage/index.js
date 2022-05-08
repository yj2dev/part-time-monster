import { Container, TabMenu, Title } from "./styled";
import { IoIosArrowBack } from "react-icons/io";
import {
  CloseIcon,
  PostCodeButton,
  RegisterForm,
  RegisterSubmit,
  Space,
  SubTitle,
} from "./styled";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Modal from "../../components/modal";
import DaumPostcode from "react-daum-postcode";
import EditCompanySection from "./Sections/EditCompanySection";
import EditUserInfoSection from "./Sections/EditUserInfoSection";
import EditPasswordSection from "./Sections/EditPasswordSection";

const UserEditPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [activeMenu, setActiveMenu] = useState("1");
  const [isCompany, setIsCompany] = useState(false);

  const setUser = (user) => {
    if (!user) navigate("/");
    console.log("setUser user >> ", user);

    setIsCompany(user.isCompany ? true : false);
  };

  useEffect(() => {
    console.log("user >> ", user);
    if (user && !user.isSignin) navigate("/");
    setUser(user.isSignin.data);
  }, []);

  const onClickTabMenu = (e) => {
    console.log(activeMenu);
    setActiveMenu(e.target.value);
  };

  function onSubmitRegister() {
    return;
  }

  return (
    <Container>
      <Title className={isCompany && "register-company"}>
        {!isCompany ? "개인회원" : "기업회원"} 정보수정
        <CloseIcon onClick={() => navigate("/")}>
          <IoIosArrowBack />
        </CloseIcon>
      </Title>
      <TabMenu>
        <ul>
          <li
            id={isCompany && `company`}
            className={activeMenu == "1" && "active"}
            value="1"
            onClick={onClickTabMenu}
          >
            비밀번호수정
          </li>

          <li
            id={isCompany && `company`}
            className={activeMenu == "2" && "active"}
            value="2"
            onClick={onClickTabMenu}
          >
            개인정보수정
          </li>
          {isCompany && (
            <li
              id={isCompany && `company`}
              className={activeMenu == "3" && "active"}
              value="3"
              onClick={onClickTabMenu}
            >
              기업정보수정
            </li>
          )}
          <li
            id={isCompany && `company`}
            className={activeMenu == "4" && "active"}
            value="4"
            onClick={onClickTabMenu}
          >
            회원탈퇴신청
          </li>
        </ul>
      </TabMenu>
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
        {activeMenu == "1" && <EditPasswordSection user={user} />}

        {activeMenu == "2" && <EditUserInfoSection user={user} />}
        {isCompany && activeMenu == "3" && <EditCompanySection user={user} />}

        <Space />
      </RegisterForm>
      <RegisterSubmit>
        <button
          className={isCompany && "register-company"}
          onClick={onSubmitRegister}
        >
          수정하기
        </button>
      </RegisterSubmit>
    </Container>
  );
};

export default UserEditPage;
