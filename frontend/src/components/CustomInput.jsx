const CustomInput = ({ value, onChange, placeholder = "Enter custom value..." }) => {
  return (
    <div className="mt-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border-2 border-primary focus:border-secondary focus:outline-none text-text-dark"
      />
    </div>
  )
}

export default CustomInput

