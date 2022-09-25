import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "../foundation";
import { Provider } from ".";
import { init } from "emailjs-com";
import TagManager from "react-gtm-module";
import "semantic-ui-css/semantic.min.css";
import "./App.scss";

const tagManagerArgs = {
  gtmId: "GTM-K5MDXZS",
};

function App() {
  if (process.env.NODE_ENV === "production") {
    TagManager.initialize(tagManagerArgs);
  }

  init(process.env.REACT_APP_EMAIL_KEY);

  return (
    <Provider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
