import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h1 className="text-5xl md:text-7xl font-bold text-text-dark mb-6">
          NO #1 BRA & PANTY FINDER
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-12 font-medium">
          Find the perfect fit with AI-powered comfort & confidence
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
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
  )
}

export default HeroSection

