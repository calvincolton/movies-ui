import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer>Movies &copy;{currentYear}</footer>;
};

export default Footer;
