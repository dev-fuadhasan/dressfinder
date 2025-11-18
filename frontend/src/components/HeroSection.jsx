import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          NO #1 BRA & PANTY SELECTOR
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 font-medium">
          Find the perfect fit with AI-powered comfort & confidence
        </p>
        <button
          onClick={() => navigate('/bra')}
          className="bg-white text-primary px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:scale-105 transition-transform duration-300 hover:shadow-2xl"
        >
          Start Selection
        </button>
      </div>
    </div>
  )
}

export default HeroSection

