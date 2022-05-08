import { Container } from "./styled";
import { RegisterSubmit, SubTitle } from "../../styled";

const DeleteUserSection = ({ user, isCompany }) => {
  // 회원탈퇴신청
  function onSubmit() {
    return;
  }

  return (
    <Container>
      <SubTitle>회원탈퇴신청</SubTitle>
      <RegisterSubmit>
        <button className={isCompany && "register-company"} onClick={onSubmit}>
          탈퇴하기
        </button>
      </RegisterSubmit>
    </Container>
  );
};

export default DeleteUserSection;
