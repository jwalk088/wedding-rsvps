import React, { ReactElement } from "react";
import { gql, useQuery } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { Loader } from "semantic-ui-react";

const SignedInQuery = gql`
  query SignedIn {
    isSignedIn {
      signedIn
      isAdmin
    }
  }
`;

interface Props {
  children: ReactElement;
  title?: string;
}

function VerifyAdmin({ children, title }: Props) {
  const { data, loading } = useQuery(SignedInQuery, {
    fetchPolicy: "no-cache",
  });

  if (loading) {
    return <Loader active inline="centered" />;
  } else if (data?.isSignedIn?.isAdmin) {
    if (title) {
      document.title = title;
    }
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default VerifyAdmin;
