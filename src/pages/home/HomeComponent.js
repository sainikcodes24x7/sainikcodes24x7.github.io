import React, { Component } from "react";
import Greeting from "../../containers/greeting/Greeting";
import About from "../../containers/about/About";
import { ExperienceTimeline } from "../experience/Experience";
import Appreciations from "../../containers/appreciations/Appreciations";
import ProjectShowcase from "../../containers/projectShowcase/ProjectShowcase";
import Roadmaps from "../../containers/roadmaps/Roadmaps";
import ContactTerminal from "../../containers/contactTerminal/ContactTerminal";
import SideNavigation from "../../components/sideNavigation/SideNavigation";
import Skills from "../../containers/skills/Skills";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";

class Home extends Component {
  render() {
    return (
      <div>
        <SideNavigation />
        <Greeting theme={this.props.theme} />
        <About />
        <Skills theme={this.props.theme} />
        <ExperienceTimeline />
        <Appreciations />
        <ProjectShowcase />
        <Roadmaps />
        <ContactTerminal />
        <Footer theme={this.props.theme} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default Home;
