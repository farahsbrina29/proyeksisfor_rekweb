import Footer from "@/components/footer";
import React from "react";
import { FaUsers, FaGraduationCap } from "react-icons/fa";

const AboutUs = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-blue-50 to-gray-50 min-h-screen flex flex-col justify-between">
        {/* Container */}
        <div className="container mx-auto p-6 max-w-5xl">
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-4 tracking-wide">
              About Us
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Empowering education through technology. 🎓
            </p>
          </div>

          {/* Image Section */}
            <div className="flex justify-center mb-12 rounded-2xl overflow-hidden">
            <img
              src="/assets/ScholarHub Logo.png" // Replace with your image path
              alt="Scholarship Illustration"
              className="w-3/4 md:w-1/2 object-contain rounded-full"
            />
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* For Students */}
            <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <FaGraduationCap className="text-blue-600 text-3xl" />
                <h2 className="text-2xl font-bold text-gray-800">
                  For Students
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Discover scholarships tailored to your needs, apply seamlessly,
                and track your application status in real-time. We make your
                scholarship journey stress-free and efficient.
              </p>
            </div>

            {/* For Administrators */}
            <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transform transition duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <FaUsers className="text-blue-600 text-3xl" />
                <h2 className="text-2xl font-bold text-gray-800">
                  For Administrators
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Effortlessly manage scholarships, process applications, and
                engage with students. Our platform ensures smooth workflows and
                transparent communication to empower education.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-blue-600 text-white rounded-lg py-6 px-8 text-center shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-2xl font-semibold mb-2">
              Together, We Build the Future 🌟
            </h3>
            <p className="text-lg">
              Join us in creating opportunities and making education accessible
              for everyone.
            </p>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
