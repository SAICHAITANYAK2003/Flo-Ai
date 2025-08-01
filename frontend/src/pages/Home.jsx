import React from "react";
import Hero from "../components/Hero";
 
import Tools from "../components/Tools";
import Testimonials from "../components/Testimonials";
import Plans from "../components/Plans";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <section className=" ">
      <Navbar />
      <Hero />
      <Tools />
      <Testimonials />
      <Plans />
      <Footer/>
    </section>
  );
};

export default Home;
