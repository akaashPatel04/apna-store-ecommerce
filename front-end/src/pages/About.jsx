import "../styles/pages/About.css";
import { GrInstagram } from "react-icons/gr";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdMail, MdPhone } from "react-icons/md";
import me from "../images/me.png";

const About = () => {
  return (
    <div className="aboutPage">
      <div className="aboutContainer">
        <div className="aboutContact">
          <p className="WEB_HEADING">WEB</p>
          <div>
            <di diBottomv className="top">
              <div>
                <p>E-MAIL</p>
                <a href="mailto:akaashpatel04@gmail.com">
                  <MdMail className="aboutPageIcons" /> akaashpatel04@gmail.com
                </a>
              </div>
              <div>
                <p>PHONE</p>
                <a href="tel:9584704865">
                  <MdPhone className="aboutPageIcons" /> 9584704865
                </a>
              </div>
            </di>
            <div className="bottom">
              <a href="https://github.com/akaashPatel04" target="_blank">
                <FaGithub className="aboutPageIcons aboutPageIconsBottom" />
              </a>
              <a
                href="https://www.instagram.com/akash_.patel04/"
                target="_blank"
              >
                <GrInstagram className="aboutPageIcons aboutPageIconsBottom" />
              </a>
              <a
                href="https://www.linkedin.com/in/akash-kumar-patel"
                target="_blank"
              >
                <FaLinkedin className="aboutPageIcons aboutPageIconsBottom" />
              </a>
            </div>
          </div>
        </div>
        <div className="imgContainer">
          <img src={me} />
        </div>
        <div className="aboutMain">
          <div>
            <div className="text">
              <div>
                <p>A</p>
                <p>K</p>
                <p>A</p>
                <p>S</p>
                <p>H</p>
              </div>
              <div>
                <p>K</p>
                <p>U</p>
                <p>M</p>
                <p>A</p>
                <p>R</p>
              </div>
            </div>
            <p>
              I weave web wonders, blending front-end flair with back-end magic
              to create seamless online experiences that stand out. --(MERN)
            </p>
            <a href="https://akash-patel04.vercel.app/">
              <button>Visit Me</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
