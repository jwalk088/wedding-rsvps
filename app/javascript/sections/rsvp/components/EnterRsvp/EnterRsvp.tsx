import React, { useEffect, useReducer, useState, useRef } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

import styled from "styled-components";
import { Icon, Loader, Message } from "semantic-ui-react";
import { sendGTMEvent } from "../../../../utils";

import EventTable from "./EventTable";
import { colours, styles } from "../../../../foundation";
import { Button } from "../../../../components";
import rsvpReducer from "../../reducer/rsvpReducer";

const RSVP_MUTATION = gql`
  mutation RsvpMutation(
    $input: NewRsvpBulkMutationInput!
    $emailInput: UpdateEmailBulkMutationInput!
  ) {
    addRsvpBulk(input: $input) {
      rsvps {
        id
        event {
          id
          name
        }
      }
      errors
    }
    updateEmailBulk(input: $emailInput) {
      guests {
        id
        emailHidden
      }
      errors
    }
  }
`;

const FIND_GUESTS = gql`
  query GuestsByEvent($eventId: ID!, $guestId: ID!) {
    guestsByEvent(eventId: $eventId, guestId: $guestId) {
      guests {
        id
        firstName
        lastName
        emailHidden
        age {
          id
        }
        allowedPlusOne
        bringingPlusOne
        rsvps {
          event {
            id
            name
          }
          comment
          diet
          going
          menu {
            id
          }
          id
        }
      }
      plusOneGuests {
        id
        guestId
        firstName
        lastName
        rsvps {
          event {
            id
            name
          }
          comment
          diet
          going
          menu {
            id
          }
          id
        }
      }
    }
  }
`;

const MessagesWrapper = styled.div`
  text-align: center;
  margin: 54px 12px;
`;

const StyledContent = styled.div`
  text-align: center;
  margin: 40px 0;
  justify-content: center;
  display: flex;
`;

const ButtonWrapper = styled.div`
  margin: 12px;
`;

const SubmitButton = styled(Button)`
  background: #3c658b !important;
  color: white !important;
  padding-left: 12px;
`;

const BlueBackground = styled.div`
  background-image: linear-gradient(
    to top,
    #ffffff 15%,
    ${colours.LIGHT_BLUE} 15%,
    ${colours.LIGHT_BLUE} 85%,
    #ffffff 85%
  );
  background-image: -o-linear-gradient(
    top,
    #ffffff 15%,
    ${colours.LIGHT_BLUE} 15%,
    ${colours.LIGHT_BLUE} 85%,
    #ffffff 85%
  );
  background-image: -moz-linear-gradient(
    top,
    #ffffff 15%,
    ${colours.LIGHT_BLUE} 15%,
    ${colours.LIGHT_BLUE} 85%,
    #ffffff 85%
  );

  background-image: -webkit-linear-gradient(
    top,
    #ffffff 15%,
    ${colours.LIGHT_BLUE} 15%,
    ${colours.LIGHT_BLUE} 85%,
    #ffffff 85%
  );

  background-image: -ms-linear-gradient(
    top,
    #ffffff 15%,
    ${colours.LIGHT_BLUE} 15%,
    ${colours.LIGHT_BLUE} 85%,
    #ffffff 85%
  );
`;

const ErrorMessages = styled(Message)`
  margin: 0px auto 30px !important;
  width: 520px;
  border-radius: 0 !important;
  box-shadow: 0 0 0 2px #b96c6b !important;

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    width: 98%;
  }

  ul {
    margin: 0;
    margin-left: 20px;
    font-family: "Poppins";
    font-size: 14px;

    li {
      list-style-type: disc;
    }
  }

  i {
    color: #a24240 !important;
  }
`;

const ErrorTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  p {
    margin: 0 !important;
    margin-left: 8px !important;
    font-size: 16px;
    @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
      font-size: 14px;
    }
  }
