'use client';

import { Star, ThumbsUp, User } from 'lucide-react';

interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

interface ReviewProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export function CourtReview({ reviews, averageRating, totalReviews }: ReviewProps) {
  return (
    <div className="py-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Reviews</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-[#00FF29] fill-[#00FF29]" />
              <span className="text-white font-medium">{averageRating.toFixed(1)}</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">{totalReviews} reviews</span>
          </div>
        </div>

        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-[#1C3F39] rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#02080D] flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{review.user}</h3>
                    <p className="text-sm text-gray-400">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-[#00FF29] fill-[#00FF29]" />
                  <span className="text-white">{review.rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-gray-400 mb-4">{review.comment}</p>
              <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#00FF29] transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span>Helpful ({review.helpful})</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
