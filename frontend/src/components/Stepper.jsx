const Stepper = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold z-10
                  ${step <= currentStep
                    ? 'bg-primary text-white'
                    : 'bg-white text-text-dark border-2 border-gray-300'
                  }
                `}
              >
                {step}
              </div>
            </div>
            {step < totalSteps && (
              <div
                className={`
                  h-1 flex-1 -mt-5 mx-2
                  ${step < currentStep ? 'bg-primary' : 'bg-gray-300'}
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stepper

