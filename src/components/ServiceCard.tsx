
interface Service {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative mb-3">
        <img 
          src={service.image} 
          alt={service.title}
          className="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 text-xs font-medium">
          {service.category}
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="font-medium text-gray-900 line-clamp-2">{service.title}</h3>
        <p className="text-gray-600 text-sm">{service.location}</p>
        <div className="flex justify-between items-center">
          <p className="font-medium">
            <span className="text-gray-900">From ${service.price}</span>
            <span className="text-gray-600 font-normal"> / guest</span>
          </p>
          <div className="flex items-center">
            <span className="text-sm">⭐</span>
            <span className="text-sm font-medium ml-1">{service.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
