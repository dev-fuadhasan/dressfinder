import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Stepper from '../components/Stepper'
import OptionCard from '../components/OptionCard'
import PinkButton from '../components/PinkButton'
import Footer from '../components/Footer'
import CustomInput from '../components/CustomInput'
import { getApiUrl } from '../config/api'

const PantyForm = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    type: 'panty',
    country: '',
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
  const [customInputs, setCustomInputs] = useState({})

  const totalSteps = 9

  const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'India', 'Germany', 'France', 'Italy', 'Spain', 'Japan', 'China', 'Brazil', 'Mexico', 'Other']
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


  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value })
    if (value !== 'Custom' && value !== 'Other') {
      setCustomInputs({ ...customInputs, [field]: '' })
    }
  }

  const updateCustomInput = (field, value) => {
    setCustomInputs({ ...customInputs, [field]: value })
    setFormData({ ...formData, [field]: value || (field === 'country' ? 'Other' : 'Custom') })
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      const finalData = { ...formData }
      Object.keys(customInputs).forEach(key => {
        if (customInputs[key]) {
          finalData[key] = customInputs[key]
        }
      })
      
      const response = await fetch(getApiUrl('/api/recommend/panty'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Country</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {countries.map((country) => (
                <OptionCard
                  key={country}
                  option={country}
                  isSelected={formData.country === country || (country === 'Other' && formData.country && !countries.slice(0, -1).includes(formData.country))}
                  onClick={() => updateFormData('country', country)}
                />
              ))}
            </div>
            {(formData.country === 'Other' || (formData.country && !countries.slice(0, -1).includes(formData.country))) && (
              <CustomInput
                value={customInputs.country || ''}
                onChange={(value) => updateCustomInput('country', value)}
                placeholder="Enter your country..."
              />
            )}
          </div>
        )
      case 2:
        return (
          <div>
            <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Age Range</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ageRanges.map((age) => (
                <OptionCard
                  key={age}
                  option={age}
                  isSelected={formData.ageRange === age || (age === 'Custom' && formData.ageRange && !ageRanges.slice(0, -1).includes(formData.ageRange))}
                  onClick={() => updateFormData('ageRange', age)}
                />
              ))}
            </div>
            {(formData.ageRange === 'Custom' || (formData.ageRange && !ageRanges.slice(0, -1).includes(formData.ageRange))) && (
              <CustomInput
                value={customInputs.ageRange || ''}
                onChange={(value) => updateCustomInput('ageRange', value)}
                placeholder="Enter your age range..."
              />
            )}
          </div>
        )
      case 3:
        return (
          <div>
            <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Body Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {bodyTypes.map((type) => (
                <OptionCard
                  key={type}
                  option={type}
                  isSelected={formData.bodyType === type || (type === 'Custom' && formData.bodyType && !bodyTypes.slice(0, -1).includes(formData.bodyType))}
                  onClick={() => updateFormData('bodyType', type)}
                />
              ))}
            </div>
            {(formData.bodyType === 'Custom' || (formData.bodyType && !bodyTypes.slice(0, -1).includes(formData.bodyType))) && (
              <CustomInput
                value={customInputs.bodyType || ''}
                onChange={(value) => updateCustomInput('bodyType', value)}
                placeholder="Enter your body type..."
              />
            )}
          </div>
        )
      case 4:
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
            {(formData.hipSize === 'Custom' || (formData.hipSize && !hipSizes.slice(0, -1).includes(formData.hipSize))) && (
              <CustomInput
                value={customInputs.hipSize || ''}
                onChange={(value) => updateCustomInput('hipSize', value)}
                placeholder="Enter hip size..."
              />
            )}
          </div>
        )
      case 5:
        return (
          <div>
            <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Panty Size</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {pantySizes.map((size) => (
                <OptionCard
                  key={size}
                  option={size}
                  isSelected={formData.pantySize === size || (size === 'Custom' && formData.pantySize && !pantySizes.slice(0, -1).includes(formData.pantySize))}
                  onClick={() => updateFormData('pantySize', size)}
                />
              ))}
            </div>
            {(formData.pantySize === 'Custom' || (formData.pantySize && !pantySizes.slice(0, -1).includes(formData.pantySize))) && (
              <CustomInput
                value={customInputs.pantySize || ''}
                onChange={(value) => updateCustomInput('pantySize', value)}
                placeholder="Enter panty size..."
              />
            )}
          </div>
        )
      case 6:
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
      case 7:
        return (
          <div>
            <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Panty Style Preference</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {pantyStyles.map((style) => (
                <OptionCard
                  key={style}
                  option={style}
                  isSelected={formData.pantyStyle === style || (style === 'Custom' && formData.pantyStyle && !pantyStyles.slice(0, -1).includes(formData.pantyStyle))}
                  onClick={() => updateFormData('pantyStyle', style)}
                />
              ))}
            </div>
            {(formData.pantyStyle === 'Custom' || (formData.pantyStyle && !pantyStyles.slice(0, -1).includes(formData.pantyStyle))) && (
              <CustomInput
                value={customInputs.pantyStyle || ''}
                onChange={(value) => updateCustomInput('pantyStyle', value)}
                placeholder="Enter panty style..."
              />
            )}
          </div>
        )
      case 8:
        return (
          <div>
            <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Purpose</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {purposes.map((purpose) => (
                <OptionCard
                  key={purpose}
                  option={purpose}
                  isSelected={formData.purpose === purpose || (purpose === 'Custom' && formData.purpose && !purposes.slice(0, -1).includes(formData.purpose))}
                  onClick={() => updateFormData('purpose', purpose)}
                />
              ))}
            </div>
            {(formData.purpose === 'Custom' || (formData.purpose && !purposes.slice(0, -1).includes(formData.purpose))) && (
              <CustomInput
                value={customInputs.purpose || ''}
                onChange={(value) => updateCustomInput('purpose', value)}
                placeholder="Enter purpose..."
              />
            )}
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
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {colors.map((color) => (
                    <OptionCard
                      key={color}
                      option={color}
                      isSelected={formData.colorPreference === color || (color === 'Custom' && formData.colorPreference && !colors.slice(0, -1).includes(formData.colorPreference))}
                      onClick={() => updateFormData('colorPreference', color)}
                    />
                  ))}
                </div>
                {(formData.colorPreference === 'Custom' || (formData.colorPreference && !colors.slice(0, -1).includes(formData.colorPreference))) && (
                  <CustomInput
                    value={customInputs.colorPreference || ''}
                    onChange={(value) => updateCustomInput('colorPreference', value)}
                    placeholder="Enter color preference..."
                  />
                )}
              </>
            )}
          </div>
        )
      default:
        return null
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.country !== '' && (formData.country !== 'Other' || customInputs.country)
      case 2: return formData.ageRange !== '' && (formData.ageRange !== 'Custom' || customInputs.ageRange)
      case 3: return formData.bodyType !== '' && (formData.bodyType !== 'Custom' || customInputs.bodyType)
      case 4: return formData.hipSize !== '' && (formData.hipSize !== 'Custom' || customInputs.hipSize)
      case 5: return formData.pantySize !== '' && (formData.pantySize !== 'Custom' || customInputs.pantySize)
      case 6: return formData.buttType !== ''
      case 7: return formData.pantyStyle !== '' && (formData.pantyStyle !== 'Custom' || customInputs.pantyStyle)
      case 8: return formData.purpose !== '' && (formData.purpose !== 'Custom' || customInputs.purpose)
      case 9: return !formData.wantsColor || (formData.colorPreference !== '' && (formData.colorPreference !== 'Custom' || customInputs.colorPreference))
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

export default PantyForm

