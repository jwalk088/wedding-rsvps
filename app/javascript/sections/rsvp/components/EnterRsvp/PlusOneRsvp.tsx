import React from "react";
import styled from "styled-components";
import {
  Button,
  Dropdown,
  Form,
  Input,
  Radio,
  Segment,
} from "semantic-ui-react";

const StyledTitle = styled.h2`
  text-align: center;
`;

const InvitationsWrapper = styled.div`
  padding: 0 10%;
  margin-bottom: 20px;
`;

const EventName = styled.p`
  font-size: 20px;
  margin-bottom: 0;
`;

const StyledForm = styled(Form)`
  display: flex;
  font-family: "NugoSans";

  .field {
    padding: 8px;
    font-size: 12px;
  }
`;

const StyledDropdown = styled(Dropdown)`
  font-family: "Raylig";
  width: 100%;
  margin-bottom: 12px;
`;

const FormField = styled.div`
  padding: 8px 8px 8px 0;
  margin-bottom: 12px;
  width: 50%;

  .input {
    width: 100%;
  }
`;

const NameInputs = styled.div`
  display: flex;
`;

interface PlusOneProps {
  guestName: string;
  allInvitations: [any];
}

function PlusOneRsvp(props: PlusOneProps) {
  const { guestName, allInvitations } = props;

  function invitationsSection() {
    return allInvitations.map((invitation, index) => {
      return (
        <div key={index}>
          <EventName>{invitation?.event?.name}</EventName>
          <StyledForm>
            <Form.Field>
              <Radio
                label="Accept with pleasure"
                name="radioGroup"
                value="YES"
                // onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Regretfully decline"
                name="radioGroup"
                value="NO"
                // onChange={this.handleChange}
              />
            </Form.Field>
          </StyledForm>
          {/* {invitation.event.hasMenu && going && (
            <StyledDropdown
              selection
              placeholder="Select a menu"
              onChange={(e, { value }) =>
                onMenuChange(value, invitation.event.id, guestId)
              }
              value={rsvp?.menu?.id}
              options={getOptions(invitation.event?.menus)}
            />
          )} */}
        </div>
      );
    });
  }

  return (
    <InvitationsWrapper>
      <StyledTitle>{guestName}'s Guest</StyledTitle>
      <Segment>
        <NameInputs>
          <FormField>
            <EventName>First Name</EventName>
            <Input placeholder={"First Name"} />
          </FormField>
          <FormField>
            <EventName>Last Name</EventName>
            <Input placeholder={"Last Name"} />
          </FormField>
        </NameInputs>
        {invitationsSection()}
      </Segment>
    </InvitationsWrapper>
  );
}

export default PlusOneRsvp;
