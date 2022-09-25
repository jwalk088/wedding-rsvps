import React from "react";
import styled from "styled-components";
import { colours, styles } from "../../foundation";

const BaseButton = styled.button`
  border: 2px solid black;
  min-height: 48px;
  min-width: 144px;
  cursor: pointer;

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    min-height: 40px;
    width: 100%;
    font-size: 12px;
  }
`;

const PrimaryButton = styled(BaseButton)`
  background: #657d8f;
  color: ${colours.WHITE};
  border-color: #657d8f;

  &:hover {
    background: #7392ab;
    border-color: #708291;
  }

  &:disabled {
    background: #d3dae1;
    color: #f3f3f3;
    border-color: #b8c4cd;
    cursor: auto;
  }
`;

const SecondaryButton = styled(BaseButton)`
  background: ${colours.LIGHT_BLUE};
  color: #324858;
  border-color: ${colours.PRIMARY_BLUE};

  &:hover {
    background: #cfdce5;
  }

  &:disabled {
    background: #ebf0f3;
    color: #c3c7cb;
    border-color: #d0d8df;
    cursor: auto;
  }
`;

const WhiteButton = styled(BaseButton)`
  background: transparent;
  color: ${colours.WHITE};
  border-color: ${colours.WHITE};

  &:hover {
    background: #ffffff8a;
    color: ${colours.DARK_BLUE};
  }
`;

const Capitalize = styled.span`
  text-transform: uppercase;
  letter-spacing: 6px;
`;

interface Props {
  style?: "primary" | "secondary" | "white";
  capitalize?: boolean;
  onClick?: (event) => any;
  children: any;
  disabled?: boolean;
  type?: string;
}

function Button(props: Props) {
  const {
    style = "primary",
    capitalize = false,
    onClick,
    children,
    disabled = false,
    type = "button",
  } = props;

  let ButtonStyle;

  switch (style) {
    case "secondary":
      ButtonStyle = SecondaryButton;
      break;
    case "white":
      ButtonStyle = WhiteButton;
      break;
    case "primary":
      ButtonStyle = PrimaryButton;
      break;
  }

  const content = capitalize ? <Capitalize>{children}</Capitalize> : children;

  return (
    <ButtonStyle disabled={disabled} onClick={onClick} type={type}>
      {content}
    </ButtonStyle>
  );
}

export default Button;
