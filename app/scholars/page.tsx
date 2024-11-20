"use client";
import React, { useState } from "react";
import styled from "styled-components";
import Footer from "../../components/footer";
import { scholarships, parseCustomDate } from "../data/scholarshipdata"; // Import data and utility

// Styled components
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 20px;
  margin-left: 50px;
`;

const Button = styled.button<{ $isSelected: boolean }>`
  background-color: ${(props) => (props.$isSelected ? "#143F6B" : "#D9D9D9")};
  color: ${(props) => (props.$isSelected ? "white" : "black")};
  border: none;
  padding: 8px 16px;
  margin: 5px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  border-radius: 15px;
  min-width: 180px;
  white-space: nowrap;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #143f6b;
    color: white;
    transform: scale(1.1);
  }

  &:active {
    background-color: #3e8e41;
  }
`;

const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
  margin-left: 50px;
`;

const Card = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 20px;
  width: 95%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Function to handle button click for filtering
  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  // Function to determine if the scholarship is active
  const isActiveScholarship = (startDate: string, endDate: string): boolean => {
    const today = new Date();
    const start = parseCustomDate(startDate);
    const end = parseCustomDate(endDate);
    return today >= start && today <= end;
  };

  // Filter scholarships based on selected filter
  const filteredScholarships =
    selectedFilter === "All"
      ? scholarships
      : selectedFilter === "Active"
      ? scholarships.filter((s) => isActiveScholarship(s.startDate, s.endDate))
      : selectedFilter === "Inactive"
      ? scholarships.filter((s) => !isActiveScholarship(s.startDate, s.endDate))
      : scholarships.filter((s) => s.tags.includes(selectedFilter));

  return (
    <div>
      <div className="bg-white py-16 px-6 sm:px-8 md:px-16 mt-10">
        <h1 className="text-4xl font-bold text-blue-900 mb-12">
          Found Scholar
        </h1>

        <Container>
          {/* Filter Section */}
          <ButtonContainer>
            {[
              "All",
              "Active",
              "Inactive",
              "Academic",
              "Non Academic",
              "Bursary",
            ].map((filter) => (
              <Button
                key={filter}
                $isSelected={selectedFilter === filter}
                onClick={() => handleFilterClick(filter)}
              >
                {filter}
              </Button>
            ))}
          </ButtonContainer>

          {/* Cards Section */}
          <CardsContainer>
            {filteredScholarships.map((scholarship) => (
              <Card key={scholarship.id}>
                <h2 className="text-xl font-bold mb-2 text-black">
                  {scholarship.title}
                </h2>
                <p className="text-black text-sm mb-4">
                  {scholarship.startDate} - {scholarship.endDate}
                </p>
                <p className="text-gray-700 mb-4">
                  {scholarship.tags.join(", ")}
                </p>
                <button className="text-blue-600 font-semibold hover:underline">
                  Read More
                </button>
              </Card>
            ))}
          </CardsContainer>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
