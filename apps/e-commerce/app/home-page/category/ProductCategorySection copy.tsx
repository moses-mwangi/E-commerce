import {
  FiClock,
  FiEye,
  FiHeart,
  FiSearch,
  FiShoppingCart,
  FiStar,
} from "react-icons/fi";

const CategoriesSection = () => {
  // Demo data
  const categories = [
    { name: "Industrial Machinery", icon: "⚙️", count: 1245 },
    { name: "Consumer Electronics", icon: "📱", count: 876 },
    { name: "Jewelry & Watches", icon: "⌚", count: 532 },
    { name: "Apparel & Accessories", icon: "👔", count: 1567 },
    { name: "Home & Garden", icon: "🏠", count: 943 },
    { name: "Health & Beauty", icon: "💄", count: 721 },
    { name: "Sports & Outdoors", icon: "⚽", count: 612 },
    { name: "Toys & Games", icon: "🎮", count: 489 },
  ];

  const browsingHistory = [
    {
      name: "walk! Smart Shoes",
      price: 15.99,
      viewedAt: "2 hours ago",
      image: "/demo/shoes.jpg",
    },
    {
      name: "Wireless Earbuds Pro",
      price: 89.99,
      viewedAt: "1 day ago",
      image: "/demo/earbuds.jpg",
    },
    {
      name: "Stainless Steel Water Bottle",
      price: 24.95,
      viewedAt: "3 days ago",
      image: "/demo/bottle.jpg",
    },
  ];

  const recommendedProducts = [
    {
      name: "Premium Cash Register POS",
      price: 265.99,
      discountPrice: 239.99,
      rating: 4.8,
      reviews: 124,
      image: "/demo/pos1.jpg",
    },
    {
      name: "Compact POS System",
      price: 200.0,
      discountPrice: 179.99,
      rating: 4.5,
      reviews: 87,
      image: "/demo/pos2.jpg",
    },
    {
      name: "Basic Cash Register",
      price: 130.0,
      discountPrice: 99.99,
      rating: 4.2,
      reviews: 56,
      image: "/demo/pos3.jpg",
    },
    {
      name: "Mobile POS Terminal",
      price: 349.99,
      discountPrice: 299.99,
      rating: 4.9,
      reviews: 215,
      image: "/demo/pos4.jpg",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Categories Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col items-center cursor-pointer border border-gray-100 hover:border-blue-200"
            >
              <span className="text-3xl mb-2">{category.icon}</span>
              <h3 className="font-medium text-gray-800 text-center">
                {category.name}
              </h3>
              <span className="text-sm text-gray-500 mt-1">
                {category.count}+ items
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Browsing History */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Clear all
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {browsingHistory.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 bg-gray-100">
                {/* Replace with actual image */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20"></div>
                <span className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
                  <FiHeart className="text-gray-400 hover:text-red-500 cursor-pointer" />
                </span>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500 flex items-center">
                    <FiClock className="mr-1" /> {item.viewedAt}
                  </span>
                  <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full flex items-center">
                    <FiShoppingCart className="mr-1" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Products */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Keep looking for Cash Register POS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow group"
            >
              <div className="relative h-48 bg-gray-100">
                {/* Replace with actual image */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20"></div>
                {product.discountPrice && (
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {Math.round(
                      (1 - product.discountPrice / product.price) * 100
                    )}
                    % OFF
                  </span>
                )}
                <span className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
                  <FiHeart className="text-gray-400 group-hover:text-red-500 cursor-pointer" />
                </span>
                <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-4 py-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                  <FiShoppingCart className="mr-2" /> Quick Add
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-1">
                  {product.name}
                </h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={
                          i < Math.floor(product.rating) ? "fill-current" : ""
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-1">
                    ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center">
                  {product.discountPrice ? (
                    <>
                      <span className="text-lg font-bold text-gray-900">
                        ${product.discountPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${product.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Virtual Reality Showroom */}
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Virtual Reality Showroom</h2>
          <p className="text-lg mb-6">
            Experience our products in immersive 3D before you buy. Put on your
            VR headset and explore!
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium flex items-center">
              <FiEye className="mr-2" /> View in VR
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-medium">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
