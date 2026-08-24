import React from "react";
import "./Footer.css";
import { Fade } from "react-reveal";
import { greeting } from "../../portfolio.js";
/* eslint-disable jsx-a11y/accessible-emoji */

export default function Footer(props) {
  return (
    <div className="footer-div">
      <Fade>
        <div className="footer-signature">
          <span>&lt;/&gt;</span> {greeting.title} <i /> Software Engineer
        </div>
        <p className="footer-built">
          Built with &lt;3 using React, JavaScript &amp; CSS
        </p>
        <p className="footer-text" style={{ color: props.theme.secondaryText }}>
          © {new Date().getFullYear()} {greeting.title}. All rights reserved.
        </p>
        {/* <ToggleSwitch theme={props.theme} onToggle={props.onToggle}/> */}
      </Fade>
    </div>
  );
}
