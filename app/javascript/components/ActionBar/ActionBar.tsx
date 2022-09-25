import React, { ReactElement } from "react";
import styled from "styled-components";
import { Button } from "../../components";
import { colours, styles } from "../../foundation";

const StyledBar = styled.div`
  background-color: ${(props) =>
    props.colour == "light" ? colours.LIGHT_BLUE : colours.PRIMARY_BLUE};
  height: ${(props) => props.height ?? "200px"};
  color: ${colours.BLACK};
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 10px;
  font-size: 16px;
  font-family: "Poppins";
  flex-direction: column;

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    height: ${(props) => props.height ?? "160px"};
    padding: 12px;
    font-size: 12px;
  }
`;

const ButtonWrapper = styled.div`
  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    padding: 8px;
    width: 100%;
    font-size: 12px;
  }
`;

interface Props {
  colour: "light" | "dark";
  height?: string;
  children: any;
  buttonText?: string;
  button?: ReactElement;
  action?: () => any;
}

function ActionBar({
  colour,
  children,
  buttonText,
  button,
  action,
  height,
}: Props) {
  return (
    <StyledBar colour={colour} height={height}>
      {children}
      {button ?? (
        <ButtonWrapper>
          <Button onClick={action} style={"white"} capitalize>
            {buttonText}
          </Button>
        </ButtonWrapper>
      )}
    </StyledBar>
  );
}

export default ActionBar;
