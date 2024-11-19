import HeroSection from "../components/heroSection";
import Footer from "../components/footer";
import ScholarshipFilter from "../components/scholarshipFilter";
import ScholarshipCard from "../components/scholarshipCard";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="bg-white py-16 px-16 mt-10">
      <h1 className="text-4xl font-bold text-blue-900 mb-12">Found Scholar</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Section */}
          <ScholarshipFilter />

          {/* Cards Section */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScholarshipCard />
            <ScholarshipCard />
            <ScholarshipCard />
            <ScholarshipCard />
            <ScholarshipCard />
            <ScholarshipCard />
          </div>
        </div>

        {/* View More */}
        <div className="flex justify-end mt-8 mb-10 pr-16">
          <button className="text-blue-600 font-semibold hover:underline">
            View More &gt;
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
