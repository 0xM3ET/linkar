import Image from "next/image";

export default function Home() {
  return (
    <main className="px-28 py-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">LinkAr: Your Gateway to the Arweave Ecosystem</h1>
          <p className="mt-4 text-lg text-gray-600">Showcase. Connect. Grow.</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Introduction */}
        <section className="text-center mb-12">
          <p className="text-xl text-gray-700 mb-4">
            Welcome to <strong>LinkAr</strong>, the ultimate platform to showcase your contributions to the Arweave ecosystem.
          </p>
          <p className="text-xl text-gray-700">
            LinkAr allows you to create a personalized portfolio of your Arweave projects, share meaningful links, and build a profile that represents your journey in the decentralized web.
          </p>
        </section>

        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">How It Works</h2>
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800">1. Connect Your Arweave Wallet</h3>
              <p className="mt-2 text-gray-700">
                Start by securely connecting your Arweave wallet to LinkAr. This lets us gather the details of your deployed projects and activities across the Arweave ecosystem.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800">2. Create Your Arweave Portfolio</h3>
              <p className="mt-2 text-gray-700">
                Add links to your Arweave-deployed projects, key contributions, or anything else you'd like to showcase. Whether you’re an artist, developer, or a researcher, your LinkAr profile will be a simple yet powerful representation of your work.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800">3. Calculate Your Ar-Score</h3>
              <p className="mt-2 text-gray-700">
                LinkAr analyzes your portfolio and activity to calculate an <strong>Ar-Score</strong>—a unique score that reflects your engagement and impact in the Arweave ecosystem. This score can help you track your growth and demonstrate your contributions within the decentralized community.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800">4. Share Your Profile</h3>
              <p className="mt-2 text-gray-700">
                Once you've created your profile, you’ll have a unique, shareable link to showcase your work, contributions, and Ar-Score. Use it to introduce yourself to the community or build connections with others in the space.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose LinkAr Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Why Choose LinkAr?</h2>
          <ul className="space-y-6">
            <li className="text-gray-700">
              <strong>Easy Portfolio Creation:</strong> Build your Arweave portfolio in minutes, with a straightforward and user-friendly interface.
            </li>
            <li className="text-gray-700">
              <strong>Personalized Ar-Score:</strong> Your Ar-Score reflects the impact of your work and dedication to the Arweave network, helping you gain visibility.
            </li>
            <li className="text-gray-700">
              <strong>One Link to Showcase All:</strong> Share a single link with all your contributions—perfect for social media, resumes, or networking within the Arweave ecosystem.
            </li>
            <li className="text-gray-700">
              <strong>Completely Decentralized:</strong> LinkAr leverages Arweave's permanent storage to make sure your profile and data are censorship-resistant and permanently available.
            </li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Get Started with LinkAr</h2>
          <p className="text-lg text-gray-700 mb-8">Connect your Arweave wallet, start adding your projects, and let your contributions be known.</p>
          <button className="bg-pink-800 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-800 transition duration-200">
            Connect Wallet & Start Building Your Profile
          </button>
        </section>
      </main>
    </main>
  )
}
