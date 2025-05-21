'use client';

interface NoteProps {
  notes: {
    title: string;
    description: string;
  }[];
}

export function CourtNote({ notes }: NoteProps) {
  return (
    <div className="py-8 bg-[#f1f5f9] rounded-lg shadow-md">
      <div className="container mx-auto px-4">
        <h2 className="text-[#95C84B] text-3xl font-bold mb-8">THINGS TO KNOW</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-black mb-4">Special Note</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              If you fail to show up for your futsal booking without prior cancellation or notice, you will not be eligible for a refund. 
              Please note that this cancellation policy is subject to change without prior notice. 
              We recommend reviewing the policy at the time of booking to ensure you are aware of any updates.
            </p>
          </div>

          {/* {notes.map((note, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-black mb-3">{note.title}</h3>
              <p className="text-gray-600">{note.description}</p>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
