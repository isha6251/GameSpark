const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="backdrop-blur-xl bg-white/80 border border-pink-100 rounded-3xl shadow-2xl  p-4 sm:p-10  w-full max-w-6xl">

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center 
          bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text mb-10">
          Get in Touch with <span className="text-pink-600">GameSpark</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Info Section */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-pink-600 mb-2">📞 Contact Info</h3>
              <p className="text-gray-700">
                Have a question or need support? We're here to help you with your electronics journey.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-pink-50 p-6 rounded-2xl shadow-md space-y-3">
              <p className="text-gray-800"><strong>📍 Address:</strong> 123 Tech Farm, Delhi, India</p>
              <p className="text-gray-800"><strong>📧 Email:</strong> support@gamespark.com</p>
              <p className="text-gray-800"><strong>📞 Phone:</strong> +91 98765 43210</p>
            </div>
          </div>

          {/* Form Section */}
          <form className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 sm:p-6 rounded-2xl shadow-md space-y-6">
            <div>
              <label className="block text-gray-800 font-medium mb-1">Your Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium mb-1">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-2 bg-white border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium mb-1">Your Message</label>
              <textarea
                rows="4"
                placeholder="Type your message..."
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full font-semibold py-3 rounded-xl shadow-md
              bg-gradient-to-r from-pink-300 via-purple-300 to-sky-300 text-gray  
              hover:from-pink-400 hover:via-purple-400
              hover:to-sky-400 lg:hover:scale-95 transition-all duration-300"
            >
              Send Message 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
