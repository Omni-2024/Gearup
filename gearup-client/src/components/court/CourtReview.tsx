'use client';

import { Star, ThumbsUp, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

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

export function CourtReview({ reviews: initialReviews, averageRating, totalReviews }: ReviewProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showNewReview, setShowNewReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
  });
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const review: Review = {
      id: Date.now().toString(),
      user: 'Current User', // In real app, get from auth
      rating: newReview.rating,
      date: new Date().toLocaleDateString(),
      comment: newReview.comment,
      helpful: 0,
    };
    setReviews([review, ...reviews]);
    setShowNewReview(false);
    setNewReview({ rating: 5, comment: '' });
  };

  const filteredAndSortedReviews = reviews
    .filter(review => filterRating ? review.rating === filterRating : true)
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === 'highest') return b.rating - a.rating;
      if (sortBy === 'lowest') return a.rating - b.rating;
      return 0;
    });

  return (
    <div className="py-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-black">Reviews</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-[#00FF29] fill-[#00FF29]" />
              <span className="text-black font-medium">{averageRating.toFixed(1)}</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">{totalReviews} reviews</span>
          </div>
        </div>

        {/* Controls Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <select 
              className="bg-[#1C3F39] text-white rounded-lg px-4 py-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
            <select 
              className="bg-[#1C3F39] text-white rounded-lg px-4 py-2"
              value={filterRating || ''}
              onChange={(e) => setFilterRating(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          <button
            onClick={() => setShowNewReview(!showNewReview)}
            className="bg-[#00FF29] text-black px-4 py-2 rounded-lg hover:bg-[#00CC23] transition-colors"
          >
            Write a Review
          </button>
        </div>

        {/* New Review Form */}
        {showNewReview && (
          <form onSubmit={handleSubmitReview} className="bg-[#1C3F39] rounded-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className="focus:outline-none"
                >
                  <Star 
                    className={`w-6 h-6 ${star <= newReview.rating ? 'text-[#00FF29] fill-[#00FF29]' : 'text-gray-400'}`}
                  />
                </button>
              ))}
            </div>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="w-full bg-[#02080D] text-white rounded-lg p-4 mb-4"
              placeholder="Write your review here..."
              rows={4}
              required
            />
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowNewReview(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#00FF29] text-black px-4 py-2 rounded-lg hover:bg-[#00CC23] transition-colors"
              >
                Post Review
              </button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredAndSortedReviews.map((review) => (
            <div key={review.id} className=" rounded-lg p-6 bg-[#f1f5f9] text-black">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-black font-medium">{review.user}</h3>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-[#00FF29] fill-[#00FF29]" />
                  <span className="text-black">{review.rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-black mb-4">{review.comment}</p>
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