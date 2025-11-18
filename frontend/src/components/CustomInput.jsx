const CustomInput = ({ value, onChange, placeholder = "Enter custom value..." }) => {
  return (
    <div className="mt-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white text-black focus:border-black focus:outline-none placeholder:text-gray-500"
      />
    </div>
  )
}

export default CustomInput

