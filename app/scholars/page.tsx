"use client";
import React from "react";
import styled from "styled-components";
import HeroSection from "../../components/heroSection";
import Footer from "../../components/footer";


// Data scholarships
const scholarships = [
  {
    id: 1,
    title: "Telkom University S1 Scholarship",
    date: "20 November 2024 - 12 Desember 2024",
    description:
      "Lorem ipsum dolor sit amet. Est provident explicabo eum aliquid quidem ex molestiae natus est ipsam illo et natus recusandae. Ut omnis iste id consequatur quas rem eligendi repudiandae et nihil dolor et aliquam voluptas hic minima sapiente est laboriosam […]",
  },
  {
    id: 2,
    title: "Telkom University S1 Scholarship",
    date: "20 November 2024 - 12 Desember 2024",
    description:
      "Lorem ipsum dolor sit amet. Est provident explicabo eum aliquid quidem ex molestiae natus est ipsam illo et natus recusandae. Ut omnis iste id consequatur quas rem eligendi repudiandae et nihil dolor et aliquam voluptas hic minima sapiente est laboriosam […]",
  },
  {
    id: 3,
    title: "Telkom University S1 Scholarship",
    date: "20 November 2024 - 12 Desember 2024",
    description:
      "Lorem ipsum dolor sit amet. Est provident explicabo eum aliquid quidem ex molestiae natus est ipsam illo et natus recusandae. Ut omnis iste id consequatur quas rem eligendi repudiandae et nihil dolor et aliquam voluptas hic minima sapiente est laboriosam […]",
  },
  {
    id: 4,
    title: "Telkom University S1 Scholarship",
    date: "20 November 2024 - 12 Desember 2024",
    description:
      "Lorem ipsum dolor sit amet. Est provident explicabo eum aliquid quidem ex molestiae natus est ipsam illo et natus recusandae. Ut omnis iste id consequatur quas rem eligendi repudiandae et nihil dolor et aliquam voluptas hic minima sapiente est laboriosam […]",
  },
];


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
  flex-wrap: wrap; /* Membuat tombol terpisah ke baris baru jika ruang terbatas */
  justify-content: flex-start;
  margin-top: 20px;
  margin-left: 50px;
`;


const Button = styled.button`
  background-color: #D9D9D9;
  color: black;
  border: none;
  padding: 8px 16px;
  margin: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  cursor: pointer;
  border-radius: 15px;
  min-width: 180px;
  white-space: nowrap;
  transition: background-color 0.3s ease, transform 0.2s ease;




  &:hover {
    background-color: #143F6B;
    color: white;
    transform: scale(1.1);
  }




  &:active {
    background-color: #3e8e41;
  }
`;


const FilterSection = styled.div`
  width: 100%;
  margin-bottom: 20px;
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
  heigth: 60%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;


  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;


export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="bg-white py-16 px-6 sm:px-8 md:px-16 mt-10">
        <h1 className="text-4xl font-bold text-blue-900 mb-12">Found Scholar</h1>


        <Container>
          {/* Filter Section */}
          <FilterSection>
            <h2 className="text-2xl text-black font-bold mb-6">Filter by</h2>
            <ButtonContainer>
              <Button>All</Button>
              <Button>Active</Button>
              <Button>Non Active</Button>
              <Button>Academic</Button>
              <Button>Non Academic</Button>
              <Button>Bursary</Button>
            </ButtonContainer>
          </FilterSection>


          {/* Cards Section */}
          <CardsContainer>
            {scholarships.map((scholarship) => (
              <Card key={scholarship.id}>
                <h2 className="text-xl font-bold mb-2 text-black">
                  {scholarship.title}
                </h2>
                <p className="text-black text-sm mb-4">{scholarship.date}</p>
                <p className="text-gray-700 mb-4">{scholarship.description}</p>
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


