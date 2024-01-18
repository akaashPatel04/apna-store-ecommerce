import React from "react";
import "../styles/components/footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="left">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Copyrights 2023 &copy; akash</p>
      </div>
      <div className="mid">
        <h1>Apna Store</h1>
        <p>Everyday is great with some shopping.</p>
      </div>
      <div className="right">
        <h4>Follow Us</h4>
        <a href="https://github.com/akaashPatel04">Git Hub</a>
        <a href="https://www.instagram.com/akash_.patel04/">Instagram</a>
        <a href="https://www.linkedin.com/in/akash-kumar-patel">Linked In</a>
      </div>
    </footer>
  );
};

export default Footer;
