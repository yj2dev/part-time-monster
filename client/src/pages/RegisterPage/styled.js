import styled from "styled-components";

export const Container = styled.div``;
export const CloseIcon = styled.div`
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 32px;
`;
export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border: none;
  height: 64px;
  background-color: #ffeb00;
  &.register-company {
    background-color: #3266cc;
    color: #ffffff;
  }
`;
export const SubTitle = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
`;
export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;

  .radio-user-type {
    margin: 24px 0;

    label {
      margin-right: 16px;
    }
    input[type="radio"] {
      margin: 0 8px 0 16px;
    }
  }

  .radio-register {
    label {
      margin-right: 16px;
    }
    input[type="radio"] {
      margin: 0 8px 0 16px;
    }
  }
  input[type="text"],
  input[type="password"] {
    width: 400px;
    font-size: 20px;
    border: none;
    outline: none;
  }
  table {
    width: 640px;
    border: none;
    margin-bottom: 24px;
  }
  table,
  tr {
    border: 1px solid #ababab;
  }
  td:first-child {
    padding-left: 12px;
  }
  td {
    height: 56px;
  }
  td span {
    font-size: 16px;
  }
  td select {
    font-size: 20px;
    outline: none;
    width: 200px;
    border: none;
  }
`;

export const RegisterSubmit = styled.div`
  width: 100%;
  position: fixed;
  background-color: #ffffff;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 84px;
  & button {
    font-size: 18px;
    cursor: pointer;
    width: 640px;
    height: 50px;
    border: none;
    outline: none;
    background-color: #ffeb00;
  }
  & button.register-company {
    background-color: #3266cc;
    color: #ffffff;
  }
`;

export const Space = styled.div`
  height: 100px;
`;
