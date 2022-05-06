import styled from "styled-components";

export const Container = styled.div`
  background-color: #ffffff;
  position: absolute;
  top: 0px;
  width: 100%;
  height: 300px;
  font-size: 32px;
  border: none;
  border-radius: 0 0 50px 50px;
  box-shadow: 0px 8px 5px 1px #c1c2c6;
  display: flex;
  flex-direction: column;
  align-items: center;

  & a {
    color: #474c59;
    text-decoration: none;
  }
  & .btn_logout {
    position: absolute;
    top: 700px;
    background-color: #fafbfd;
    width: 120px;
    color: #737884;
    font-size: 16px;
    font-weight: 800;
    height: 50px;
    border-radius: 12px;
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
  height: 500px;
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
  .badge {
    margin-left: 12px;
    display: inline-block;
    text-align: center;
    padding: 5px 10px;
    border-radius: 12px;
    background-color: green;
    font-size: 18px;
    color: #ffffff;
    box-shadow: 4px 4px 5px 1px rgba(0, 0, 0, 0.3);
  }
  .private-badge {
    background-color: #f66b0e;
  }
  .company-badge {
    background-color: #3266cc;
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
