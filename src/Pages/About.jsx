import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-20">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-4 sm:p-10 space-y-10 border border-pink-100">

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center 
          bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
          About GameSpark
        </h1>

        {/* Intro */}
        <p className="text-gray-700 text-lg text-center leading-relaxed">
          Welcome to <span className="font-semibold text-pink-600">GameSpark</span>, your one-stop destination for the latest and greatest in
          <span className="text-purple-600 font-semibold"> electronics & tech</span>.
          From cutting-edge gadgets to must-have accessories, we’re here to power up your tech life with premium products and unbeatable service.
        </p>

        {/* Mission */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-pink-600 mb-3">🎯 Our Mission</h2>
          <p className="text-gray-700">
            At GameSpark, our mission is to make innovative technology accessible to everyone.
            We’re passionate about connecting people with the tools they need to thrive in a digital world — all at competitive prices and delivered with care.
          </p>
        </div>

        {/* Why Choose */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-purple-600 mb-3">💡 Why Choose GameSpark?</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>✨ Top-quality electronic products from trusted brands</li>
            <li>⚡ Lightning-fast and secure shipping</li>
            <li>🤝 Reliable customer support, always ready to help</li>
            <li>🔄 Easy returns and hassle-free shopping experience</li>
          </ul>
        </div>

        {/* Vision */}
        <div className="bg-gradient-to-r from-blue-50 to-pink-50 p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">🌍 Our Vision</h2>
          <p className="text-gray-700">
            We envision a future where technology elevates everyday life.
            At GameSpark, we’re committed to staying ahead of the curve, offering cutting-edge solutions that are both practical and affordable.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold text-pink-600 mb-2">🚀 Join the GameSpark Family</h3>
          <p className="text-gray-700 mb-6">
            Whether you’re a tech enthusiast, a professional, or just looking for something cool and functional — GameSpark has something for everyone.
          </p>
          <Link to={'/products'}>
            <button className="px-8 py-3 rounded-xl font-medium shadow-md
            bg-gradient-to-r from-pink-300 via-purple-300 to-sky-300 text-gray  
            hover:from-pink-400 hover:via-purple-400 hover:to-sky-400  
            lg:hover:scale-95 transition-all duration-300">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
