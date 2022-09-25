import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ActionBar, FooterBar, Topbar } from "../../components";
import { colours, Paths, styles } from "../../foundation";
import image028 from "../../../assets/images/028.jpg";
import image036 from "../../../assets/images/036.jpg";
import image049 from "../../../assets/images/049.jpg";

const TopImage = styled.img`
  width: 100%;
  max-height: 480px;
  object-fit: cover;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    height: 220px;
  }
`;

const MiddleImage = styled.img`
  width: 70%;
  object-fit: cover;
  max-height: 440px;
  margin: auto;
  margin-top: -220px;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    width: 85%;
    margin-top: -120px;
  }
`;

const FooterImage = styled.img`
  width: 100%;
  object-fit: cover;
  max-height: 380px;
`;

const BlueSection = styled.div`
  background: ${colours.LIGHT_BLUE};
  height: 572px;
  width: 100%;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    height: 500px;
  }
`;

const InfoSection = styled.div`
  height: 572px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    display: block;
    padding-top: 24px;
    height: 500px;
  }
`;

const Title = styled.h3`
  letter-spacing: 16px;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    font-size: 14px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 72px;
  padding-bottom: 52px;
`;

const WeddingTitleWrapper = styled.div`
  flex-grow: 1;

  h3 {
    margin: auto;
    line-height: 1.8;
    width: min-content;
    text-transform: uppercase;

    @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
      width: fit-content;
      margin: 46px auto;
      font-size: 16px;
      letter-spacing: 14px;
    }
  }
`;

const DetailsWrapper = styled.div`
  margin-left: 40px;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    justify-content: space-around;
    display: flex;
    margin: 59px 0;
  }
`;

const SecondaryTitle = styled.p`
  font-size: 20px;
  letter-spacing: 12px;
  padding-top: 20px;
  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    font-size: 16px;
  }
`;

const SecondaryMessage = styled.p`
  line-height: 2;
  font-family: "Literata";
`;

const InfoTextWrapper = styled.div`
  flex-grow: 1;
`;

const Message = styled.p`
  margin: 0 20%;
  font-size: 20px;
  font-style: italic;
  line-height: 2;
  font-family: "Crimson";

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    font-size: 16px;
  }
`;

const RsvpText = styled.p`
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 18px;
  padding-bottom: 8px;
  font-size: 16px;

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    font-size: 12px;
    letter-spacing: 12px;
  }
`;

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Topbar homePage />
      <TopImage src={image028} />
      <BlueSection>
        <TitleWrapper>
          <Title>SHE SAID YES</Title>
        </TitleWrapper>
        <Message>
          We are so excited to celebrate our special day with the people who
          mean the most to us. Thank you for all the love and support at this
          important time in our lives.
        </Message>
      </BlueSection>
      <MiddleImage src={image049} />
      <InfoSection>
        <WeddingTitleWrapper>
          <Title>The Wedding Day</Title>
        </WeddingTitleWrapper>
        <InfoTextWrapper>
          <DetailsWrapper>
            <SecondaryTitle>WHEN</SecondaryTitle>
            <SecondaryMessage>
              Sunday, June 5, 2022 <br />
              Ceremony starts at 5pm <br />
              Dinner to follow
            </SecondaryMessage>
          </DetailsWrapper>
          <DetailsWrapper>
            <SecondaryTitle>WHERE</SecondaryTitle>
            <SecondaryMessage>
              Aquatopia Conservatory
              <br />
              2710 Carp Road
              <br />
              Ottawa, ON
            </SecondaryMessage>
          </DetailsWrapper>
        </InfoTextWrapper>
      </InfoSection>
      <ActionBar
        colour="dark"
        buttonText="RSVP"
        action={() => navigate(Paths.Rsvp)}
      >
        <RsvpText>Let's Party</RsvpText>
      </ActionBar>
      <FooterImage src={image036} />
      <FooterBar />
    </div>
  );
}

export default Home;
