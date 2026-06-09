export type ProductReview = {
  rating: number;
  comment: string;
  reviewerName: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images: string[];
  reviews?: ProductReview[];
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
};