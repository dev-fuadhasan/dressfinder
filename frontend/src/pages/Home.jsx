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

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div
            onClick={() => navigate('/bra')}
            className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-[1.02] group"
          >
            <div className="w-full h-64 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-accent to-primary/20">
              <img 
                src="/bra.png" 
                alt="Bra Selector" 
                className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = '<div class="text-6xl flex items-center justify-center h-full">👙</div>'
                }}
              />
            </div>
            <h3 className="text-3xl font-bold text-text-dark mb-4">Bra Selector</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Find the perfect bra based on your body type, breast shape, outfit, and preferences
            </p>
            <button className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-secondary transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
              Select Bra
            </button>
          </div>

          <div
            onClick={() => navigate('/panty')}
            className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-[1.02] group"
          >
            <div className="w-full h-64 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-accent to-primary/20">
              <img 
                src="/panty.png" 
                alt="Panty Selector" 
                className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = '<div class="text-6xl flex items-center justify-center h-full">🩲</div>'
                }}
              />
            </div>
            <h3 className="text-3xl font-bold text-text-dark mb-4">Panty Selector</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Discover the ideal panty for your body type, hip shape, and style preferences
            </p>
            <button className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-secondary transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
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

