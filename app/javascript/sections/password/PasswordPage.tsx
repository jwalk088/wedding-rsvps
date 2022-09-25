import React, { useState } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useNavigate, Navigate } from "react-router-dom";
import { sendGTMEvent } from "../../utils";
import image from "../../../assets/images/088.jpg";
import { Paths, colours, styles } from "../../foundation";
import {
  ActionBar,
  Button,
  Copyright,
  Input,
  TitleBar,
} from "../../components";

const Wrapper = styled.div`
  padding-bottom: 40px;
`;

const Names = styled.h1`
  text-align: center;
  margin: 62px 0 !important;

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    font-size: 24px;
    margin: 36px 0 !important;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: 440px;
  object-fit: cover;
  object-position: 50% 30%;

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    height: 300px;
  }
`;

const Message = styled.p`
  text-align: center;
  text-align: center;
  font-size: 14px;
  margin-top: 32px;
  color: ${colours.DARK_BLUE};
  letter-spacing: 2px;

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    font-size: 12px;
    margin-top: 16px;
  }
`;

const ActionBarWrapper = styled.div`
  margin-top: -5px;
`;

const InputWrapper = styled.div`
  padding-bottom: 4px;

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    width: 100%;
    padding: 0;
  }
`;

const CopyrightWrapper = styled.div`
  text-align: center;
  padding-bottom: 14px;
`;

const PASSWORD_MUTATION = gql`
  mutation SignIn($input: SignInMutationInput!) {
    signIn(input: $input) {
      success
      errors
    }
  }
`;

const SignedInQuery = gql`
  query SignedIn {
    isSignedIn
  }
`;

function PasswordPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const { data } = useQuery(SignedInQuery, { fetchPolicy: "no-cache" });

  const [submitPassword] = useMutation(PASSWORD_MUTATION, {
    onError: () => {
      sendGTMEvent("login", "failed login");

      setError(true);
    },
    onCompleted: (data) => {
      if (data?.signIn?.success) {
        sendGTMEvent("login", "successful login");

        navigate(Paths.Home);
      } else {
        sendGTMEvent("login", "failed login");
        setError(true);
      }
    },
  });

  function handlePasswordChange(value) {
    setPassword(value);
    setError(false);
  }

  function handleSubmit(e) {
    try {
      submitPassword({
        variables: {
          input: {
            passcode: password,
          },
        },
      });
    } catch (e) {
      sendGTMEvent("login", "failed login");
      setError(true);
    } finally {
      e.preventDefault();
      return false;
    }
  }

  if (data?.isSignedIn) {
    return <Navigate to="/" />;
  }

  const submitButton = (
    <Button style={"white"} capitalize type="submit">
      Submit
    </Button>
  );
  return (
    <>
      <Wrapper>
        <Names>Jessica & Mark</Names>
        <TitleBar colour="dark">Welcome</TitleBar>
        <MainImage src={image} />
        <ActionBarWrapper>
          <form onSubmit={handleSubmit}>
            <ActionBar colour={"light"} height={"200px"} button={submitButton}>
              <InputWrapper>
                <Input
                  id="password"
                  placeholder={"password"}
                  colour="white"
                  value={password}
                  onChange={handlePasswordChange}
                  type={"password"}
                  showError={error}
                  errorMessage={"Incorrect password."}
                />
              </InputWrapper>
            </ActionBar>
          </form>
        </ActionBarWrapper>
        <Message>
          Please enter the password from the invitation to continue.
        </Message>
      </Wrapper>
      <CopyrightWrapper>
        <Copyright />
      </CopyrightWrapper>
    </>
  );
}

export default PasswordPage;
