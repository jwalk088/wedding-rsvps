import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import { Paths, AdminPaths } from ".";
import {
  Home,
  RsvpPage,
  PasswordPage,
  EventPage,
  ContactPage,
  FaqPage,
  AllGuestsPage,
} from "../sections";
import { VerifyAuth, VerifyAdmin } from "../components";

function Routes() {
  return (
    <RouterRoutes>
      <Route
        path={Paths.Rsvp}
        element={
          <VerifyAuth title={"RSVP"}>
            <RsvpPage />
          </VerifyAuth>
        }
      />
      <Route
        path={Paths.Contact}
        element={
          <VerifyAuth title={"Contact"}>
            <ContactPage />
          </VerifyAuth>
        }
      />
      <Route
        path={Paths.Faq}
        element={
          <VerifyAuth title={"FAQ"}>
            <FaqPage />
          </VerifyAuth>
        }
      />
      <Route path={Paths.Login} element={<PasswordPage />} />
      <Route
        path={Paths.Events}
        element={
          <VerifyAuth title={"Events"}>
            <EventPage />
          </VerifyAuth>
        }
      />
      <Route
        path={AdminPaths.AllGuests}
        element={
          <VerifyAdmin>
            <AllGuestsPage />
          </VerifyAdmin>
        }
      />
      <Route
        index
        element={
          <VerifyAuth title={"Home"}>
            <Home />
          </VerifyAuth>
        }
      />
    </RouterRoutes>
  );
}

export default Routes;
