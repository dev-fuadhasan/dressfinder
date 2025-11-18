import { useNavigate } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-text-dark mb-4">
            Choose Your Perfect Fit
          </h2>
          <p className="text-lg text-gray-600">
            Select what you're looking for to get started
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div
            onClick={() => navigate('/bra')}
            className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
          >
            <div className="text-6xl mb-4">👙</div>
            <h3 className="text-3xl font-bold text-text-dark mb-4">Bra Selector</h3>
            <p className="text-gray-600 mb-6">
              Find the perfect bra based on your body type, breast shape, outfit, and preferences
            </p>
            <button className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-secondary transition-colors">
              Select Bra
            </button>
          </div>

          <div
            onClick={() => navigate('/panty')}
            className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
          >
            <div className="text-6xl mb-4">🩲</div>
            <h3 className="text-3xl font-bold text-text-dark mb-4">Panty Selector</h3>
            <p className="text-gray-600 mb-6">
              Discover the ideal panty for your body type, hip shape, and style preferences
            </p>
            <button className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-secondary transition-colors">
              Select Panty
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home

