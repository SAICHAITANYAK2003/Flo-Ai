import React from "react";

const webinflooUrl = "https://www.webinfloo.com";

const Footer = () => {
  return (
    <footer className="w-full   flex flex-col items-center justify-center mt-12 px-20 md:px-14   py-15   relative">
      <h1 className="footer-font text-6xl md:text-7xl ">
        Developed by Founder of
        <span className="text-primary ml-4">
          <a target="_blank" href={webinflooUrl} className="border-b-2">
            WebinFloo
          </a>
        </span>
      </h1>

      <div className="mt-10 ">
        <p className="text-secondary text-center mt-2.5">
          Copyright {new Date().getFullYear()} © AiNest. All Right Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
