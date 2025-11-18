const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-105">
      <div className="w-full h-64 bg-gray-100 overflow-hidden">
        <img
          src={product.image || '/placeholder.png'}
          alt={product.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/placeholder.png'
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-text-dark mb-2 line-clamp-2 min-h-[3rem]">
          {product.title}
        </h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary">
            {product.price || 'Price not available'}
          </span>
          {product.rating && (
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="text-sm text-gray-600">{product.rating}</span>
            </div>
          )}
        </div>
        {product.store && (
          <p className="text-sm text-gray-500 mb-3">{product.store}</p>
        )}
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-primary text-white text-center py-2 rounded-lg hover:bg-secondary transition-colors font-medium"
        >
          BUY NOW
        </a>
      </div>
    </div>
  )
}

export default ProductCard

