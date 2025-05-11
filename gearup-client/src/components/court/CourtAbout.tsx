'use client';

interface AboutProps {
  description: string;
  details: {
    size: string;
    surface: string;
    indoor: boolean;
    lighting: boolean;
    changeRoom: boolean;
    parking: boolean;
  };
}

export function CourtAbout({ description, details }: AboutProps) {
  return (
    <div className="py-8">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-white mb-4">About This Court</h2>
        <p className="text-gray-400 mb-8">{description}</p>
        
        <h3 className="text-xl font-bold text-white mb-4">Court Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-[#1C3F39] rounded-lg p-4">
            <span className="text-gray-400">Size</span>
            <p className="text-white font-medium">{details.size}</p>
          </div>
          <div className="bg-[#1C3F39] rounded-lg p-4">
            <span className="text-gray-400">Surface</span>
            <p className="text-white font-medium">{details.surface}</p>
          </div>
          <div className="bg-[#1C3F39] rounded-lg p-4">
            <span className="text-gray-400">Type</span>
            <p className="text-white font-medium">{details.indoor ? 'Indoor' : 'Outdoor'}</p>
          </div>
          <div className="bg-[#1C3F39] rounded-lg p-4">
            <span className="text-gray-400">Lighting</span>
            <p className="text-white font-medium">{details.lighting ? 'Available' : 'Not Available'}</p>
          </div>
          <div className="bg-[#1C3F39] rounded-lg p-4">
            <span className="text-gray-400">Change Room</span>
            <p className="text-white font-medium">{details.changeRoom ? 'Available' : 'Not Available'}</p>
          </div>
          <div className="bg-[#1C3F39] rounded-lg p-4">
            <span className="text-gray-400">Parking</span>
            <p className="text-white font-medium">{details.parking ? 'Available' : 'Not Available'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
