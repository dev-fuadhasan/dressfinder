const PinkButton = ({ children, onClick, disabled = false, variant = 'primary' }) => {
  const baseClasses = "px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-primary text-white hover:bg-secondary hover:scale-105 shadow-lg hover:shadow-xl",
    secondary: "bg-white text-primary hover:bg-accent hover:scale-105 shadow-lg hover:shadow-xl",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white"
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {children}
    </button>
  )
}

export default PinkButton

