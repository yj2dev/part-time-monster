import styled from "styled-components";

export const Container = styled.div`
  background-color: #ffffff;
  position: absolute;
  top: 0px;
  width: 100%;
  height: 200px;
  font-size: 32px;
  border: none;
  border-radius: 0 0 50px 50px;
  box-shadow: 0px 5px 5px 2px #c1c2c6;

  display: flex;
  flex-direction: column;
  align-items: center;

  & a {
    color: #474c59;
    text-decoration: none;
  }
  & .btn_logout {
    position: absolute;
    top: 380px;
    background-color: #fafbfd;
    width: 600px;
    color: #737884;
    font-size: 16px;
    font-weight: 800;
    height: 50px;
    border-radius: 25px 25px 25px 25px;
    outline: none;
    border: none;
    cursor: pointer;
  }
`;
export const ServiceWrapper = styled.div`
  position: absolute;
  top: 130px;
  border: none;
  box-shadow: 0px 4px 5px 1px #c1c2c6;
  border-radius: 35px;
  width: 600px;
  height: 280px;
  background-color: #fff231;
  padding: 20px;

  .info {
    background-color: #faea00;
    width: 600px;
    border-radius: 25px;
  }
  .profile-img {
    & img {
      width: 56px;
      height: 56px;
      margin-right: 12px;
      border-radius: 24px;
    }
  }
  .name {
    padding: 0 0 24px 0;
  }
  .profile {
    padding: 24px 32px;
    display: flex;
    align-items: center;
  }
  .update-account-link {
    position: absolute;
    top: 80px;
    left: 122px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .my-menu {
    display: flex;
    justify-content: center;
    //border: 1px solid black;
  }
  .my-menu-item {
    width: 100%;
    //border: 1px solid black;
    display: flex;
    align-items: center;
    padding: 30px 0 30px 12px;
    cursor: pointer;
  }
`;
export const Badge = styled.div`
  margin-left: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 12px 12px 0px 12px;
  font-size: 24px;
  color: #ffffff;
  box-shadow: 4px 4px 5px 1px rgba(0, 0, 0, 0.3);
  position: absolute;
  width: 200px;
  height: 50px;
  top: 50px;
  right: -18px;

  &::before {
    content: "";
    position: absolute;
    border-radius: 0 0 12px 0;
    bottom: -18px;
    right: 0;
    width: 18px;
    height: 18px;
    background-color: #3266cc;
  }

  &::after {
    content: "";
    position: absolute;
    border-radius: 0 12px 12px 0;
    bottom: -14px;
    right: 4px;
    width: 14px;
    height: 12px;
    background-color: #00b3ed;
  }

  &.private-badge::before {
    background-color: #f66b0e;
  }

  &.private-badge::after {
    background-color: #ff9f61;
  }

  &.private-badge {
    background-color: #f66b0e;
  }

  &.company-badge {
    background-color: #3266cc;
  }
`;
