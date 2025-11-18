import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Stepper from '../components/Stepper'
import OptionCard from '../components/OptionCard'
import PinkButton from '../components/PinkButton'
import Footer from '../components/Footer'
import { getApiUrl } from '../config/api'

const BraForm = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    type: 'bra',
    ageRange: '',
    bodyType: '',
    braSize: '',
    breastType: '',
    dressType: '',
    occasion: '',
    appearancePreference: '',
    sexualExperience: '',
    colorPreference: '',
    wantsColor: false,
  })

  const totalSteps = 9

  const ageRanges = ['18-24', '25-30', '30-40', '40+', 'Custom']
  const bodyTypes = ['Slim', 'Fit', 'Chubby', 'Curvy', 'Plus size', 'Custom']
  const braSizes = Array.from({ length: 17 }, (_, i) => {
    const band = 28 + i
    return [`${band}A`, `${band}B`, `${band}C`, `${band}D`, `${band}DD`]
  }).flat().concat(['Custom'])
  
  const breastTypes = [
    { name: 'Round', image: '/boobstype/Round_Breast-2048x555.jpg' },
    { name: 'Teardrop', image: '/boobstype/Tear_Drop_Breast-2048x554.jpg' },
    { name: 'Side Set', image: '/boobstype/Side_Set_Breast-2048x554.jpg' },
    { name: 'Conical', image: '/boobstype/Conical_Breast-2048x555.jpg' },
    { name: 'Asymmetrical', image: '/boobstype/Asymmetrical_Breast-2048x554.jpg' },
    { name: 'Bell-shaped', image: '/boobstype/Bell_Shaped_Breast-2048x554.jpg' },
    { name: 'Athletic', image: '/boobstype/Athletic_Breast-2048x555.jpg' },
    { name: 'Relaxed', image: '/boobstype/Relaxed_Breast-2048x554.jpg' },
    { name: 'Slender', image: '/boobstype/Slender_Breast-2048x555.jpg' },
    { name: 'Close-set', image: '/boobstype/Close_Set_Breast-2048x554.jpg' },
    { name: 'East-west', image: '/boobstype/East_West_Breast-2048x554.jpg' },
  ]
  
  const dressTypes = ['T-shirt', 'Shirt', 'Saree', 'Lehenga', 'Party Dress', 'Gym Wear', 'Gown', 'Custom']
  const occasions = ['Office', 'School', 'College', 'Gym', 'Party', 'Festival', 'Date', 'Custom']
  const appearancePreferences = ['Hot', 'Sexy', 'Hot & Sexy', 'Natural', 'Comfortable', 'Custom']
  const sexualExperienceOptions = ['Yes', 'No', 'Custom']
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
      const response = await fetch(getApiUrl('/api/recommend/bra'), {
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
      navigate('/results', { state: { data, type: 'bra' } })
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
            <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Bra Size</h2>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-96 overflow-y-auto">
              {braSizes.map((size) => (
                <OptionCard
                  key={size}
                  option={size}
                  isSelected={formData.braSize === size}
                  onClick={() => updateFormData('braSize', size)}
                />
              ))}
            </div>
          </div>
        )
      case 4:
        return (
          <div>
            <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Breast Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {breastTypes.map((type) => (
                <OptionCard
                  key={type.name}
                  option={type.name}
                  image={type.image}
                  isSelected={formData.breastType === type.name}
                  onClick={() => updateFormData('breastType', type.name)}
                />
              ))}
            </div>
          </div>
        )
      case 5:
        return (
          <div>
            <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">What are you wearing? (Dress Type)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {dressTypes.map((dress) => (
                <OptionCard
                  key={dress}
                  option={dress}
                  isSelected={formData.dressType === dress}
                  onClick={() => updateFormData('dressType', dress)}
                />
              ))}
            </div>
          </div>
        )
      case 6:
        return (
          <div>
            <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Occasion</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {occasions.map((occasion) => (
                <OptionCard
                  key={occasion}
                  option={occasion}
                  isSelected={formData.occasion === occasion}
                  onClick={() => updateFormData('occasion', occasion)}
                />
              ))}
            </div>
          </div>
        )
      case 7:
        return (
          <div>
            <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Appearance Preference</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {appearancePreferences.map((pref) => (
                <OptionCard
                  key={pref}
                  option={pref}
                  isSelected={formData.appearancePreference === pref}
                  onClick={() => updateFormData('appearancePreference', pref)}
                />
              ))}
            </div>
          </div>
        )
      case 8:
        return (
          <div>
            <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Is it for better sexual experience?</h2>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              {sexualExperienceOptions.map((option) => (
                <OptionCard
                  key={option}
                  option={option}
                  isSelected={formData.sexualExperience === option}
                  onClick={() => updateFormData('sexualExperience', option)}
                />
              ))}
            </div>
          </div>
        )
      case 9:
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
      case 3: return formData.braSize !== ''
      case 4: return formData.breastType !== ''
      case 5: return formData.dressType !== ''
      case 6: return formData.occasion !== ''
      case 7: return formData.appearancePreference !== ''
      case 8: return formData.sexualExperience !== ''
      case 9: return !formData.wantsColor || formData.colorPreference !== ''
      default: return false
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Stepper currentStep={currentStep} totalSteps={totalSteps} />
        
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8 border border-white/50">
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

export default BraForm

