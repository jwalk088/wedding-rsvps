import React from "react";
import { render } from "react-dom";
import App from "../components/App";

document.addEventListener("DOMContentLoaded", () => {
  let div = document.createElement("div");
  div.className = "main";
  render(<App />, document.body.appendChild(div));
});
