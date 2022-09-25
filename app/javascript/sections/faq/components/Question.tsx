import React from "react";
import styled from "styled-components";
import { styles } from "../../../foundation";

const Wrapper = styled.div`
  margin: 56px 0;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    margin: 32px 0;
  }
`;

const QuestionWrapper = styled.h3`
  letter-spacing: 4px;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    font-size: 14px;
  }
`;

const AnswerWrapper = styled.p`
  font-size: 16px;
  margin-top: 6px;

  a {
    text-decoration: underline;
  }

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    font-size: 14px;
  }
`;

interface Props {
  question: string;
  answer: string;
}

function Question({ question, answer }: Props) {
  return (
    <Wrapper>
      <QuestionWrapper>{question}</QuestionWrapper>
      <AnswerWrapper dangerouslySetInnerHTML={{ __html: answer }} />
    </Wrapper>
  );
}

export default Question;
