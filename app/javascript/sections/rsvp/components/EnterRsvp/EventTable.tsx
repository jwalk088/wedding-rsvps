import React from "react";
import styled from "styled-components";
import dateformat from "dateformat";
import { Dropdown, Radio, Segment, TextArea } from "semantic-ui-react";
import { colours, styles } from "../../../../foundation";
import { Input } from "../../../../components";
import { RsvpItem } from "../EnterRsvp/EnterRsvp";
import ChildrenInfoSheet from "../../../../../assets/images/ChildrenInfoSheet.png";

// styles
const StyledSegment = styled(Segment)`
  border-radius: 0 !important;
  border-width: 2px !important;
  border-color: ${colours.PRIMARY_BLUE} !important;
  padding: 54px 32px 32px !important;
  max-width: 700px;
  margin: auto !important;

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    margin: 6px !important;
    padding: 16px !important;
  }
`;

const StyledTitle = styled.h3`
  text-align: center;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 4px;
  font-size: 24px;
  color: ${colours.DARK_BLUE};
  margin-bottom: 24px;
  font-family: "Poppins-light", sans-serif;

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    font-size: 18px;
    margin-top: 8px !important;
  }
`;

const InvitationsWrapper = styled.div`
  padding: 0 10%;
  margin-bottom: 20px;
  @media only screen and (max-width: 450px) {
    padding: 0;
  }
`;

const EventName = styled.p`
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 0;
  letter-spacing: 4px;
  font-weight: bold;
  color: ${colours.DARK_BLUE};

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    font-size: 14px;
  }
`;

const EventDate = styled.p`
  color: ${colours.PRIMARY_BLUE};

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    font-size: 12px;
  }
`;

const RadioOption = styled.div`
  padding: 4px;
  color: ${colours.DARK_BLUE};
  display: flex;

  p {
    display: inline;
    padding: 0 14px 0px 8px;

    @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
      font-size: 12px;
    }
  }
`;

const StyledRadio = styled(Radio)`
  label {
    ::after {
      background-color: ${colours.DARK_BLUE} !important;
    }
  }
`;

const StyledForm = styled.div`
  font-size: 14px;
  margin-bottom: 12px;
  margin-top: 36px;

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    margin-top: 16px;
  }

  .field {
    padding: 8px;
    font-size: 14px !important;
  }
`;

const StyledDropdown = styled(Dropdown)`
  font-family: "Poppins";
  width: 100%;
  margin-bottom: 0px;
  border-width: 2px !important;
  border-radius: 0 !important;
  border-color: ${colours.LIGHT_BLUE} !important;
  color: ${colours.PRIMARY_BLUE};

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    font-size: 12px;
  }

  .menu {
    border-color: ${colours.LIGHT_BLUE} !important;
    border-width: 2px !important;
  }
`;

const StyledDiet = styled(TextArea)`
  font-family: "Poppins";
  width: 100%;
  border-color: ${colours.LIGHT_BLUE};
  border-radius: 0px;
  border-width: 2px;
  padding: 8px;
  resize: none;

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    font-size: 12px;

    ::placeholder {
      font-size: 12px;
    }
  }

  ::placeholder {
    color: #a3a3a3;
    font-style: italic;
    font-family: "Poppins";
  }
`;

const MenuTitle = styled.p`
  font-family: "Poppins";
  font-size: 14px;
  text-transform: uppercase;
  margin-bottom: 4px;
  color: ${colours.DARK_BLUE};
  letter-spacing: 3px;
`;

const InputLabel = styled.div`
  color: ${colours.DARK_BLUE};
  margin-bottom: 0;
  margin-top: 12px;
  font-family: "Poppins", sans-serif;
  font-size: 14px;

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    font-size: 12px;
  }
`;

const EmailDescription = styled.p`
  display: inline;
  color: ${colours.PRIMARY_BLUE};
  padding-left: 4px;

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    font-size: 12px;
  }
`;

const EventWrapper = styled.div`
  display: flex;
  /* margin-top: 20px; */
`;

const HalfWidth = styled.div`
  flex-grow: 1;
  margin: auto;
`;

const EmailWrapper = styled.div`
  margin-top: 12px;

  input {
    font-size: 12px;

    ::placeholder {
      font-size: 12px;
      color: ${(props) => (props.emailPresent ? "black" : "#aaaaaa")};
    }
  }
`;

const NameInput = styled.div`
  padding-right: 4px;
  width: 100%;

  @media only screen and (max-width: 740px) {
    padding: 0;
  }
`;

const NameInputWrapper = styled.div`
  display: flex;

  @media only screen and (max-width: 740px) {
    flex-flow: column;
    margin-bottom: 12px;
  }
`;

const ChildrenNote = styled.p`
  padding-top: 4px;

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    font-size: 12px;
  }
`;

const MenuOption = styled.div`
  p {
    @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
      font-size: 12px;
    }
  }
`;

const OpenLink = styled.a`
  color: ${colours.PRIMARY_BLUE};
  text-decoration: underline;
  padding-left: 4px;
`;

// props
interface EventTableProps {
  rsvp?: RsvpItem;
  isPlusOne: boolean;
  dispatch: any;
  name: string;
}

