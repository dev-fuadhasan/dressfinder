const OptionCard = ({ option, isSelected, onClick, image }) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative cursor-pointer rounded-2xl p-4 transition-all duration-300
        ${isSelected 
          ? 'bg-primary text-white shadow-xl scale-105 ring-4 ring-secondary' 
          : 'bg-white text-text-dark hover:bg-accent hover:scale-102 shadow-md'
        }
      `}
    >
      {image && (
        <div className="w-full h-32 mb-3 rounded-lg overflow-hidden">
          <img 
            src={image} 
            alt={option} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="text-center font-medium">{option}</div>
    </div>
  )
}

export default OptionCard

