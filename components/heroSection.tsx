import React from "react";

const HeroSection = () => {
  return (
    <div
      className="relative h-screen bg-cover"
      style={{
        backgroundImage: `url('/assets/signup.jpg')`,
        backgroundPosition: 'center 90%', // Geser ke atas dengan mengatur posisi vertikal
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-6xl md:text-7xl font-bold">
          Found Your Scholar Dream
        </h1>
        <p className="mt-4 text-xl md:text-2xl font-medium">
          Welcome To Scholar Hub
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
