import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ActionBar, FooterBar, TitleBar, Topbar } from "../../components";
import { colours, Paths, styles } from "../../foundation";
import image091 from "../../../assets/images/091.jpg";
import image072 from "../../../assets/images/072.jpg";
import { Question } from "./components";

const QUESTIONS_TOP = [
  {
    question: "Hotel block?",
    answer:
      'We have reserved a hotel block at the Hotel under "Walker/Mroz Wedding". Remember to reserve your room by <b>May 3, 2022</b>. Please <a target="_blank" href="https://www.hotel/link.com">follow this link to book your reservation</a> ',
  },
  {
    question: "When is the RSVP deadline?",
    answer: "Please RSVP online by May 14, 2022.",
  },
  {
    question: "Do I get a +1? Are kids invited?",
    answer: "When you RSVP, all invited guests in your party will be listed.",
  },
  {
    question: "When should I arrive?",
    answer: "Please arrive at 4:30pm. The ceremony will begin at 5pm.",
  },
  {
    question: "Parking?",
    answer: "There is plenty of free parking available at the venue.",
  },
];

const QUESTIONS_BOTTOM = [
  {
    question: "Dress code?",
    answer:
      "The dress code for our wedding is semi-formal/cocktail attire. Ladies should wear dresses, and the gentlemen should wear a suit and tie or a sports coat.",
  },
  {
    question: "Where is the reception taking place?",
    answer:
      "Both the wedding ceremony and reception will be held at the venue.",
  },
  {
    question: "Is the wedding indoors or outdoors?",
    answer: "The wedding will take place inside the venue main room.",
  },
  {
    question: "What is the timeline of the wedding?",
    answer:
      "The ceremony will begin at 5pm and conclude at 5:30pm. A cocktail hour will follow with passed hors d'oeuvres. Dinner will be served at 7pm and finish with dancing, more celebrations, and a late night snack bar.",
  },
  {
    question: "Do you have a registry?",
    answer:
      'Please know that your presence at our wedding is present enough! However, for friends and family who have been asking for gift ideas, we’ve created an online registry at My Registry. You can view our registry <a target="_blank" href="https://www.myregistry.com">by following this link.</a>.',
  },
];

const TopImage = styled.img`
  width: 100%;
  max-height: 220px;
  object-fit: cover;
  object-position: 0 40%;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    height: 200px;
  }
`;

const MiddleImage = styled.img`
  width: 70%;
  object-fit: cover;
  max-height: 440px;
  margin: auto;
  margin-bottom: -220px;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    width: 85%;
    margin-bottom: -120px;
    max-height: 300px;
  }
`;

const ActionMessage = styled.p`
  letter-spacing: 6px;
  margin: 0;
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
  padding: 0 16px;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    font-size: 14px;
  }
`;

const QuestionsWrapper = styled.div`
  margin: 60px 20%;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    margin: 0 40px;
  }
`;

const BottomQuestions = styled.div`
  padding: 60px 0;
  margin: 0 20%;
  padding-top: 220px;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    margin: 0 40px;
    padding-top: 120px;
  }
`;

const BlueSection = styled.div`
  background: ${colours.DARK_BLUE};
  width: 100%;
  color: white;

  a {
    color: white;

    &:hover {
      color: ${colours.LIGHT_BLUE};
    }
  }
`;

function getQuestions(questions) {
  return questions.map((q) => <Question {...q} key={q.question} />);
}

function EventPage() {
  const navigate = useNavigate();
  return (
    <div>
      <Topbar />
      <TitleBar colour="light">FAQs</TitleBar>
      <TopImage src={image091} />
      <QuestionsWrapper>{getQuestions(QUESTIONS_TOP)}</QuestionsWrapper>
      <MiddleImage src={image072} />
      <BlueSection>
        <BottomQuestions>{getQuestions(QUESTIONS_BOTTOM)}</BottomQuestions>
      </BlueSection>
      <ActionBar
        colour="light"
        buttonText="Contact"
        action={() => navigate(Paths.Contact)}
      >
        <ActionMessage>Contact us with any other questions</ActionMessage>
      </ActionBar>
      <FooterBar />
    </div>
  );
}

export default EventPage;
