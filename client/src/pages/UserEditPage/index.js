import { Container, TabMenu, Title } from "./styled";
import { IoIosArrowBack } from "react-icons/io";
import { CloseIcon, RegisterForm, Space } from "./styled";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EditCompanySection from "./Sections/EditCompanySection";
import EditUserInfoSection from "./Sections/EditUserInfoSection";
import EditPasswordSection from "./Sections/EditPasswordSection";
import DeleteUserSection from "./Sections/DeleteUserSection";

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
    setActiveMenu(e.target.value);
  };

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
            className={activeMenu.toString() === "1" && "active"}
            value="1"
            onClick={onClickTabMenu}
          >
            비밀번호수정
          </li>
          <li
            id={isCompany && `company`}
            className={activeMenu.toString() === "2" && "active"}
            value="2"
            onClick={onClickTabMenu}
          >
            개인정보수정
          </li>
          {isCompany && (
            <li
              id={isCompany && `company`}
              className={activeMenu.toString() === "3" && "active"}
              value="3"
              onClick={onClickTabMenu}
            >
              기업정보수정
            </li>
          )}
          <li
            id={isCompany && `company`}
            className={activeMenu.toString() === "4" && "active"}
            value="4"
            onClick={onClickTabMenu}
          >
            회원탈퇴신청
          </li>
        </ul>
      </TabMenu>
      <RegisterForm>
        {activeMenu.toString() === "1" && (
          <EditPasswordSection user={user} isCompany={isCompany} />
        )}
        {activeMenu.toString() === "2" && (
          <EditUserInfoSection user={user} isCompany={isCompany} />
        )}
        {isCompany && activeMenu.toString() === "3" && (
          <EditCompanySection user={user} isCompany={isCompany} />
        )}
        {activeMenu.toString() === "4" && (
          <DeleteUserSection user={user} isCompany={isCompany} />
        )}
        <Space />
      </RegisterForm>
    </Container>
  );
};

export default UserEditPage;
