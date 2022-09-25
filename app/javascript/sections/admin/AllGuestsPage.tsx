import React, { useState } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Loader, Tab } from "semantic-ui-react";
import { CommentTable, RsvpTable, RsvpTotals } from ".";

const AllGuests = gql`
  query AllGuests {
    guests {
      id
      firstName
      lastName
      family {
        id
      }
      age {
        id
        name
      }
      group {
        id
        name
      }
      allowedPlusOne
      bringingPlusOne
      members {
        firstName
        lastName
        id
      }
      plusOneGuest {
        firstName
        lastName
        id
        group {
          id
          name
        }
        rsvps {
          id
          event {
            name
            id
          }
          going
          menu {
            title
          }
          diet
          comment
        }
      }
      rsvps {
        id
        event {
          name
          id
        }
        going
        menu {
          title
        }
        diet
        comment
      }
    }
    comments {
      id
      guest {
        firstName
        lastName
      }
      message
      createdAt
    }
    rsvps {
      updatedAt
      id
      going
      menu {
        id
        title
      }
      person {
        ... on Guest {
          firstName
          lastName
          id
          group {
            id
            name
          }
          age {
            id
            name
          }
        }
        ... on PlusOneGuest {
          firstName
          lastName
          id
          group {
            id
            name
          }
        }
      }
    }

    ages {
      id
      name
    }
    groups {
      id
      name
    }
    menus {
      id
      title
    }
    totals {
      adultCount
      childCount
      going
      notGoing
      plusOneNotGoing
      jessFamily
      jessFriends
      markFamily
      markFriends
      weddingParty
      totalRsvpsCount
      beefMeal
      salmonMeal
      vegMeal
      kidsMeal
    }
  }
`;

const UpdateGuest = gql`
  mutation UpdateGuest($input: UpdateGuestMutationInput!) {
    updateGuest(input: $input) {
      guest {
        id
        firstName
        lastName
        group {
          id
          name
        }
        age {
          id
          name
        }
        allowedPlusOne
        members {
          firstName
          id
        }
      }
      errors
    }
  }
`;

export interface EditValues {
  id: string;
  firstName: string;
  lastName: string;
  allowedPlusOne: boolean;
}

const blankValues = {
  id: "",
  firstName: "",
  lastName: "",
  allowedPlusOne: null,
};

const Wrapper = styled.div`
  margin: 12px;
`;

function AllGuestsPage() {
  const { data, loading } = useQuery(AllGuests);
  const [editValues, setEditValues] = useState<EditValues>({
    ...blankValues,
  });
  const [page, setPage] = useState(0);

  const [submitUpdate] = useMutation(UpdateGuest);

  function setEdit(guest) {
    const initial = {
      id: guest.id,
      firstName: guest.firstName,
      lastName: guest.lastName,
      allowedPlusOne: guest.allowedPlusOne,
    };

    setEditValues(initial);
  }

  function setCancelEdit() {
    setEditValues({ ...blankValues });
  }

  function submitEdit() {
    submitUpdate({
      variables: {
        input: {
          id: editValues.id,
          guestAttributes: {
            firstName: editValues.firstName,
            lastName: editValues.lastName,
            allowedPlusOne: editValues.allowedPlusOne,
          },
        },
      },
    });
    setCancelEdit();
  }

  const panes = [
    {
      menuItem: "Rsvps",
      render: () => (
        <Tab.Pane attached={false}>
          <RsvpTable
            guests={data?.guests}
            editValues={editValues}
            setCancelEdit={setCancelEdit}
            setEditValues={setEditValues}
            submitEdit={submitEdit}
            setEdit={setEdit}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Comments",
      render: () => (
        <Tab.Pane attached={false}>
          <CommentTable comments={data?.comments} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Totals",
      render: () => (
        <Tab.Pane attached={false}>
          <RsvpTotals totals={data?.totals} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Wrapper>
      <h3>Admin</h3>

      {loading ? (
        <Loader active inline="centered" />
      ) : (
        <Tab menu={{ attached: false }} panes={panes} />
      )}
    </Wrapper>
  );
}

export default AllGuestsPage;
