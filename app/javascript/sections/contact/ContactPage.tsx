import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import emailjs from "emailjs-com";
import { Dimmer, Loader, Message, Segment } from "semantic-ui-react";
import image from "../../../assets/images/006.jpg";
import {
  Button,
  FooterBar,
  Topbar,
  TitleBar,
  Input,
  ActionBar,
} from "../../components";
import { Paths, styles, colours } from "../../foundation";

const ERROR_TYPES = {
  EMAIL_ADDRESS: "Please verify your email address is correct.",
  NETWORK_ERROR:
    "There was a problem sending your message. Please try again later.",
};

const TitleImage = styled.img`
  width: 100%;
  max-height: 220px;
  object-fit: cover;
  object-position: 0 32%;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    height: 200px;
  }
`;

const MessageInput = styled.textarea`
  background: #ffffff80;
  border-color: ${colours.LIGHT_BLUE};
  border-style: solid;
  border-width: 2px;
  resize: none;
  min-width: 260px;
  width: 100%;
  font-family: "Poppins";
  font-size: 16px;
  padding-left: 14px;
  padding-top: 8px;
  font-weight: bold;
  line-height: 20px;
  border-radius: 0px !important;

  ::placeholder {
    color: #a3a3a3;
    font-style: italic;
    font-family: "Poppins";
    font-size: 14px;
  }

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    width: 100%;
    font-size: 12px;

    ::placeholder {
      font-size: 12px;
    }
  }
`;

const StyledForm = styled.form`
  min-width: 400px;
  width: min-content;
  margin: auto;
  text-align: start;
  margin-bottom: 118px;
  padding: 12px;

  p {
    margin: 0;
  }

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    margin-bottom: 28px;
    padding: 12px;
    min-width: auto;
    width: 100%;
  }
`;

const FaqText = styled.p`
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 12px;
  padding-bottom: 8px;
  text-align: center;

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    font-size: 14px;
    letter-spacing: 8px;
    line-height: 20px;
    margin-bottom: 0px;
  }
`;

const MessagesWrapper = styled.div`
  text-align: center;
  margin: 54px 12px 20px;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    margin: 54px 28px 0px;
  }
`;

const StyledAlert = styled(Message)`
  width: 550px;
  margin: auto !important;
  font-family: "Poppins";
  font-weight: bold;
  margin-top: 24px !important;
  border-radius: 0 !important;
  box-shadow: 0 0 0 2px !important;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    width: 100%;
    font-size: 12px !important;
  }
`;

const SegmentContainer = styled(Segment)`
  border: none !important;
  box-shadow: none !important;
`;

const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 32px;
`;

function ContactPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  function sendMessage(event) {
    setSuccess(false);
    setError("");
    event.preventDefault();

    if (!validateEmail(email)) {
      setError(ERROR_TYPES.EMAIL_ADDRESS);
      return;
    }

    setLoading(true);

    const templateParams = {
      from_name: name + " (" + email + ")",
      to_name: "Jessica & Mark",
      reply_to: email,
      message: message,
    };

    emailjs.send("service_tiukcvp", "template_za0wcxc", templateParams).then(
      function () {
        setSuccess(true);
        setLoading(false);
      },
      function () {
        setError(ERROR_TYPES.NETWORK_ERROR);
        setLoading(false);
      }
    );
  }

  const sendDisabled = !message || !email || !name;

  function getForm() {
    return (
      <SegmentContainer>
        <Dimmer active={loading} inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
        <StyledForm>
          <Input
            value={name}
            label={"Your Name"}
            id="yourName"
            placeholder="Holly Sonic"
            onChange={setName}
          />
          <Input
            value={email}
            label={"Your Email"}
            id="yourEmail"
            placeholder="holly@home.com"
            onChange={setEmail}
          />
          <MessageInput
            value={message}
            id="yourMessage"
            placeholder="Your Message"
            onChange={(e) => setMessage(e?.target?.value)}
            rows="5"
          />
          <ButtonWrapper>
            <Button
              style="secondary"
              disabled={sendDisabled}
              onClick={sendMessage}
            >
              Send
            </Button>
          </ButtonWrapper>
        </StyledForm>
      </SegmentContainer>
    );
  }

  return (
    <div>
      <Topbar />
      <TitleBar colour="light">Contact Us</TitleBar>
      <TitleImage src={image} />
      <MessagesWrapper>
        <h3 className="title">Send us a message</h3>
        <p>
          Please don't hesitate to reach out if you have any other questions or
          concerns.
        </p>

        {error && <StyledAlert negative>{error}</StyledAlert>}
        {success && (
          <StyledAlert positive>
            Thank you for sending us your message. We will get back to you as
            soon as we can!
          </StyledAlert>
        )}
      </MessagesWrapper>
      {getForm()}
      <ActionBar
        colour="dark"
        buttonText="FAQ"
        action={() => navigate(Paths.Faq)}
      >
        <FaqText>Checkout our FAQ section</FaqText>
      </ActionBar>
      <FooterBar />
    </div>
  );
}

export default ContactPage;
