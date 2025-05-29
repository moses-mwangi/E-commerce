"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { createReview } from "@/redux/slices/ReviewsRatingSlice";
import ButtonLoader from "@/app/components/loaders/ButtonLoader";
import { Card } from "@/components/ui/card";
import { Image } from "@radix-ui/react-avatar";

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
  isEditMode?: boolean;
}

const CATEGORY_SPECIFIC_REVIEWS: Record<string, string[]> = {
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

const GENERAL_REVIEWS = [
  "Great product, exactly as described!",
  "Good quality and fast shipping.",
  "Met my expectations, would buy again.",
  "The product is okay, but could be better.",
  "Not what I expected, disappointed.",
];

const getCategorySpecificReviews = (category?: string) => {
  if (!category) return GENERAL_REVIEWS;

  const normalizedCategory = category.toLowerCase();
  return [
    ...(CATEGORY_SPECIFIC_REVIEWS[normalizedCategory] || GENERAL_REVIEWS),
  ];
};

const POSITIVE_WORDS = [
  "great",
  "excellent",
  "perfect",
  "love",
  "wonderful",
  "happy",
  "satisfied",
  "recommend",
  "amazing",
  "impressed",
];

const NEGATIVE_WORDS = [
  "bad",
  "poor",
  "disappointed",
  "terrible",
  "awful",
  "broken",
  "damaged",
  "irritation",
  "waste",
  "horrible",
];

const autoSetRating = (reviewText: string) => {
  const text = reviewText.toLowerCase();

  if (POSITIVE_WORDS.some((word) => text.includes(word))) return 5;
  if (NEGATIVE_WORDS.some((word) => text.includes(word))) return 1;
  if (text.includes("good") || text.includes("nice")) return 4;
  if (text.includes("okay") || text.includes("fine")) return 3;
  if (text.includes("could be better") || text.includes("issues")) return 2;

  return 0;
};

export default function EditReviewForm({
  productId,
  userId,
  orderId,
  productName,
  productImage,
  productCategory,
  defaultRating = 0,
  defaultReview = "",
  onCancel,
  isEditMode = false,
}: ReviewFormProps) {
  const [rating, setRating] = useState(defaultRating);
  const [review, setReview] = useState(defaultReview);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.review);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    if (!review || review.length < 10) {
      toast.error("Please write a review with at least 10 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      const customerReview = {
        productId,
        userId,
        orderId: orderId.toString(),
        rating,
        comment: review,
      };

      await dispatch(createReview(customerReview)).unwrap();

      if (isMounted) {
        setRating(0);
        setReview("");
      }

      toast.success(
        isEditMode
          ? "Review updated successfully!"
          : "Review submitted successfully!"
      );
      onCancel?.();
    } catch (err) {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      if (isMounted) {
        setIsSubmitting(false);
      }
    }
  };

  const quickReviewOptions = getCategorySpecificReviews(productCategory);

  const handleQuickReviewSelect = (option: string) => {
    setReview(option);
    const suggestedRating = autoSetRating(option);
    if (suggestedRating > 0) {
      setRating(suggestedRating);
    }
  };

  const onCancels = async () => {
    setShowEditModal(true);
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded">
          <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
          <span className="text-sm font-medium">
            You&apos;ve already reviewed this product
          </span>
        </div>
        <Button
          onClick={() => {
            setShowEditModal(true);
          }}
          variant="link"
          size="sm"
          className="h-auto"
        >
          Edit review
        </Button>
      </div>
      {showEditModal === true && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-[2px] flex items-center justify-center p-4">
          <Card className="w-full max-w-3xl max-h-[480px] relative overflow-y-scroll">
            <button
              onClick={() => {
                setShowEditModal(false);
              }}
              className="absolute top-4 right-4 rounded-full p-1 hover:bg-gray-100 transition-colors"
              aria-label="Close review modal"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">
                {isEditMode ? "Edit Your Review" : "Write a Review"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={productImage || "/placeholder-product.jpg"}
                      alt={productName}
                      className="w-full h-full rounded-md object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/placeholder-product.jpg";
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium line-clamp-2">{productName}</h3>
                    <p className="text-sm text-gray-500">
                      Product ID: {productId}
                    </p>
                    {productCategory && (
                      <p className="text-xs text-gray-400 capitalize">
                        {productCategory}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                        aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
                      >
                        <Star
                          className={`h-8 w-8 transition-colors ${
                            star <= rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300 hover:text-yellow-400"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="review"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Review <span className="text-red-500">*</span>
                  </label>

                  <div className="mb-3 flex flex-wrap gap-2 max-h-28 overflow-y-auto py-1">
                    {quickReviewOptions.map((option) => (
                      <Button
                        key={option}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickReviewSelect(option)}
                        className="text-xs whitespace-normal text-left h-auto py-1"
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
                  <p
                    className={`text-xs mt-1 ${
                      review.length >= 10 ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {review.length >= 10 ? "✓ " : ""}
                    Minimum 10 characters required ({review.length}/10)
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowEditModal(false);
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-orange-500 hover:bg-orange-600 w-32 transition-colors"
                    type="submit"
                    disabled={
                      isSubmitting || rating === 0 || review.length < 10
                    }
                  >
                    {isSubmitting ? (
                      <ButtonLoader />
                    ) : isEditMode ? (
                      "Update Review"
                    ) : (
                      "Submit Review"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
