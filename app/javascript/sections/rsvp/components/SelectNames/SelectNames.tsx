import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import { Button } from "../../../../components";
import { colours, styles } from "../../../../foundation";

const MessagesWrapper = styled.div`
  text-align: center;
  margin: 54px 12px;
`;

const GuestOptionsContainer = styled.ul`
  padding: 0 60px;

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    padding: 8px;
  }
`;

const BaseOption = styled.li`
  padding: 12px;
  margin: 8px auto;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  font-family: "Poppins";
  max-width: 420px;

  i {
    font-size: 1.5em !important;
  }

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    padding: 8px;
    font-size: 12px;

    i {
      font-size: 1.2em !important;
    }
  }
`;

const GuestOption = styled(BaseOption)`
  border: 2px solid ${colours.PRIMARY_BLUE};
  color: ${colours.DARK_BLUE};
`;

const SelectedGuestOption = styled(BaseOption)`
  border: 2px solid ${colours.DARK_BLUE};
  color: ${colours.WHITE};
  background: ${colours.PRIMARY_BLUE};
`;

const ButtonContainer = styled.div`
  justify-content: center;
  display: flex;
  margin: 64px 0;

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    display: block;
    margin: 46px 0;
  }
`;

const ButtonWrapper = styled.div`
  margin: 0 12px;

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    margin: 8px 12px;
  }
`;

interface SelectNamesProps {
  guestOptions: [];
  onSelectGuest: (string) => any;
  selectedGuest: string;
  onSubmit: () => any;
  resetSearch: () => any;
}

function SelectNames(props: SelectNamesProps) {
  const { guestOptions, onSelectGuest, selectedGuest, onSubmit, resetSearch } =
    props;

  function guestOption(guest, index) {
    function onClick() {
      onSelectGuest(index);
    }

    const guestName = `${guest?.firstName} ${guest.lastName.charAt(0)}.`;

    return selectedGuest == index ? (
      <SelectedGuestOption
        onClick={onClick}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onClick();
          }
        }}
        key={index}
        tabIndex="0"
        role="option"
      >
        <Icon size="big" name="dot circle outline" />
        {guestName}
      </SelectedGuestOption>
    ) : (
      <GuestOption
        onClick={onClick}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onClick();
          }
        }}
        key={index}
        tabIndex="0"
        role="option"
      >
        <Icon size="big" name="circle outline" />
        {guestName}
      </GuestOption>
    );
  }
  return (
    <div>
      <MessagesWrapper>
        <h3 className="title">Select your name</h3>
        <p>
          If you don't see your name in the list, search again or send a message
          to Jessica & Mark
        </p>
      </MessagesWrapper>
      <GuestOptionsContainer role="listbox" tabindex="-1">
        {guestOptions?.map(guestOption)}
      </GuestOptionsContainer>

      <ButtonContainer>
        <ButtonWrapper>
          <Button onClick={resetSearch} style="secondary">
            Search Again
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button disabled={selectedGuest == undefined} onClick={onSubmit}>
            Confirm
          </Button>
        </ButtonWrapper>
      </ButtonContainer>
    </div>
  );
}

export default SelectNames;
