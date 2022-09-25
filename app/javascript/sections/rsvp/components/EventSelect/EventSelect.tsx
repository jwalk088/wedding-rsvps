import React from "react";
import styled from "styled-components";
import image104 from "../../../../../assets/images/104Hands.jpg";
import image077 from "../../../../../assets/images/077Jess.jpg";
import { colours, styles } from "../../../../foundation";

const ImageStyle = styled.img`
  width: 100%;
  max-width: 250px;
  object-fit: cover;
  height: 320px;
  filter: brightness(0.7);
  margin: auto;
  transition: filter 0.4s;
  transition-timing-function: ease-out;

  &:hover {
    filter: brightness(0.4);
  }

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    height: 200px;
  }
`;

const ImageText = styled.p`
  font-size: 18px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${colours.WHITE};
  text-transform: uppercase;
`;

const ImagesWrapper = styled.div`
  display: flex;
  margin: 58px auto;
  max-width: 560px;
  margin-bottom: 100px;

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    padding: 18px;
  }
`;

const Option = styled.button`
  flex-grow: 1;
  position: relative;
  text-align: center;
  cursor: pointer;
  background: none;
  border: none;
`;

const MessagesWrapper = styled.div`
  text-align: center;
  margin: 54px 12px;
`;

interface SearchProps {
  onSelect: (string) => any;
}

function EventSelect(props: SearchProps) {
  const { onSelect } = props;

  return (
    <div>
      <MessagesWrapper>
        <h3 className="title">Select an event</h3>
        <p>Choose an event to RSVP for.</p>
      </MessagesWrapper>
      <ImagesWrapper>
        <Option onClick={() => onSelect("wedding")} type="button">
          <ImageStyle src={image104} />
          <ImageText>Wedding</ImageText>
        </Option>
        <Option onClick={() => onSelect("bridal")} type="button">
          <ImageStyle src={image077} />
          <ImageText>Bridal Shower</ImageText>
        </Option>
      </ImagesWrapper>
    </div>
  );
}

export default EventSelect;
