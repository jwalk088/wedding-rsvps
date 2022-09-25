import React from "react";
import styled from "styled-components";
import {
  Icon,
  Input,
  Label,
  Radio,
  SemanticCOLORS,
  Table,
} from "semantic-ui-react";

import { EditValues } from "./AllGuestsPage";

const GuestIndicator = styled(Table.Cell)`
  background: #f6bca0;
`;

const PlusOneGuestIndicator = styled(Table.Cell)`
  background: #f3e9b2;
`;

interface Props {
  guests: any;
  editValues: EditValues;
  setEditValues: (EditValues) => void;
  setCancelEdit: () => void;
  submitEdit: () => void;
  setEdit: (any) => void;
}

export default function RsvpTable({
  guests,
  editValues,
  setEditValues,
  setCancelEdit,
  submitEdit,
  setEdit,
}: Props) {
  function getMembers(members) {
    if (!members) {
      return "-";
    }
    return members.map((member) => (
      <Label>
        {member.firstName} {member.lastName}
      </Label>
    ));
  }

  function getGroup(group) {
    if (!group) return "-";
    let color: SemanticCOLORS = "black";
    switch (group.id) {
      case "1":
        color = "pink";
        break;
      case "2":
        color = "purple";
        break;
      case "3":
        color = "violet";
        break;
      case "4":
        color = "orange";
        break;
      case "5":
        color = "yellow";
    }

    return <Label color={color}>{group.name}</Label>;
  }

  function getAge(age) {
    if (!age) return "-";
    return (
      <Label color={age.id == "1" ? "grey" : age.id == "2" ? "teal" : "black"}>
        {age.name}
      </Label>
    );
  }

  function getGoing(going) {
    if (going == null) return "-";
    return (
      <Label color={going ? "green" : "red"}>{going ? "Yes" : "No"}</Label>
    );
  }

  function getEditNameCell() {
    return (
      <Table.Cell>
        <Input
          placeholder="First Name"
          name="firstName"
          value={editValues.firstName}
          onChange={(e, { name, value }) =>
            setEditValues({ ...editValues, firstName: value })
          }
        />
        <Input
          placeholder="Last Name"
          name="lastName"
          value={editValues.lastName}
          onChange={(e, { name, value }) =>
            setEditValues({ ...editValues, lastName: value })
          }
        />
      </Table.Cell>
    );
  }

  function getEditAllowedPlusOneCell() {
    return (
      <Table.Cell>
        <Radio
          label=""
          onClick={() =>
            setEditValues({
              ...editValues,
              allowedPlusOne: !editValues.allowedPlusOne,
            })
          }
          checked={editValues.allowedPlusOne}
        />
      </Table.Cell>
    );
  }

  function getEditControlCell() {
    return (
      <Table.Cell>
        <Icon
          link
          bordered
          name="x"
          inverted
          color="red"
          onClick={() => setCancelEdit()}
        />
        <Icon
          link
          bordered
          name="check"
          inverted
          color="green"
          onClick={() => submitEdit()}
        />
      </Table.Cell>
    );
  }

  function getPlusOneGuestRow(guest) {
    const plusOneGuest = guest.plusOneGuest;
    const rsvp =
      plusOneGuest.rsvps && plusOneGuest.rsvps?.length > 0
        ? plusOneGuest.rsvps[0]
        : {};

    return (
      <Table.Row key={`${guest.id}-plusOne`}>
        <PlusOneGuestIndicator />

        <Table.Cell>{plusOneGuest.id}</Table.Cell>
        <Table.Cell>
          {plusOneGuest.firstName} {plusOneGuest.lastName}
        </Table.Cell>
        <Table.Cell>{guest.family?.id}</Table.Cell>
        <Table.Cell>{getMembers([guest])}</Table.Cell>
        <Table.Cell>{"-"}</Table.Cell>
        <Table.Cell>{getGroup(plusOneGuest.group)}</Table.Cell>
        <Table.Cell>{"-"}</Table.Cell>
        <Table.Cell>{"-"}</Table.Cell>

        <Table.Cell>{"-"}</Table.Cell>
        <Table.Cell>{getGoing(rsvp.going)}</Table.Cell>
        <Table.Cell>{rsvp.menu?.title}</Table.Cell>
        <Table.Cell>{rsvp.diet || "-"}</Table.Cell>
        <Table.Cell>{"-"}</Table.Cell>
      </Table.Row>
    );
  }

  function getRow(guest) {
    const showEdit = editValues?.id == guest.id;

    const plusOne = guest.plusOneGuest
      ? `${guest.plusOneGuest.firstName} ${guest.plusOneGuest.lastName}`
      : "-";

    const rsvp = guest.rsvps && guest.rsvps?.length > 0 ? guest.rsvps[0] : {};

    return (
      <>
        <Table.Row key={guest.id}>
          <GuestIndicator />

          <Table.Cell>{guest.id}</Table.Cell>
          {showEdit ? (
            getEditNameCell()
          ) : (
            <Table.Cell>
              {guest.firstName} {guest.lastName}
            </Table.Cell>
          )}
          <Table.Cell>{guest.family?.id}</Table.Cell>
          <Table.Cell>{getMembers(guest.members)}</Table.Cell>
          <Table.Cell>{getAge(guest.age)}</Table.Cell>
          <Table.Cell>{getGroup(guest.group)}</Table.Cell>
          {showEdit ? (
            getEditAllowedPlusOneCell()
          ) : (
            <Table.Cell>{guest.allowedPlusOne ? "Yes" : "-"}</Table.Cell>
          )}
          <Table.Cell>
            {guest.bringingPlusOne == null
              ? "-"
              : guest.bringingPlusOne == true
              ? "Yes"
              : "No"}
          </Table.Cell>
          <Table.Cell>{plusOne}</Table.Cell>
          <Table.Cell>{getGoing(rsvp.going)}</Table.Cell>
          <Table.Cell>{rsvp.menu?.title}</Table.Cell>
          <Table.Cell>{rsvp.diet || "-"}</Table.Cell>
          {showEdit ? (
            getEditControlCell()
          ) : (
            <Table.Cell>
              <Icon
                link
                name="edit"
                bordered
                inverted
                color="grey"
                onClick={() => setEdit(guest)}
              />
            </Table.Cell>
          )}
        </Table.Row>
        {guest.plusOneGuest && getPlusOneGuestRow(guest)}
      </>
    );
  }

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell> </Table.HeaderCell>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Family</Table.HeaderCell>
          <Table.HeaderCell>Members</Table.HeaderCell>
          <Table.HeaderCell>Age</Table.HeaderCell>
          <Table.HeaderCell>Group</Table.HeaderCell>
          <Table.HeaderCell>Allowed Plus One</Table.HeaderCell>
          <Table.HeaderCell>Bringing Plus One</Table.HeaderCell>
          <Table.HeaderCell>Plus One Guest</Table.HeaderCell>
          <Table.HeaderCell>Going</Table.HeaderCell>
          <Table.HeaderCell>Menu</Table.HeaderCell>
          <Table.HeaderCell>Diet</Table.HeaderCell>
          <Table.HeaderCell>Edit</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{guests?.map(getRow)}</Table.Body>
    </Table>
  );
}
