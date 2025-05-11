'use client';

import { AlertCircle } from 'lucide-react';

interface NoteProps {
  notes: {
    title: string;
    description: string;
  }[];
}

export function CourtNote({ notes }: NoteProps) {
  return (
    <div className="py-8 bg-[#1C3F39]">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-6 h-6 text-[#00FF29]" />
          <h2 className="text-2xl font-bold text-white">Important Notes</h2>
        </div>
        
        <div className="space-y-4">
          {notes.map((note, index) => (
            <div key={index} className="bg-[#02080D] rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{note.title}</h3>
              <p className="text-gray-400">{note.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
