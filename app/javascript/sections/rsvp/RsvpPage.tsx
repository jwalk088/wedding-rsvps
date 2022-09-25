import React, { useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import styled from "styled-components";
import { Loader } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { sendGTMEvent } from "../../utils";
import image005 from "../../../assets/images/005.jpg";
import { FooterBar, TitleBar, Topbar, Button } from "../../components";
import {
  SearchNames,
  SelectNames,
  EnterRsvp,
  EventSelect,
  SuccessPage,
} from "./components";
import { colours, styles, Paths } from "../../foundation";

const FIND_GUEST = gql`
  query GuestQuery($firstName: String!, $lastName: String!) {
    findGuestByName(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

const GET_WEDDING_EVENT = gql`
  query WeddingEventQuery {
    event(id: 1) {
      date
      hasMenu
      id
      location
      name
      menus {
        title
        id
        description
        ages {
          id
          name
        }
      }
    }
  }
`;

const TitleImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
`;

const ErrorPageWrapper = styled.div`
  margin: 72px 0;
  text-align: center;

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    margin: 72px 32px;
  }
  p {
    padding: 12px 0;
  }
`;

const BlueBar = styled.div`
  background-color: ${colours.PRIMARY_BLUE};
  width: 100%;
  height: 140px;

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    height: 100px;
  }
`;

const ErrorButtonsWrapper = styled.div`
  button {
    margin: 4px;
  }
`;

function RsvpPage() {
  const navigate = useNavigate();
  const [completedEventSelection, setCompletedEventSelection] = useState(false);
  const [completedNameSearch, setCompletedNameSearch] = useState(false);
  const [completedNameSelection, setCompletedNameSelection] = useState(false);
  const [completedEnterRsvp, setCompletedEnterRsvp] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  // const [event, setEvent] = useState();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedGuestIndex, setSelectedGuestIndex] = useState(null);
  const [guest, setGuest] = useState();

  const [findGuest, { loading, data, error }] = useLazyQuery(FIND_GUEST, {
    fetchPolicy: "no-cache",
  });

  const {
    loading: weddingLoading,
    data: weddingData,
    error: weddingError,
  } = useQuery(GET_WEDDING_EVENT);

  function searchNames() {
    findGuest({
      variables: {
        firstName: firstName.toLowerCase().trim(),
        lastName: lastName.toLowerCase().trim(),
      },
    });
    sendGTMEvent("rsvp", "search names");
    setCompletedNameSearch(true);
  }

  function resetNameSearch() {
    setFirstName("");
    setLastName("");
    setSelectedGuestIndex(null);
    setGuest(null);
    setCompletedNameSearch(false);
    setCompletedNameSelection(false);
    setCompletedEnterRsvp(false);
    setErrorMessage("");
  }

  function selectGuest() {
    if (selectedGuestIndex !== null) {
      setGuest(data?.findGuestByName[selectedGuestIndex]);
      setCompletedNameSelection(true);
    }
  }

  function ErrorPage(props) {
    sendGTMEvent("rsvp", "rsvp error");

    return (
      <div>
        <ErrorPageWrapper>
          <h3 className="title">Sorry</h3>
          <p>{props.message}</p>
          <ErrorButtonsWrapper>
            <Button style="secondary" onClick={() => navigate(Paths.Contact)}>
              Contact Us
            </Button>
            <Button onClick={resetNameSearch}>Search Again</Button>
          </ErrorButtonsWrapper>
        </ErrorPageWrapper>
      </div>
    );
  }

  function pageContent() {
    // if (!completedEventSelection) {
    //   return (
    //     <EventSelect
    //       onSelect={(event) => {
    //         setEvent(event);
    //         setCompletedEventSelection(true);
    //       }}
    //     />
    //   );
    // } else if (!completedNameSearch) {
    if (errorMessage) {
      return <ErrorPage message={errorMessage} />;
    } else if ((!weddingLoading && weddingError) || (!loading && error)) {
      return (
        <ErrorPage message="We could not load this page at this time. Please try again later or contact Jessica and Mark" />
      );
    } else if (loading || weddingLoading) {
      return <Loader active />;
    } else if (!completedNameSearch) {
      return (
        <SearchNames
          firstName={firstName}
          setFirstName={(value) => setFirstName(value)}
          lastName={lastName}
          setLastName={(value) => setLastName(value)}
          onSearch={searchNames}
        />
      );
    } else if (!completedNameSelection && !loading) {
      if (data?.findGuestByName?.length == 0) {
        return (
          <ErrorPage
            message={
              "We could not find a guest by that name. Please search again or contact Jessica and Mark."
            }
          />
        );
      }
      return (
        <SelectNames
          guestOptions={data?.findGuestByName}
          onSelectGuest={(index) => setSelectedGuestIndex(index)}
          onSubmit={selectGuest}
          selectedGuest={selectedGuestIndex}
          resetSearch={resetNameSearch}
        />
      );
    } else if (!completedEnterRsvp && guest) {
      if (!weddingData) {
        return (
          <ErrorPage message="We could not load this page at this time. Please try again later or contact Jessica and Mark" />
        );
      }
      return (
        <EnterRsvp
          guest={guest}
          event={weddingData?.event}
          onSubmit={() => setCompletedEnterRsvp(true)}
          onError={() =>
            setErrorMessage(
              "We encountered an error saving your rsvp. Please try again later or contact Jessica and Mark"
            )
          }
          resetSearch={resetNameSearch}
        />
      );
    } else if (completedEnterRsvp) {
      return <SuccessPage guest={guest} />;
    }
  }

  return (
    <div>
      <Topbar />
      <TitleBar colour="light">RSVP</TitleBar>
      <TitleImage src={image005} />
      {pageContent()}
      {!completedEnterRsvp && <BlueBar />}
      <FooterBar />
    </div>
  );
}

export default RsvpPage;
