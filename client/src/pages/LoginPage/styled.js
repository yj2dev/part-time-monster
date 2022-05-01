import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const CloseIcon = styled.div`
  position: absolute;
  top: 54px;
  right: 24px;
  cursor: pointer;
`;

export const Logo = styled.div`
  padding-bottom: 12px;
  img {
    width: 50px;
    margin-right: 16px;
  }
  h3 {
    margin: 0px;
    padding: 0px;
    font-family: "Black Han Sans", sans-serif;
    font-size: 50px;
    font-weight: 400;
    display: inline-block;
  }
  margin-bottom: 32px;
`;
export const UserTypeSection = styled.div`
  width: 640px;
  gap: 12px;
  display: flex;

  .user-type {
    height: 64px;
    font-size: 20px;
    width: 100%;
    cursor: pointer;
    color: #808080;
    background-color: transparent;
    border: 2px solid #dedede;
  }

  .select-private {
    color: #000000;
    border: 2px solid #fde000;
  }

  .select-company {
    color: #000000;
    border: 2px solid #3266cc;
    background-color: transparent;
  }
`;
export const UserLoginSection = styled.div`
  margin-top: 12px;
  width: 640px;

  table {
    border-collapse: collapse;
    width: 640px;

    tr {
      border: 2px solid #dedede;
    }
    td {
      border: 2px solid #dedede;
    }
    input {
      padding: 16px 12px;
      width: 600px;
      border: none;
      outline: none;
      background-color: transparent;
      font-size: 20px;
    }
  }
  button {
    width: 100%;
    height: 64px;
    border: 2px solid #dedede;
    border-width: 0 2px 2px 2px;
    outline: none;
    font-size: 20px;
    color: #000000;
    background-color: #fde000;
    cursor: pointer;
    &.login-company {
      background-color: #3266cc;
      color: #ffffff;
    }
  }
`;

export const Register = styled.div`
  margin-top: 48px;
  a {
    color: #3266cc;
    text-decoration: underline;
    font-weight: 800;
  }
`;
