"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import type { Review } from "@/hooks/use-reviews"

interface ReviewListProps {
  reviews: Review[]
  isLoading: boolean
}

export function ReviewList({ reviews, isLoading }: ReviewListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-16 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-muted-foreground">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
            <p>Be the first to leave a review for HangMan Mini!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {review.nickname.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-semibold">{review.nickname}</h4>
                  <div className="flex items-center gap-2">
                    <StarRating rating={review.rating} readonly size="sm" />
                    <Badge variant="secondary" className="text-xs">
                      {review.rating}/5
                    </Badge>
                  </div>
                </div>
              </div>
              <time className="text-xs text-muted-foreground">{formatDate(review.createdAt)}</time>
            </div>
            <p className="text-sm leading-relaxed">{review.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
