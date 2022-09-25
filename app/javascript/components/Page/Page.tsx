import React from "react";
import styled from "styled-components";
// import image from "./blueflowers.png";

const StyledContainer = styled.div`
  margin: 28px 80px !important;
  padding-top: 120px;

  @media only screen and (max-width: 450px) {
    margin: 12px !important;
  }
`;

const StyledImageTop = styled.div`
  background-image: url("https://homedepot.scene7.com/is/image/homedepotcanada/p_1001527863.jpg?wid=1000&hei=1000&op_sharpen=1&product-images=l");
  background-repeat: repeat;
  background-size: 500px;
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  position: absolute;
`;

const StyledImageBottom = styled.div`
  background-image: url("https://homedepot.scene7.com/is/image/homedepotcanada/p_1001527863.jpg?wid=1000&hei=1000&op_sharpen=1&product-images=l");
  background-repeat: repeat;
  background-size: 500px;
  z-index: -1;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  position: relative;
`;

function Page(props: { children: any }) {
  const { children } = props;

  return (
    <>
      <StyledImageTop />
      <StyledContainer>{children}</StyledContainer>
      <StyledImageBottom />
    </>
  );
}

export default Page;
