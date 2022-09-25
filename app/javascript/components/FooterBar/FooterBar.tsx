import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Copyright } from "..";
import { Paths, colours, isMobile } from "../../foundation";

// desktop
const StyledMenu = styled.div`
  padding: 20px;
  background-color: ${colours.WHITE};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 24px;
`;

const HomeLink = styled.div`
  a {
    font-family: "Cinzel";
  }
`;

const StyledLink = styled.div`
  text-transform: uppercase;
  padding: 8px 20px;
  cursor: pointer;
  font-family: "Poppins-Light", sans-serif;
`;

// mobile

const MobileHomeWrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 12px 16px 12px 42px;

  a {
    font-family: "Cinzel";
    font-size: 16px;
  }
`;

const MobileFooter = styled.footer``;

const MobileLink = styled.div`
  text-transform: uppercase;
  cursor: pointer;
  font-family: "Poppins-Light", sans-serif;
  color: ${colours.BLACK};
  font-size: 14px;
`;

const MobileWrapper = styled.div`
  display: flex;
  margin: 6px 0;
`;

const MobileLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 12px;
  font-weight: bold;
  font-size: 12px;
`;

const MobileLinksWrapper = styled.div`
  display: inline-grid;
  grid-template-columns: 50% 50%;
  width: 100%;
`;

const CopyrightWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 8px;
`;

function FooterBar() {
  if (isMobile()) {
    return (
      <MobileFooter>
        <MobileWrapper>
          <MobileHomeWrapper>
            <MobileLink>
              <Link to={{ pathname: Paths.Home }}> J&M</Link>
            </MobileLink>
          </MobileHomeWrapper>
          <MobileLinksWrapper>
            <MobileLinkWrapper>
              <MobileLink>
                <Link to={{ pathname: Paths.Rsvp }}>Rsvp</Link>
              </MobileLink>
            </MobileLinkWrapper>
            <MobileLinkWrapper>
              <MobileLink>
                <Link to={{ pathname: Paths.Events }}>Events</Link>
              </MobileLink>
            </MobileLinkWrapper>
            <MobileLinkWrapper>
              <MobileLink>
                <Link to={{ pathname: Paths.Faq }}>FAQ</Link>
              </MobileLink>
            </MobileLinkWrapper>
            <MobileLinkWrapper>
              <MobileLink>
                <Link to={{ pathname: Paths.Contact }}>Contact</Link>
              </MobileLink>
            </MobileLinkWrapper>
          </MobileLinksWrapper>
        </MobileWrapper>
        <CopyrightWrapper>
          <Copyright />
        </CopyrightWrapper>
      </MobileFooter>
    );
  }

  return (
    <FooterWrapper>
      <StyledMenu>
        <HomeLink>
          <StyledLink>
            <Link to={{ pathname: Paths.Home }}> J&M</Link>
          </StyledLink>
        </HomeLink>
        <StyledLink>
          <Link to={{ pathname: Paths.Rsvp }}>Rsvp</Link>
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
      </StyledMenu>
      <Copyright />
    </FooterWrapper>
  );
}

export default FooterBar;
