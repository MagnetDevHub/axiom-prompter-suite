import { useState } from "react";
import { Star, ShoppingCart, Heart, ExternalLink, TrendingDown, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  asin: string;
  title: string;
  description?: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  imageUrl: string;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  features?: string[];
  affiliateUrl: string;
  availability: boolean;
}

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  personalizedReason?: string;
  className?: string;
}

export const ProductCard = ({ product, onProductClick, personalizedReason, className }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAffiliateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Track click for analytics
    window.open(product.affiliateUrl, '_blank');
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < Math.floor(rating) 
            ? "fill-yellow-400 text-yellow-400" 
            : i < rating 
            ? "fill-yellow-400/50 text-yellow-400" 
            : "text-muted-foreground/30"
        )}
      />
    ));
  };

  return (
    <Card 
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:shadow-glow hover:-translate-y-1 bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30",
        className
      )}
      onClick={() => onProductClick(product)}
    >
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-t-lg aspect-square bg-muted">
          <img
            src={product.imageUrl}
            alt={product.title}
            className={cn(
              "w-full h-full object-cover transition-all duration-300 group-hover:scale-105",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Overlay Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.discountPercentage && product.discountPercentage > 0 && (
              <Badge className="bg-destructive text-destructive-foreground flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />
                {product.discountPercentage}% OFF
              </Badge>
            )}
            
            {personalizedReason && (
              <Badge className="bg-primary text-primary-foreground max-w-[120px] text-xs">
                {personalizedReason}
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleWishlistToggle}
          >
            <Heart className={cn("h-4 w-4", isWishlisted && "fill-red-500 text-red-500")} />
          </Button>

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Button variant="secondary" size="sm" className="translate-y-4 group-hover:translate-y-0 transition-transform">
              Quick View
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="font-medium">{product.brand}</span>
            <span>{product.category}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Key Features */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-1">
              {product.features.slice(0, 2).map((feature, index) => (
                <div key={index} className="text-sm text-muted-foreground flex items-center gap-1">
                  <div className="w-1 h-1 bg-primary rounded-full" />
                  {feature}
                </div>
              ))}
            </div>
          )}

          {/* Availability Status */}
          <div className="flex items-center gap-2 text-sm">
            <div className={cn(
              "w-2 h-2 rounded-full",
              product.availability ? "bg-green-500" : "bg-red-500"
            )} />
            <span className={cn(
              product.availability ? "text-green-600" : "text-red-600"
            )}>
              {product.availability ? "In Stock" : "Out of Stock"}
            </span>
            {product.availability && (
              <div className="flex items-center gap-1 text-muted-foreground ml-auto">
                <Clock className="h-3 w-3" />
                <span>Fast Delivery</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleAffiliateClick}
              className="flex-1 bg-gradient-primary text-primary-foreground hover:shadow-glow"
              disabled={!product.availability}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              View on Amazon
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onProductClick(product);
              }}
              className="px-3"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};