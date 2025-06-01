
const InspirationSection = () => {
  const categories = [
    {
      id: 1,
      name: "Cabins",
      location: "United States",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Treehouses",
      location: "United States", 
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Glamping",
      location: "United States",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Beachfront",
      location: "United States",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Amazing pools",
      location: "United States",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Tiny homes",
      location: "United States",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
          Inspiration for future getaways
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {categories.map(category => (
            <div 
              key={category.id}
              className="group cursor-pointer"
            >
              <div className="relative mb-3">
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{category.name}</h3>
              <p className="text-gray-600 text-sm">{category.location}</p>
            </div>
          ))}
        </div>
        
        <button className="border border-gray-900 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-900 hover:text-white transition-colors font-medium">
          Show more
        </button>
      </div>
    </div>
  );
};

export default InspirationSection;
