import React from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

const LayoutLanding = (props) => {
  return (
    <>
      <Navigation />
      <div className="min-h-[100vh]">{props.children}</div>
      <Footer />
    </>
  );
};

export default LayoutLanding;
