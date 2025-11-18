const PinkButton = ({ children, onClick, disabled = false, variant = 'primary' }) => {
  const baseClasses = "px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-primary text-white hover:bg-secondary hover:scale-105 shadow-md hover:shadow-lg",
    secondary: "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white hover:scale-105 shadow-md hover:shadow-lg",
    outline: "border-2 border-text-dark text-text-dark bg-white/80 hover:bg-text-dark hover:text-white hover:scale-105 shadow-md hover:shadow-lg"
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

