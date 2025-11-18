const OptionCard = ({ option, isSelected, onClick, image }) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative cursor-pointer rounded-2xl p-4 transition-all duration-300 border-2
        ${isSelected 
          ? 'bg-primary text-white shadow-xl scale-105 ring-2 ring-secondary border-secondary' 
          : 'bg-white text-text-dark hover:bg-accent/50 hover:scale-[1.02] shadow-md border-gray-200 hover:border-primary/30'
        }
      `}
    >
      {image && (
        <div className="w-full h-32 mb-3 rounded-lg overflow-hidden bg-gray-50">
          <img 
            src={image} 
            alt={option} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </div>
      )}
      <div className={`text-center font-medium ${isSelected ? 'text-white' : 'text-text-dark'}`}>{option}</div>
    </div>
  )
}

export default OptionCard

