import Footer from "@/components/footer";
import React from "react";
import { FaUsers, FaGraduationCap } from "react-icons/fa";

const AboutUs = () => {
  return (
    <>
      {/* Hero Section */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/bg-about.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            About ScholarHub
          </h1>
          <p className="text-lg md:text-xl font-light max-w-2xl">
            Welcome to ScholarHub – where opportunities meet potential!
          </p>
        </div>
      </div>

      {/* ScholarHub Preview Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="container mx-auto p-6 max-w-6xl flex flex-col md:flex-row items-center gap-10">
          {/* Text Section */}
          <div className="flex-1 md:pr-12 text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              ScholarHub Preview
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg md:text-xl">
              Scholar Hub is your ultimate companion in securing scholarships!
              Our platform simplifies the journey by helping you discover
              scholarship opportunities, effortlessly apply, and track your
              application status in real time. Whether you're a student aiming
              for your dream program or a professional seeking further
              education, ScholarHub ensures a seamless and empowering
              experience. Start your scholarship success story today with
              ScholarHub—where opportunities meet potential!
            </p>
          </div>

          {/* Image Section */}
          <div className="flex-shrink-0 flex justify-end">
            <img
              src="/assets/ScholarHub Logo.png"
              alt="ScholarHub Logo"
              className="w-96 h-96 object-contain rounded-full shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto p-6 max-w-5xl grid md:grid-cols-2 gap-10">
        
        <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition duration-300">
          <div className="flex items-center space-x-4 mb-4">
            <FaGraduationCap className="text-blue-600 text-3xl" />
            <h2 className="text-2xl font-bold text-gray-800">For Students</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Discover scholarships tailored to your needs, apply seamlessly, and
            track your application status in real-time. We make your scholarship
            journey stress-free and efficient.
          </p>
        </div>

        
        <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition duration-300">
          <div className="flex items-center space-x-4 mb-4">
            <FaUsers className="text-blue-600 text-3xl" />
            <h2 className="text-2xl font-bold text-gray-800">
              For Administrators
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Effortlessly manage scholarships, process applications, and engage
            with students. Our platform ensures smooth workflows and transparent
            communication to empower education.
          </p>
        </div>
      </div>

      
      <div className="bg-blue-600 text-white rounded-lg py-6 px-8 text-center shadow-md hover:shadow-lg transition duration-300 mt-12 mx-6">
        <h3 className="text-2xl font-semibold mb-2">
          Together, We Build the Future 🌟
        </h3>
        <p className="text-lg">
          Join us in creating opportunities and making education accessible for
          everyone.
        </p>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default AboutUs;
