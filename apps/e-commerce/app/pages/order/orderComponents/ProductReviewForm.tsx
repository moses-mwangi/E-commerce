/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { createReview } from "@/redux/slices/ReviewsRatingSlice";
import ButtonLoader from "@/app/components/loaders/ButtonLoader";

interface ReviewFormProps {
  productId: number;
  userId: number;
  orderId: number;
  productName: string;
  productImage: string;
  productCategory?: string;
  defaultRating?: number;
  defaultReview?: string;
  onCancel?: () => void;
}

const getCategorySpecificReviews = (category?: string) => {
  const generalReviews = [
    "Great product, exactly as described!",
    "Good quality and fast shipping.",
    "Met my expectations, would buy again.",
    "The product is okay, but could be better.",
    "Not what I expected, disappointed.",
  ];

  if (!category) return generalReviews;

  const categoryReviews: Record<string, string[]> = {
    electronics: [
      "Works perfectly, very satisfied with the performance.",
      "Good features but the battery life could be better.",
      "High-quality build and excellent functionality.",
      "Had some issues with setup but works fine now.",
      "Stopped working after a few days, very disappointed.",
      "Cutting-edge technology that works flawlessly.",
      "User-friendly interface and great performance.",
      "Overpriced for what it offers.",
      "Excellent customer support and warranty service.",
    ],
    fashion: [
      "Trendy design and comfortable to wear all day.",
      "Perfect fit and true to size measurements.",
      "Fabric feels luxurious and drapes beautifully.",
      "Color faded after first wash, disappointing.",
      "Stitching came loose after minimal wear.",
      "Versatile piece that works with many outfits.",
      "Not as breathable as I expected for the price.",
      "Unique design that gets lots of compliments.",
      // "Sizing runs small, order a size up.",
    ],
    beauty: [
      "Noticeable results after just one week of use.",
      "Luxurious texture and pleasant fragrance.",
      "Caused unexpected breakouts and irritation.",
      "Packaging is beautiful and travel-friendly.",
      "Smaller than expected for the price.",
      "Holy grail product that actually delivers.",
      "Didn't see any improvement after full bottle.",
      "Gentle formula perfect for sensitive skin.",
      "Dries out skin rather than moisturizing.",
    ],
    "home decor": [
      "Elevated my space instantly, love the aesthetic.",
      "Difficult to assemble but looks great when done.",
      "Material quality doesn't match the price point.",
      "Perfect size and color for my living room.",
      "Arrived damaged with poor packaging.",
      "Statement piece that ties the room together.",
      "Colors differ significantly from website photos.",
      "Surprisingly sturdy and well-made.",
      "Missing hardware for assembly upon delivery.",
    ],
    "security devices": [
      "Easy to install and gives great peace of mind.",
      "App connectivity issues make it frustrating to use.",
      "Night vision quality exceeds expectations.",
      "False alarms triggered too frequently.",
      "Battery life lasts much longer than advertised.",
      "Customer support helped resolve my issues quickly.",
      "Difficult to pair with other smart home devices.",
      "Weatherproof design works perfectly outdoors.",
      "Motion detection isn't sensitive enough.",
    ],
    "car accessories": [
      "Perfect fit for my vehicle model with no modifications needed.",
      "Installation instructions were unclear and incomplete.",
      "Premium materials that look OEM quality.",
      "Broke after just a few months of normal use.",
      "Great value for money compared to dealer parts.",
      "Doesn't fit as described - had to return.",
      "Noticeable improvement in performance/comfort.",
      "Cheap plastic feel despite high price.",
      "Exactly what I needed for my customization project.",
    ],
  };

  return [...(categoryReviews[category.toLowerCase()] || generalReviews || [])];
};

export default function ProductReviewForm({
  productId,
  userId,
  orderId,
  productName,
  productImage,
  productCategory,
  defaultRating = 0,
  defaultReview = "",
  onCancel,
}: ReviewFormProps) {
  const [rating, setRating] = useState(defaultRating);
  const [review, setReview] = useState(defaultReview);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { reviews, status } = useSelector((state: RootState) => state.review);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating) {
      return toast.error("Please select a rating");
    }

    if (!review || review.length < 10) {
      return toast.error("Please write a review with at least 10 characters");
    }

    setIsSubmitting(true);

    console.log(productCategory);

    try {
      const customerReview = {
        productId,
        userId,
        orderId: orderId.toString(),
        rating,
        comment: review,
      };

      console.log(customerReview);

      dispatch(createReview(customerReview)).unwrap();

      setRating(0);
      setReview("");
    } catch (err) {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickReviewOptions = getCategorySpecificReviews(productCategory);

  const autoSetRating = (reviewText: string) => {
    const positiveWords = [
      "great",
      "excellent",
      "perfect",
      "love",
      "wonderful",
      "happy",
      "satisfied",
      "recommend",
    ];
    const negativeWords = [
      "bad",
      "poor",
      "disappointed",
      "terrible",
      "awful",
      "broken",
      "damaged",
      "irritation",
    ];

    const text = reviewText.toLowerCase();

    if (positiveWords.some((word) => text.includes(word))) {
      setRating(5);
    } else if (negativeWords.some((word) => text.includes(word))) {
      setRating(1);
    } else if (text.includes("good") || text.includes("nice")) {
      setRating(4);
    } else if (text.includes("okay") || text.includes("fine")) {
      setRating(3);
    } else if (text.includes("could be better") || text.includes("issues")) {
      setRating(2);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[400px]">
      <div className="flex items-center space-x-4">
        <img
          src={productImage || "/placeholder-product.jpg"}
          alt={productName}
          className="w-16 h-16 rounded-md object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder-product.jpg";
          }}
        />
        <div>
          <h3 className="font-medium">{productName}</h3>
          <p className="text-sm text-gray-500">Product ID: {productId}</p>
          {productCategory && (
            <p className="text-xs text-gray-400 capitalize">
              {productCategory}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Your Rating</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="focus:outline-none"
              aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
            >
              <Star
                className={`h-6 w-6 ${
                  star <= rating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="review" className="block text-sm font-medium mb-2">
          Your Review
        </label>

        <div className="mb-3 flex flex-wrap gap-2 max-h-28 overflow-y-auto">
          {quickReviewOptions.map((option) => (
            <Button
              key={option}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setReview(option);
                autoSetRating(option);
              }}
              className="text-xs"
            >
              {option}
            </Button>
          ))}
        </div>

        <Textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder={`Share your experience with this ${
            productCategory || "product"
          }...`}
          className="min-h-[120px] focus-visible:ring-orange-500/85"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Minimum 10 characters required ({review.length}/10)
        </p>
      </div>

      <div className="flex justify-end space-x-3 pb-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          className="bg-orange-500/85 hover:bg-orange-500 w-32"
          type="submit"
          disabled={isSubmitting || rating === 0 || review.length < 10}
        >
          {status === "loading" ? <ButtonLoader /> : "Submit Review"}
        </Button>
      </div>
    </form>
  );
}
