
interface Experience {
  id: number;
  title: string;
  price: number;
  rating: number;
  image: string;
  location: string;
}

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <div className="group flex-shrink-0 w-80 cursor-pointer">
      <div className="relative mb-3">
        <img 
          src={experience.image} 
          alt={experience.title}
          className="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="space-y-1">
        <h3 className="font-medium text-gray-900">{experience.title}</h3>
        <div className="flex justify-between items-center">
          <p className="font-medium">
            <span className="text-gray-900">From ${experience.price}</span>
            <span className="text-gray-600 font-normal"> / guest</span>
          </p>
          <div className="flex items-center">
            <span className="text-sm">⭐</span>
            <span className="text-sm font-medium ml-1">{experience.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
