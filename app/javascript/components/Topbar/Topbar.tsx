import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";
import { Paths, colours, isMobile, styles } from "../../foundation";

// desktop
const StyledMenu = styled.div`
  padding: 18px;
  text-align: center;
  background-color: ${colours.WHITE};
  padding-top: 0px;
`;

const Header = styled.div`
  margin: ${(props) => (props.homePage ? 54 : 36)}px;
  cursor: pointer;
  font-family: "Cinzel";
  font-size: 32px;
  background-color: ${colours.WHITE};
`;

const LinksWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledLink = styled.p`
  text-transform: uppercase;
  padding: 8px 40px;
  cursor: pointer;
  font-family: "Poppins-Light", sans-serif;
  font-size: 16px;
  /* font-weight: lighter; */

  @media only screen and (max-width: ${styles.MOBILE_LARGE_WIDTH}px) {
    padding: 8px 32px;
  }
`;

const StyledLogout = styled.p`
  margin-bottom: 0;
  text-align: end;
  text-transform: uppercase;
  margin-right: 12px;
  padding-top: 18px;
  font-family: "Poppins-Light", sans-serif;
  font-weight: lighter;
  cursor: pointer;
`;

// mobile
const MobileMenu = styled.div`
  margin: ${(props) => (props.homePage ? "60px 36px" : "32px 36px")};
  background-color: ${colours.WHITE};
`;

const MobileHeader = styled.div`
  font-family: "Cinzel";
  font-size: 28px;
  text-align: center;
`;

const MobileDropdown = styled.ul`
  width: 100%;
  position: absolute;
  height: 100%;
  background: white;
  left: 0;
  margin-top: 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding-inline-start: 0;
`;

const DropdownIcon = styled.button`
  right: 20px;
  position: absolute;
  background: none;
  border: none;
`;

const MobileItem = styled.li`
  padding: 16px;
  list-style: none;

  a {
    font-size: 18px;
    font-family: "Poppins";
  }
`;

const MobileLogout = styled.div`
  margin-top: 40px;
`;

const SignOut = gql`
  mutation SignOut {
    signOut(input: {}) {
      success
    }
  }
`;

interface Props {
  homePage?: boolean;
}

function Topbar({ homePage = false }: Props) {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [signOut] = useMutation(SignOut, {
    onCompleted: (client) => client.resetStore(),
  });

  function logout() {
    signOut();
    navigate(Paths.Login);
  }

  if (isMobile()) {
    return (
      <MobileMenu homePage={homePage}>
        <DropdownIcon aria-haspopup="listbox" onClick={() => setOpen(!open)}>
          <Icon name="bars" />
        </DropdownIcon>
        <MobileHeader>
          <Link to={Paths.Home}>Jessica & Mark</Link>
        </MobileHeader>
        {open && (
          <MobileDropdown role="listbox" tabindex="-1" aria-expanded={open}>
            <MobileItem>
              <Link to={Paths.Rsvp}>RSVP</Link>
            </MobileItem>
            <MobileItem>
              <Link to={Paths.Events}>Events</Link>
            </MobileItem>
            <MobileItem>
              <Link to={Paths.Faq}>FAQ</Link>
            </MobileItem>
            <MobileItem>
              <Link to={Paths.Contact}>Contact</Link>
            </MobileItem>
            <MobileLogout>
              <MobileItem>
                <a onClick={() => logout()}>Logout</a>
              </MobileItem>
            </MobileLogout>
          </MobileDropdown>
        )}
      </MobileMenu>
    );
  }

  return (
    <StyledMenu>
      <StyledLogout>
        <a tabIndex="0" onClick={() => logout()}>
          Logout
        </a>
      </StyledLogout>
      <Header homePage={homePage}>
        <Link to={{ pathname: Paths.Home }}> Jessica & Mark</Link>
      </Header>
      <LinksWrapper>
        <StyledLink>
          <Link to={{ pathname: Paths.Rsvp }}>RSVP</Link>
        </StyledLink>
        <StyledLink>
          <Link to={{ pathname: Paths.Events }}>Events</Link>
        </StyledLink>
        <StyledLink>
          <Link to={{ pathname: Paths.Faq }}>FAQ</Link>
        </StyledLink>
        <StyledLink>
          <Link to={{ pathname: Paths.Contact }}>Contact</Link>
        </StyledLink>
      </LinksWrapper>
    </StyledMenu>
  );
}

export default Topbar;
