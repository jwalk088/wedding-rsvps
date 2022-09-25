import React from "react";
import styled from "styled-components";
import { styles, colours } from "../../foundation";

const StyledInput = styled.input`
  background: #ffffff80;
  border-color: ${(props) =>
    props.colour == "white" ? colours.WHITE : colours.LIGHT_BLUE};
  border-style: solid;
  border-width: 2px;
  height: 40px;
  min-width: 260px;
  width: 100%;
  font-family: "Poppins";
  font-size: 14px;
  padding-left: 14px;
  font-weight: bold;
  border-radius: 0px !important;

  ::placeholder {
    color: #a3a3a3;
    font-style: italic;
    font-family: "Poppins";
    font-size: 14px;
  }

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    width: 100%;
    height: 32px;
    font-size: 12px;

    ::placeholder {
      font-size: 12px;
    }
  }
`;

const Wrapper = styled.div`
  margin: 8px 0;
  width: 100%;

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    margin: 4px 0;
  }
`;

const Label = styled.label`
  margin-bottom: 0;
  text-align: left;
  font-size: 16px;
  margin-top: 14px !important;
  font-family: "Poppins";

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    font-size: 14px;
  }
`;

const ErrorMessage = styled.p`
  letter-spacing: 0;
  color: #676b7c;
  margin-bottom: 0px;
  margin-top: 8px;

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    margin-top: 8px;
    margin-bottom: 0;
    font-size: 14px;
  }
`;

interface Props {
  value?: string;
  label?: string;
  id: string;
  placeholder?: string;
  colour?: "dark" | "white";
  onChange?: (value: string) => any;
  type?: string;
  errorMessage?: string;
  showError?: boolean;
}

function Input({
  value,
  label,
  placeholder,
  onChange,
  id,
  type,
  colour = "dark",
  errorMessage,
  showError,
}: Props) {
  return (
    <Wrapper>
      {label && (
        <p>
          <Label htmlFor={id}>{label}</Label>
        </p>
      )}
      <StyledInput
        colour={colour}
        id={id}
        name={id}
        aria-label={!label && placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type || "text"}
      />
      {showError && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Wrapper>
  );
}

export default Input;