// utils
function getOptions(menus, isChild) {
  return menus
    .map((menu) => {
      const isChildMenu =
        menu.ages && menu.ages.length > 0 && menu.ages[0].id == "2";

      if ((isChild && !isChildMenu) || (!isChild && isChildMenu)) {
        return null;
      }

      return {
        key: menu.id,
        text: menu.title,
        value: menu.id,
        content: (
          <MenuOption>
            <MenuTitle>{menu.title}</MenuTitle>
            <p>{menu.description}</p>
          </MenuOption>
        ),
      };
    })
    .filter((menu) => menu !== null);
}

// function
function EventTable(props: EventTableProps) {
  const { rsvp, name, isPlusOne, dispatch } = props;

  const event = rsvp.event;
  const guestId = isPlusOne ? rsvp.guestId : rsvp?.personId;
  const emailHidden = rsvp?.emailHidden;
  const isChild = rsvp.isChild;

  function onRsvpChange(going, guest) {
    dispatch({ guestId: guest, value: going, field: "going" });
  }

  function onMenuChange(menu, guest) {
    dispatch({ guestId: guest, value: { id: menu }, field: "menu" });
  }

  function onDietChange(diet, guest) {
    dispatch({ guestId: guest, value: diet, field: "diet" });
  }

  function onEmailChange(email, guest) {
    dispatch({ guestId: guest, value: email, field: "email" });
  }

  function onFirstNameChange(name, guest) {
    dispatch({ guestId: guest, value: name, field: "firstName" });
  }

  function onLastNameChange(name, guest) {
    dispatch({ guestId: guest, value: name, field: "lastName" });
  }

  // function invitationsSection() {
  //   return allInvitations.map((invitation, index) => {
  //     const rsvp = rsvps?.find(
  //       (rsvp) => rsvp.event?.id == invitation.event?.id
  //     );
  //     const going = rsvp?.going == true;
  //     const notGoing = rsvp?.going == false;

  //     return (

  //     );
  //   });
  // }

  const going = rsvp?.going === true;
  const notGoing = rsvp?.going !== null && rsvp?.going === false;

  const date = event?.date
    ? dateformat(new Date(event.date), "dddd mmmm dS, yyyy")
    : "";
  return (
    <InvitationsWrapper>
      <StyledSegment>
        <div>
          <StyledTitle>{name}</StyledTitle>
          <StyledForm>
            {going && isPlusOne && (
              <>
                <InputLabel>Name*</InputLabel>
                <NameInputWrapper>
                  <NameInput>
                    <Input
                      value={rsvp?.firstName || ""}
                      placeholder={"First"}
                      onChange={(value) => onFirstNameChange(value, guestId)}
                      id={`${guestId}`}
                    />
                  </NameInput>
                  <Input
                    value={rsvp?.lastName || ""}
                    placeholder={"Last"}
                    onChange={(value) => onLastNameChange(value, guestId)}
                    id={`${guestId}`}
                  />
                </NameInputWrapper>
              </>
            )}

            <EventWrapper>
              <HalfWidth>
                <EventName>{event?.name}</EventName>
                <EventDate>{date}</EventDate>
              </HalfWidth>
              <HalfWidth>
                <RadioOption
                  onClick={() => onRsvpChange(true, guestId)}
                  tabIndex="0"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      onRsvpChange(true, guestId);
                    }
                  }}
                >
                  <StyledRadio checked={going} tabIndex="-1" />
                  <p>Accept with pleasure</p>
                </RadioOption>
                <RadioOption
                  onClick={() => onRsvpChange(false, guestId)}
                  tabIndex="0"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      onRsvpChange(false, guestId);
                    }
                  }}
                >
                  <StyledRadio checked={notGoing} tabIndex="-1" />
                  <p>Regretfully decline</p>
                </RadioOption>
              </HalfWidth>
            </EventWrapper>

            {going && !isPlusOne && !isChild && (
              <EmailWrapper emailPresent={emailHidden}>
                <InputLabel>
                  Email Address
                  <EmailDescription>(for important updates)</EmailDescription>*
                </InputLabel>
                <Input
                  value={rsvp?.email || ""}
                  placeholder={
                    emailHidden ? ` ${emailHidden}` : " joe@email.com"
                  }
                  onChange={(value) => onEmailChange(value, guestId)}
                  id={`${guestId}`}
                />
              </EmailWrapper>
            )}

            {event?.hasMenu && going && event?.menus?.length > 0 && (
              <>
                <InputLabel>Meal Choice*</InputLabel>
                <StyledDropdown
                  selection
                  placeholder="Select a menu"
                  onChange={(e, { value }) => onMenuChange(value, guestId)}
                  value={rsvp?.menu?.id}
                  options={getOptions(event?.menus, isChild)}
                />
                <InputLabel>Dietary needs</InputLabel>
                <StyledDiet
                  value={rsvp?.diet || ""}
                  onChange={(e) => onDietChange(e.target.value, guestId)}
                  placeholder={"Enter any dietary needs or allergies"}
                />
              </>
            )}
          </StyledForm>
        </div>
        {going && isChild && (
          <ChildrenNote>
            <b>Please Note:</b> Please be aware that Aquatopia has a few areas
            that are not 100% child proofed. Please see this link for a full
            list of notices.
            <OpenLink
              href={ChildrenInfoSheet}
              target="_blank"
              rel="noopener noreferrer"
            >
              View list
            </OpenLink>
          </ChildrenNote>
        )}
      </StyledSegment>
    </InvitationsWrapper>
  );
}

export default EventTable;
