import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { Button, ActionBar, Input } from "../../../../components";
import { Paths, styles, colours } from "../../../../foundation";

const SuccessWrapper = styled.div`
  margin-bottom: 60px;
  font-family: "NugoSans";
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

const FaqText = styled.p`
  font-weight: bold;
  letter-spacing: 4px;
  padding-bottom: 8px;
  text-align: center;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    font-size: 12px;
    letter-spacing: 8px;
  }
`;

const SuccessMessage = styled.div`
  font-family: "Poppins";
  border: 2px solid #add0c5;
  margin-bottom: 40px;
  padding: 24px;
  background: #d8f4ec;
  color: #2d5045;
  font-size: 16px;
  box-shadow: 0px 2px 3px #ececec;
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    font-size: 20px;
    margin-right: 14px;
    color: #2d5045 !important;
  }
`;

const ErrorMessage = styled.div`
  font-family: "Poppins";
  border: 2px solid #d0adad;
  margin-bottom: 40px;
  padding: 24px;
  background: #f4d8d8;
  color: #502d2d;
  font-size: 16px;
  box-shadow: 0px 2px 3px #ececec;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    max-width: 400px;
  }

  i {
    font-size: 20px;
    margin-right: 14px;
    color: #502d2d !important;
  }
`;

const MessageInput = styled.textarea`
  background: #ffffff80;
  border-color: ${colours.LIGHT_BLUE};
  border-style: solid;
  border-width: 2px;
  resize: none;
  min-width: 260px;
  width: 60%;
  font-family: "Poppins";
  font-size: 16px;
  padding-left: 14px;
  padding-top: 8px;
  font-weight: bold;
  line-height: 20px;
  border-radius: 0px !important;
  margin: 44px 0;

  ::placeholder {
    color: #a3a3a3;
    font-style: italic;
    font-family: "Poppins";
    font-size: 14px;
  }

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    width: 95%;
    font-size: 12px;
  }
`;

const StyledTitle = styled.h3`
  letter-spacing: 16px;
  margin: 52px 0 !important;
  text-transform: uppercase;
`;

const StyledContent = styled.p`
  text-align: center;
`;

const StyledWrapper = styled.div`
  text-align: center;
  margin: 12px;
`;

const SendComment = gql`
  mutation SendComment($input: NewCommentMutationInput!) {
    addComment(input: $input) {
      comment {
        id
      }
      errors
    }
  }
`;

interface SuccessPageProps {
  guest?: any;
}

function SuccessPage(props: SuccessPageProps) {
  const { guest } = props;
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [sendComment] = useMutation(SendComment);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setError(false);
    setSuccess(false);
    try {
      const { data } = await sendComment({
        variables: {
          input: {
            commentAttributes: {
              guestId: guest?.id,
              message,
            },
          },
        },
      });
      if (data?.addComment?.comment?.id) {
        setSuccess(true);
        setMessage("");
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SuccessWrapper>
        <StyledTitle>Thank you</StyledTitle>
        {success && (
          <SuccessMessage>
            <Icon name="check circle outline" />
            We have received your message. Thank you!
          </SuccessMessage>
        )}
        {error && (
          <ErrorMessage>
            <Icon name="exclamation circle" />
            <p>
              We had trouble saving your message. Please try contacting us
              through the Contact page instead.
            </p>
          </ErrorMessage>
        )}
        <StyledContent>
          Thank you for letting us know. You can always come back later and
          update your response. <br /> Please feel free to leave us a message or
          add any song requests here!
        </StyledContent>
        <MessageInput
          value={message}
          id="yourMessage"
          placeholder="Enter your message or any song requests here"
          onChange={(e) => setMessage(e?.target?.value)}
          rows="5"
        />
        <StyledWrapper>
          <Button
            style="secondary"
            onClick={handleSubmit}
            disabled={loading || !message}
          >
            Submit
          </Button>
        </StyledWrapper>
      </SuccessWrapper>
      <ActionBar
        colour="dark"
        buttonText="FAQ"
        action={() => navigate(Paths.Faq)}
      >
        <FaqText>Checkout our FAQ section for some important details</FaqText>
      </ActionBar>
    </>
  );
}

export default SuccessPage;
