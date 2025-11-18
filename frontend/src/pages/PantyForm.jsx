import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Stepper from '../components/Stepper'
import OptionCard from '../components/OptionCard'
import PinkButton from '../components/PinkButton'
import Footer from '../components/Footer'

const PantyForm = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    type: 'panty',
    ageRange: '',
    bodyType: '',
    hipSize: '',
    pantySize: '',
    buttType: '',
    pantyStyle: '',
    purpose: '',
    colorPreference: '',
    wantsColor: false,
  })

  const totalSteps = 8

  const ageRanges = ['18-24', '25-30', '30-40', '40+', 'Custom']
  const bodyTypes = ['Slim', 'Fit', 'Chubby', 'Curvy', 'Plus size', 'Custom']
  const hipSizes = Array.from({ length: 23 }, (_, i) => 28 + i).concat(['Custom'])
  const pantySizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', 'Custom']
  
  const buttTypes = [
    { name: 'A-Shaped (Heart)', image: '/asstypes/a-shape-heart.png' },
    { name: 'V-Shaped', image: '/asstypes/v-shape.png' },
    { name: 'H/Square-Shaped', image: '/asstypes/h-shape-square.png' },
    { name: 'O/Round-Shaped', image: '/asstypes/o-shaped-round.png' },
  ]
  
  const pantyStyles = ['Bikini', 'Hipster', 'Boyshort', 'Thong', 'High Waist', 'Seamless', 'G-string', 'Custom']
  const purposes = ['Daily wear', 'Office', 'Gym', 'Party', 'Period', 'Sexy Look', 'Custom']
  const colors = ['Black', 'Nude', 'Pink', 'Red', 'White', 'Purple', 'Blue', 'Custom']

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/recommend/panty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to get recommendations')
      }
      
      const data = await response.json()
      navigate('/results', { state: { data, type: 'panty' } })
    } catch (error) {
      console.error('Error:', error)
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Age Range</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ageRanges.map((age) => (
                <OptionCard
                  key={age}
                  option={age}
                  isSelected={formData.ageRange === age}
                  onClick={() => updateFormData('ageRange', age)}
                />
              ))}
            </div>
          </div>
        )
      case 2:
        return (
          <div>
            <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Body Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {bodyTypes.map((type) => (
                <OptionCard
                  key={type}
                  option={type}
                  isSelected={formData.bodyType === type}
                  onClick={() => updateFormData('bodyType', type)}
                />
              ))}
            </div>
          </div>
        )
      case 3:
        return (
          <div>
            <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Hip Size (inches)</h2>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-96 overflow-y-auto">
              {hipSizes.map((size) => (
                <OptionCard
                  key={size}
                  option={size.toString()}
                  isSelected={formData.hipSize === size.toString()}
                  onClick={() => updateFormData('hipSize', size.toString())}
                />
              ))}
            </div>
          </div>
        )
      case 4:
        return (
          <div>
            <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Panty Size</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {pantySizes.map((size) => (
                <OptionCard
                  key={size}
                  option={size}
                  isSelected={formData.pantySize === size}
                  onClick={() => updateFormData('pantySize', size)}
                />
              ))}
            </div>
          </div>
        )
      case 5:
        return (
          <div>
            <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Butt / Ass Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {buttTypes.map((type) => (
                <OptionCard
                  key={type.name}
                  option={type.name}
                  image={type.image}
                  isSelected={formData.buttType === type.name}
                  onClick={() => updateFormData('buttType', type.name)}
                />
              ))}
            </div>
          </div>
        )
      case 6:
        return (
          <div>
            <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Panty Style Preference</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {pantyStyles.map((style) => (
                <OptionCard
                  key={style}
                  option={style}
                  isSelected={formData.pantyStyle === style}
                  onClick={() => updateFormData('pantyStyle', style)}
                />
              ))}
            </div>
          </div>
        )
      case 7:
        return (
          <div>
            <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Purpose</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {purposes.map((purpose) => (
                <OptionCard
                  key={purpose}
                  option={purpose}
                  isSelected={formData.purpose === purpose}
                  onClick={() => updateFormData('purpose', purpose)}
                />
              ))}
            </div>
          </div>
        )
      case 8:
        return (
          <div>
            <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Preferred Color?</h2>
            <div className="mb-6 flex justify-center gap-4">
              <button
                onClick={() => updateFormData('wantsColor', true)}
                className={`px-6 py-3 rounded-full font-semibold ${
                  formData.wantsColor
                    ? 'bg-primary text-white'
                    : 'bg-white text-text-dark border-2 border-gray-300'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  updateFormData('wantsColor', false)
                  updateFormData('colorPreference', '')
                }}
                className={`px-6 py-3 rounded-full font-semibold ${
                  !formData.wantsColor
                    ? 'bg-primary text-white'
                    : 'bg-white text-text-dark border-2 border-gray-300'
                }`}
              >
                No
              </button>
            </div>
            {formData.wantsColor && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {colors.map((color) => (
                  <OptionCard
                    key={color}
                    option={color}
                    isSelected={formData.colorPreference === color}
                    onClick={() => updateFormData('colorPreference', color)}
                  />
                ))}
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.ageRange !== ''
      case 2: return formData.bodyType !== ''
      case 3: return formData.hipSize !== ''
      case 4: return formData.pantySize !== ''
      case 5: return formData.buttType !== ''
      case 6: return formData.pantyStyle !== ''
      case 7: return formData.purpose !== ''
      case 8: return !formData.wantsColor || formData.colorPreference !== ''
      default: return false
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Stepper currentStep={currentStep} totalSteps={totalSteps} />
        
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              <p className="mt-4 text-text-dark">Getting your perfect recommendations...</p>
            </div>
          )}
          {!loading && renderStep()}
        </div>

        <div className="flex justify-between gap-4">
          <PinkButton
            onClick={handleBack}
            disabled={currentStep === 1}
            variant="outline"
          >
            Back
          </PinkButton>
          <PinkButton
            onClick={handleNext}
            disabled={!canProceed() || loading}
          >
            {loading ? 'Loading...' : currentStep === totalSteps ? 'Get Recommendations' : 'Next'}
          </PinkButton>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PantyForm

