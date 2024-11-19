export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-gray-900">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to Home Screen</h1>
        <p className="text-lg text-gray-600">
          Explore the best scholarships and opportunities here!
        </p>
        <div className="space-x-4">
          <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition">
            Get Started
          </button>
          <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
