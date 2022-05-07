import styled from "styled-components";

export const Container = styled.div`
  padding: 24px;
`;

export const JobPostWrapper = styled.button`
  border: none;
  box-shadow: 0px 0px 10px 1px #d9d9d9;
  border-radius: 24px;
  background-color: #ffffff;
  padding: 20px 24px;
  margin-bottom: 24px;
  width: 100%;
  color: #7c818c;
  position: relative;
  .company_name {
    color: #000000;
    font-weight: 800;
    font-size: 20px;
    padding-bottom: 4px;
    text-align: left;
  }

  .post_title {
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-bottom: 4px;
    color: #000000;
    font-size: 22px;
  }

  .company_address {
    text-align: left;
    font-size: 18px;
    color: #7c818c;
  }

  .pay {
    text-align: left;
    font-size: 18px;
    color: #000000;
    font-weight: 800;

    span {
      color: #e15756;
    }
  }
`;

export const SendIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff230;
  margin-right: 6px;
`;
export const SupportButton = styled.button`
  position: absolute;
  cursor: pointer;
  bottom: 20px;
  right: 20px;
  border: 2px solid #f3d33e;
  background-color: #fff230;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  //background-color: transparent;
  width: 100px;
  height: 44px;
  color: #445d7b;
  font-weight: 400;
  border-radius: 50px;
  &:hover {
    font-weight: 800;
  }
`;
