import React from "react";
import styled from "styled-components";
import { Button, Input } from "../../../../components";
import { styles } from "../../../../foundation";

const Wrapper = styled.div`
  margin: 8px;
`;

const StyledInputContainer = styled.div`
  width: 400px;
  margin: auto;
  margin-bottom: 60px;

  p {
    margin: 0;
  }

  @media only screen and (max-width: ${styles.MOBILE_WIDTH}px) {
    width: 100%;
    padding: 0;
  }
`;

const MessagesWrapper = styled.div`
  text-align: center;
  margin: 54px 12px;
`;

const StyledButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 120px;
`;

interface SearchProps {
  firstName: string;
  setFirstName: (string) => any;
  lastName: string;
  setLastName: (string) => any;
  onSearch: () => any;
}

function SearchNames(props: SearchProps) {
  const { firstName, setFirstName, lastName, setLastName, onSearch } = props;

  return (
    <Wrapper>
      <MessagesWrapper>
        <h3 className="title">Find your name</h3>
        <p>
          To RSVP for our wedding, search for your name and let us know if you
          will be able to attend.
        </p>
      </MessagesWrapper>
      <form>
        <StyledInputContainer>
          <Input
            id="firstName"
            label={"First Name"}
            placeholder="John"
            value={firstName}
            onChange={setFirstName}
          />
          <Input
            id="lastName"
            label="Last Name"
            placeholder="Smith"
            value={lastName}
            onChange={setLastName}
          />
        </StyledInputContainer>
        <StyledButtonContainer>
          <Button
            onClick={onSearch}
            type="submit"
            disabled={!firstName?.trim() || !lastName?.trim()}
          >
            Search
          </Button>
        </StyledButtonContainer>
      </form>
    </Wrapper>
  );
}

export default SearchNames;
