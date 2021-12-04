import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="text-center">Movies &copy;{currentYear}</footer>;
};

export default Footer;
