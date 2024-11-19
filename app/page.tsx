import HeroSection from "../components/heroSection";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="bg-white py-16 px-16 mt-10">
        <h1 className="text-4xl font-bold text-blue-900 mb-12">Found Scholar</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Section */}
          <div className="w-full md:w-1/4 p-4 border-gray-300">
            <h2 className="text-2xl text-black border-b font-bold mb-6">Filter by</h2>
            <ul className="space-y-4 text-lg">
              <li className="cursor-pointer hover:text-blue-600 text-black border-b border-gray-300 pb-2">
                All
              </li>
              <li className="cursor-pointer hover:text-blue-600 text-black border-gray-300 pb-2">
                Active
              </li>
              <li className="cursor-pointer hover:text-blue-600 text-black border-b border-gray-300 pb-2">
                Inactive
              </li>
              <li className="cursor-pointer hover:text-blue-600 text-black border-gray-300 pt-4 pb-2">
                Academic
              </li>
              <li className="cursor-pointer hover:text-blue-600 text-black border-gray-300 pb-2">
                Non Academic
              </li>
              <li className="cursor-pointer hover:text-blue-600 text-black border-b border-gray-300 pb-2">
                Bursary
              </li>
            </ul>
          </div>

          {/* Cards Section */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2 text-black">
                Telkom University S1 Scholarship
              </h3>
              <p className="text-black text-sm mb-4">20 November 2024 - 12 Desember 2024</p>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                  Active
                </span>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                  Academic
                </span>
              </div>
              <button className="text-blue-600 font-semibold hover:underline">
                See Details
              </button>
            </div>
            <div className="border rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2 text-black">
                Telkom University S1 Scholarship
              </h3>
              <p className="text-black text-sm mb-4">20 November 2024 - 12 Desember 2024</p>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                  Active
                </span>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                  Academic
                </span>
              </div>
              <button className="text-blue-600 font-semibold hover:underline">
                See Details
              </button>
            </div>
            <div className="border rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2 text-black">
                Telkom University S1 Scholarship
              </h3>
              <p className="text-black text-sm mb-4">20 November 2024 - 12 Desember 2024</p>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                  Active
                </span>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                  Academic
                </span>
              </div>
              <button className="text-blue-600 font-semibold hover:underline">
                See Details
              </button>
            </div>
            <div className="border rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2 text-black">
                Telkom University S1 Scholarship
              </h3>
              <p className="text-black text-sm mb-4">20 November 2024 - 12 Desember 2024</p>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                  Active
                </span>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                  Academic
                </span>
              </div>
              <button className="text-blue-600 font-semibold hover:underline">
                See Details
              </button>
            </div>
            <div className="border rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2 text-black">
                Telkom University S1 Scholarship
              </h3>
              <p className="text-black text-sm mb-4">20 November 2024 - 12 Desember 2024</p>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                  Active
                </span>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                  Academic
                </span>
              </div>
              <button className="text-blue-600 font-semibold hover:underline">
                See Details
              </button>
            </div>
            <div className="border rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2 text-black">
                Telkom University S1 Scholarship
              </h3>
              <p className="text-black text-sm mb-4">20 November 2024 - 12 Desember 2024</p>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                  Active
                </span>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                  Academic
                </span>
              </div>
              <button className="text-blue-600 font-semibold hover:underline">
                See Details
              </button>
            </div>
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