`;

interface EnterRsvpProps {
  guest: any;
  event: any;
  onSubmit: () => any;
  onError: () => any;
  resetSearch: () => any;
}

export interface RsvpItem {
  going?: boolean;
  diet?: string;
  guestId?: number; // for plus one guest
  personId?: number;
  event?: any;
  menu?: any;
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  emailHidden?: string;
  isGuest?: boolean;
  isChild?: boolean;
  allowedPlusOne?: boolean;
  bringingPlusOne?: boolean;
}

function EnterRsvp(props: EnterRsvpProps) {
  const { guest, event, onSubmit, onError, resetSearch } = props;
  const [errors, setErrors] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const errorRef = useRef(null);

  const { loading, data, error } = useQuery(FIND_GUESTS, {
    variables: {
      guestId: guest?.id,
      eventId: event?.id,
    },
    fetchPolicy: "no-cache",
  });

  // const [guestRsvps, setGuestRsvps] = useState(guest.rsvps);
  // const [memberRsvps, setMemberRsvps] = useState<MemberRsvps>({});
  const [rsvps, dispatch] = useReducer(rsvpReducer, {});
  const [plusOneRsvps, dispatchPlusOne] = useReducer(rsvpReducer, {});

  useEffect(() => {
    const initialRsvps = {};
    const initialPlusOneRsvps = {};
    data?.guestsByEvent?.guests?.forEach((member) => {
      const allRsvps =
        member?.rsvps.filter((rsvp) => rsvp?.event?.id == event?.id) || [];

      const rsvpForEvent = allRsvps.length == 0 ? {} : allRsvps[0];

      const rsvp = {
        going: rsvpForEvent.going,
        diet: rsvpForEvent.diet,
        personId: member.id,
        event: event,
        menu: rsvpForEvent.menu,
        id: rsvpForEvent.id,
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        emailHidden: member.emailHidden,
        isGuest: true,
        isChild: member.age?.id !== "1",
        allowedPlusOne: member.allowedPlusOne,
        bringingPlusOne: member.bringingPlusOne,
      };

      if (member.allowedPlusOne && !member.bringingPlusOne) {
        initialPlusOneRsvps[member.id] = {
          going: member.bringingPlusOne == null ? null : false,
          diet: null,
          personId: null,
          guestId: member.id,
          event: event,
          menu: null,
          id: null,
          firstName: "",
          lastName: "",
          isGuest: false,
        };
      }

      initialRsvps[member.id] = rsvp;
    });

    data?.guestsByEvent?.plusOneGuests?.forEach((member) => {
      const allRsvps =
        member?.rsvps.filter((rsvp) => rsvp?.event?.id == event?.id) || [];

      const rsvpForEvent = allRsvps.length == 0 ? {} : allRsvps[0];

      if (!member.guestId) {
        return;
      }

      const rsvp = {
        going: rsvpForEvent.going,
        diet: rsvpForEvent.diet,
        guestId: member.guestId,
        personId: member.id,
        event: event,
        menu: rsvpForEvent.menu,
        id: rsvpForEvent.id,
        firstName: member.firstName,
        lastName: member.lastName,
        isGuest: false,
        isChild: false,
      };

      initialPlusOneRsvps[member.guestId] = rsvp;
    });

    dispatch({ initialState: initialRsvps });
    dispatchPlusOne({ initialState: initialPlusOneRsvps });
  }, [!!data]);

  const [submitRsvps] = useMutation(RSVP_MUTATION, {
    onError: () => {
      onError();
    },
    onCompleted: () => {
      onSubmit();
    },
  });

  function submitDisabled() {
    let rsvpedCount = 0;
    Object.values(rsvps).map((value: RsvpItem) => {
      if (value.going != null) {
        rsvpedCount++;
      }
    });
    return rsvpedCount == 0;
  }

  function validateRsvps() {
    let errors = [];
    // if none have entered anything, or if any are going but missing properties

    Object.values(rsvps).map((value: RsvpItem) => {
      if (value.going !== null) {
        if (value.going) {
          // all types of guest need a menu
          if (!value.menu) {
            errors.push(
              `Please select a menu choice for ${
                value.firstName || "all guests"
              }`
            );
          }

          if (value.isGuest) {
            // only guests need an email
            if (!value.isChild && !value.email && !value.emailHidden) {
              errors.push(
                `Please enter an email for ${value.firstName || "all guests"}`
              );
            } else if (value.email) {
              const regex =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
              if (!regex.test(value.email)) {
                errors.push(
                  `Please enter a valid email for ${
                    value.firstName || "all guests"
                  }`
                );
              }
            }
          }
        }
      }
    });

    Object.values(plusOneRsvps).map((value: RsvpItem) => {
      if (value.going !== null) {
        if (value.going) {
          // all types of guest need a menu
          if (!value.menu) {
            errors.push(
              `Please select a menu choice for ${
                value.firstName || "all guests"
              }`
            );
          }

          if (!value.isGuest) {
            // plus one guests need name
            if (!value.firstName || !value.lastName) {
              errors.push(`Please enter a name for all guests`);
            }
          }
        }
      }
    });
    return errors;
  }

  function submitRsvp(event) {
    event.preventDefault();
    setLoadingSubmit(true);
    setErrors([]);
    const validateErrors = validateRsvps();
    if (validateErrors.length > 0) {
      setErrors(validateErrors);
      setLoadingSubmit(false);
      errorRef.current.scrollIntoView([{ behavior: "smooth" }]);
      return false;
    }

    const rsvpsToSubmit = [];
    const emailsToSubmit = [];
    // guestRsvps.forEach((rsvp) => {
    //   rsvpsToSubmit.push({
    //     going: rsvp.going,
    //     diet: rsvp.diet,
    //     guestId: guest.id,
    //     eventId: rsvp.event.id,
    //     menuId: rsvp.menu?.id,
    //     id: rsvp.id,
    //   });
    // });

    Object.entries(rsvps).map(([key, value]: [string, RsvpItem]) => {
      if (!value) return;
      rsvpsToSubmit.push({
        going: value.going,
        diet: value.diet,
        guestId: key,
        eventId: value.event?.id,
        menuId: value.menu?.id,
        id: value.id,
      });
      if (value.email) {
        emailsToSubmit.push({
          guestId: key,
          email: value.email,
        });
      }
    });

    Object.entries(plusOneRsvps).map(([key, value]: [string, RsvpItem]) => {
      if (!value || value.going == null) return;
      rsvpsToSubmit.push({
        going: value.going,
        diet: value.diet,
        eventId: value.event?.id,
        menuId: value.menu?.id,
        id: value.id,
        plusOneAttributes: {
          firstName: value.firstName,
          lastName: value.lastName,
          guestId: value.guestId,
        },
      });
    });

    sendGTMEvent("rsvp", "submit rsvp");
    // TODO: add validation
    try {
      submitRsvps({
        variables: {
          input: { rsvpAttributes: rsvpsToSubmit },
          emailInput: { emailAttributes: emailsToSubmit },
        },
      });
    } catch (e) {
      sendGTMEvent("rsvp", "submit rsvp error");
      setErrors([
        "A server error occurred. Please try again later or contact us directly.",
      ]);
    } finally {
      setLoadingSubmit(false);
      return false;
    }
  }

  if (loading) {
    return <Loader active />;
  }

  function getErrorMessages(errors) {
    return (
      <ErrorMessages negative>
        <ErrorTitle>
          <Icon name="exclamation circle" />
          <p>We encountered an error in submitting your response.</p>
        </ErrorTitle>
        <ul>
          {errors.map((error, index) => (
            <li key={`error-${index}`}>{error}</li>
          ))}
        </ul>
      </ErrorMessages>
    );
  }

  function getInputSections() {
    return Object.values(rsvps).map((rsvp: RsvpItem, index) => {
      const guestName = `${rsvp?.firstName} ${rsvp?.lastName?.charAt(0)}.`;

      return (
        <div key={rsvp?.id || `${index}-rsvp`}>
          <EventTable
            rsvp={rsvp}
            name={guestName}
            dispatch={dispatch}
            isPlusOne={false}
          />
          {rsvp.allowedPlusOne ? (
            <EventTable
              rsvp={plusOneRsvps[rsvp.personId]}
              name={`${guestName}'s Guest`}
              dispatch={dispatchPlusOne}
              isPlusOne={true}
            />
          ) : null}
        </div>
      );
    });
  }

  return (
    <div ref={errorRef}>
      <MessagesWrapper>
        <h3 className="title">Please confirm your attendance</h3>
        <p>
          You can confirm the choices for other members in your party now too.
          <br />
          You can always come back to update your selections before May 14,
          2022.
        </p>
      </MessagesWrapper>
      {(loading || loadingSubmit) && <Loader active />}
      <form onSubmit={submitRsvp}>
        {errors.length > 0 && getErrorMessages(errors)}
        {data && <BlueBackground> {getInputSections()}</BlueBackground>}
        <StyledContent>
          <ButtonWrapper>
            <Button onClick={resetSearch} style="secondary">
              Search Again
            </Button>
          </ButtonWrapper>
          <ButtonWrapper>
            <SubmitButton
              type="submit"
              disabled={submitDisabled() || loadingSubmit}
            >
              Submit
            </SubmitButton>
          </ButtonWrapper>
        </StyledContent>
      </form>
    </div>
  );
}

export default EnterRsvp;
