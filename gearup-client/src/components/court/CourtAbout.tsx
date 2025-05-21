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
    <div className="mb-8">
      <div className="border-b pb-8 mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">About This Court</h2>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
      
      {/* <div>
        <h3 className="text-xl font-bold mb-4">Court Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <span className="text-gray-500 text-sm">Size</span>
            <p className="font-medium">{details.size}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <span className="text-gray-500 text-sm">Surface</span>
            <p className="font-medium">{details.surface}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <span className="text-gray-500 text-sm">Type</span>
            <p className="font-medium">{details.indoor ? 'Indoor' : 'Outdoor'}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <span className="text-gray-500 text-sm">Lighting</span>
            <p className="font-medium">{details.lighting ? 'Available' : 'Not Available'}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <span className="text-gray-500 text-sm">Change Room</span>
            <p className="font-medium">{details.changeRoom ? 'Available' : 'Not Available'}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <span className="text-gray-500 text-sm">Parking</span>
            <p className="font-medium">{details.parking ? 'Available' : 'Not Available'}</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
