import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ActionBar, FooterBar, TitleBar, Topbar } from "../../components";
import { Paths, styles } from "../../foundation";
import image039 from "../../../assets/images/039.jpg";
import { Details } from "./components";

const TopImage = styled.img`
  width: 100%;
  max-height: 220px;
  object-fit: cover;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    height: 200px;
  }
`;

const PageWrapper = styled.div`
  margin-bottom: 100px;
`;

const EventSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  flex-flow: column;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    display: block;
    padding-top: 24px;
    min-height: 500px;
    padding: 24px;
  }
`;

const Title = styled.h3`
  letter-spacing: 16px;
  margin: 52px 0 !important;
  text-transform: uppercase;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    font-size: 14px;
  }
`;

const TextWrapper = styled.div`
  margin: 12px 0;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const RsvpText = styled.p`
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 18px;
  padding-bottom: 8px;
  font-size: 16px;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    font-size: 12px;
    letter-spacing: 12px;
  }
`;

const MapFrame = styled.iframe`
  height: 280px;
  width: 400px;
  border: 0;
  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    width: 100%;
  }
`;

const BridalShowerDetails = styled.p`
  max-width: 40%;
  margin: auto;
  margin-bottom: 56px;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    max-width: 100%;
    padding: 0 12px;
  }
`;

function EventPage() {
  const navigate = useNavigate();
  return (
    <div>
      <Topbar />
      <TitleBar colour="light">Events</TitleBar>
      <TopImage src={image039} />
      <PageWrapper>
        <EventSection>
          <TextWrapper>
            <Title>Wedding</Title>
            <Details
              title="When"
              description="Sunday June 5, 2022"
              secondaryText="5pm"
            />
            <Details
              title="Where"
              description="Venue"
              secondaryText="123 Address Road"
            />
          </TextWrapper>
          <MapFrame
            src="https://maps.google.com/maps?q=new+york&output=embed"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </EventSection>
        <TextWrapper>
          <Title>Bridal Shower</Title>
          <BridalShowerDetails>
            We're inviting all the ladies to celebrate the upcoming wedding at
            Jessica's bridal shower. Please contact us at c@email.com for more
            details
          </BridalShowerDetails>
        </TextWrapper>
        <EventSection>
          <TextWrapper>
            <Details title="When" description="Sunday May 15, 2022" />
            <Details title="Virtual" description="1pm - 2pm" />
            <Details title="In person" description="3pm - 5pm" />
            <Details title="Where" description="Bride's Parent's House" />
          </TextWrapper>
          <MapFrame
            src="https://maps.google.com/maps?q=new+york&output=embed"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </EventSection>
      </PageWrapper>
      <ActionBar
        colour="dark"
        buttonText="RSVP"
        action={() => navigate(Paths.Rsvp)}
      >
        <RsvpText>Remember to RSVP</RsvpText>
      </ActionBar>
      <FooterBar />
    </div>
  );
}

export default EventPage;
