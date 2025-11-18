import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import PinkButton from '../components/PinkButton'
import Footer from '../components/Footer'

const Results = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { data, type } = location.state || {}

  useEffect(() => {
    if (!data) {
      navigate('/')
    }
  }, [data, navigate])

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-text-dark mb-4">No results found</p>
          <PinkButton onClick={() => navigate('/')}>Go Home</PinkButton>
        </div>
      </div>
    )
  }

  const handleTryAgain = () => {
    if (type === 'bra') {
      navigate('/bra')
    } else {
      navigate('/panty')
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            Your Perfect Fit Recommendations
          </h1>
          <p className="text-lg text-gray-600">
            Based on your preferences, here are our AI-powered recommendations
          </p>
        </div>

        {data.aiSummary && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">AI Analysis</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {data.aiSummary}
            </p>
          </div>
        )}

        {data.recommendedStyles && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">Why This Fits You</h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {data.recommendedStyles}
            </div>
          </div>
        )}

        {data.products && data.products.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-text-dark mb-6 text-center">
              Recommended Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </div>
        )}

        {(!data.products || data.products.length === 0) && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8 text-center">
            <p className="text-gray-600 mb-4">No products found. Please try again with different preferences.</p>
          </div>
        )}

        <div className="flex justify-center gap-4 mb-8">
          <PinkButton onClick={handleTryAgain} variant="secondary">
            Try Again
          </PinkButton>
          <PinkButton onClick={() => navigate('/')} variant="outline">
            Back to Home
          </PinkButton>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Results

