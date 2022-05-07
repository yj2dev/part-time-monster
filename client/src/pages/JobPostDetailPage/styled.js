import styled from "styled-components";

export const Container = styled.div`
  .detail_page_title {
    display: flex;
    align-items: center;
    border-bottom: 2px solid #dadada;
    height: 56px;
    font-family: "Black Han Sans", sans-serif;
    font-size: 32px;
    padding: 8px 0 0 64px;
  }
  .favorite {
    cursor: pointer;
    position: absolute;
    top: 12px;
    right: 32px;
    font-size: 32px;
  }
`;

export const CloseIcon = styled.div`
  cursor: pointer;
  position: absolute;
  top: 11px;
  left: 16px;
  font-size: 32px;
`;
export const JobPostWrapper = styled.div`
  font-size: 20px;
  font-weight: 800;
  .content {
    background-color: #ffffff;
    padding: 30px 24px;
    margin-bottom: 24px;
    box-shadow: 0px 2px 4px 1px #cccccc;
    .sub_title {
      font-size: 24px;
      margin-bottom: 24px;
    }
    table {
      font-size: 20px;
    }
    td:first-child {
      height: 38px;
      width: 120px;
      color: #626262;
    }
    .description {
      white-space: pre-wrap;
      line-height: 32px;
    }
  }
  .info {
    .company_name {
      font-size: 24px;
      color: red;
      margin-bottom: 12px;
    }
    .title {
      font-size: 32px;
      margin-bottom: 8px;
    }
    .created_at {
      color: #979797;
      margin-bottom: 8px;
    }
    .info_item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 24px;
      gap: 12px;
    }
    .info_item_wrapper {
      display: flex;
      justify-content: space-between;
    }
    .pay {
      color: #c57d24;
    }
  }
`;
export const SupportSubmit = styled.div`
  width: 100%;
  position: fixed;
  background-color: #f1f2f6;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 74px;
  & button {
    font-size: 22px;
    cursor: pointer;
    width: 100%;
    height: 100%;
    font-weight: 800;
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
  height: 76px;
`;

export const Smoke = styled.div`
  position: fixed;
  top: 0;
  bottom: 0px;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;
export const SupportModal = styled.div`
  z-index: 10;
  position: fixed;
  left: 0px;
  bottom: -600px;
  transition: 0.2s;
  width: 100%;
  background-color: #ffffff;
  height: 400px;
  border-radius: 25px 25px 0 0;
  padding-top: 120px;
  display: flex;
  justify-content: center;
  p {
    svg {
      color: #ffeb00;
      font-size: 50px;
      margin-bottom: 12px;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    font-weight: 400;
    font-family: "Black Han Sans", sans-serif;
    content: "지원하기";
    position: absolute;
    background-color: #ffffff;
    top: -70px;
    left: calc(50% - 75px);
    border-radius: 50%;
    width: 150px;
    height: 150px;
  }

  &#active {
    bottom: 0px;
  }
  .user_info {
    font-family: "Jua", sans-serif;
    color: #979797;
    position: absolute;
    top: 90px;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 80px;
    justify-content: left;
  }
  .support_length {
    position: absolute;
    font-size: 22px;
    top: 120px;
    font-family: "Jua", sans-serif;
    right: 40px;
  }
  & textarea {
    resize: none;
    width: 100%;
    font-size: 24px;
    outline: none;
    border: 2px solid #dadada;
    height: 195px;
    margin: 50px 32px 0px 32px;
    padding: 20px;
    font-family: "Jua", sans-serif;
  }
  .support_submit {
    font-size: 22px;
    cursor: pointer;
    width: 100%;
    height: 74px;
    font-weight: 800;
    bottom: 0;
    left: 0;
    position: absolute;
    border: none;
    outline: none;
    background-color: #ffeb00;
    //display: flex;
    //justify-content: center;
    //align-items: center;
  }
`;
export const SupportModalCloseBtn = styled.div`
  & svg {
    font-size: 50px;
    position: absolute;
    right: 20px;
    top: 20px;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    color: #9095a1;
    background-color: #ebeef4;
    cursor: pointer;
  }
`;
