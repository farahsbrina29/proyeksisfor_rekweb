import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">About Us</h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Welcome to the Scholarship Management System! 🎓
      </p>
      <p className="text-gray-600 leading-relaxed">
        Our website is designed to simplify the scholarship application process for students
        and assist administrators in managing scholarship data efficiently. Whether you are a
        student looking for financial aid or an admin organizing scholarship opportunities,
        our platform has all the tools you need.
      </p>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">For Students</h2>
        <p className="text-gray-600 mb-4">
          Students can browse available scholarships, apply online, and track the status of
          their applications in real-time. With a user-friendly interface, we aim to make
          your scholarship journey smoother.
        </p>
        <h2 className="text-2xl font-semibold mb-2">For Administrators</h2>
        <p className="text-gray-600 mb-4">
          Administrators can easily manage scholarship data, process applications, and
          communicate with students through our platform. Our system ensures transparency
          and efficiency throughout the process.
        </p>
      </div>
      <p className="text-center mt-6 text-gray-500">
        Together, let's build a brighter future with accessible education for everyone!
      </p>
    </div>
  );
};

export default AboutUs;
