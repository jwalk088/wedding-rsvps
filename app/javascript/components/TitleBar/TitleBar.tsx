import React from "react";
import styled from "styled-components";
import { colours, styles } from "../../foundation";

const StyledBar = styled.div`
  background-color: ${(props) =>
    props.colour == "light" ? colours.LIGHT_BLUE : colours.PRIMARY_BLUE};
  height: 100px;
  color: ${(props) =>
    props.colour == "light" ? colours.BLACK : colours.WHITE};
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 10px;
  font-size: 18px;
  font-family: "Poppins";
  text-align: center;
  padding: 0 16px;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    height: 60px;
    font-size: 16px;
  }
`;

interface Props {
  colour: "light" | "dark";
  children: any;
}

function TitleBar({ colour, children }: Props) {
  return <StyledBar colour={colour}>{children}</StyledBar>;
}

export default TitleBar;
