import { useState, useEffect } from "react";
import { Filter, SortAsc, Grid3X3, List, Loader2 } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  searchQuery?: string;
  onProductClick: (product: Product) => void;
  className?: string;
}

type SortOption = 'relevance' | 'price-low' | 'price-high' | 'rating' | 'reviews';
type ViewMode = 'grid' | 'list';

export const ProductGrid = ({ products, loading, searchQuery, onProductClick, className }: ProductGridProps) => {
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 10000 });

  // Sort products based on selected option
  useEffect(() => {
    let sorted = [...products];
    
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Keep original order for relevance
        break;
    }
    
    // Apply price filter
    const filtered = sorted.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    setFilteredProducts(filtered);
  }, [products, sortBy, priceRange]);

  const getPersonalizedReason = (product: Product): string | undefined => {
    const reasons = [
      "Popular Choice",
      "Great Value",
      "Trending Now",
      "Best Seller",
      "Top Rated",
      "Perfect Match"
    ];
    
    // Simple logic to assign personalized reasons
    if (product.rating >= 4.5) return "Top Rated";
    if (product.discountPercentage && product.discountPercentage > 30) return "Great Value";
    if (product.reviewCount > 1000) return "Popular Choice";
    return reasons[Math.floor(Math.random() * reasons.length)];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-lg text-muted-foreground">Finding the best products for you...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">
            {searchQuery ? `Results for "${searchQuery}"` : "Recommended Products"}
          </h2>
          <p className="text-muted-foreground">
            {filteredProducts.length} products found
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters and Sort */}
      <Card className="bg-background/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Sort By */}
            <div className="flex items-center gap-2">
              <SortAsc className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Sort by:</span>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Customer Rating</SelectItem>
                  <SelectItem value="reviews">Number of Reviews</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* Quick Filters */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
              <div className="flex gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  Under $50
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  Free Shipping
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  Prime Eligible
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  4+ Stars
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Grid/List */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">No products found matching your criteria</p>
          <Button variant="outline" onClick={() => setPriceRange({ min: 0, max: 10000 })}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className={cn(
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "flex flex-col gap-4"
        )}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={onProductClick}
              personalizedReason={getPersonalizedReason(product)}
              className={viewMode === 'list' ? "flex-row" : ""}
            />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {filteredProducts.length > 0 && (
        <div className="text-center pt-8">
          <Button variant="outline" size="lg" className="min-w-[200px]">
            Load More Products
          </Button>
        </div>
      )}
    </div>
  );
};
