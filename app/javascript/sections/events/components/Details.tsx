import React from "react";
import styled from "styled-components";
import { styles } from "../../../foundation";

const DetailsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 32px 0;
  align-items: center;
`;

const Title = styled.div`
  text-transform: uppercase;
  font-family: "Poppins-Light", sans-serif;
  font-size: 20px;
  letter-spacing: 8px;
  width: 50%;
  text-align: end;
  white-space: nowrap;
  padding-right: 110px;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    font-size: 16px;
  }
`;

const Message = styled.div`
  width: 50%;
  font-family: "Poppins";
  font-weight: bold;
`;

interface Props {
  title: string;
  description: string;
  secondaryText?: string;
}

function Details({ title, description, secondaryText }: Props) {
  return (
    <DetailsWrapper>
      <Title>{title}</Title>
      <Message>
        {description}
        {secondaryText && <br />}
        {secondaryText || ""}
      </Message>
    </DetailsWrapper>
  );
}

export default Details;
