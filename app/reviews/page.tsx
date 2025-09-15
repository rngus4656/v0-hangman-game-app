"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReviewForm } from "@/components/review-form"
import { ReviewList } from "@/components/review-list"
import { useReviews } from "@/hooks/use-reviews"

export default function ReviewsPage() {
  const { reviews, isLoading, addReview, sortReviews } = useReviews()

  const handleSortChange = (value: string) => {
    sortReviews(value as "newest" | "oldest" | "highest" | "lowest")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">게임 리뷰</h1>
        <p className="text-muted-foreground">당신의 경험을 공유하고 다른 사람들의 생각을 읽어보세요!</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Review Form */}
        <div className="lg:col-span-1">
          <ReviewForm onSubmit={addReview} />

          {/* Navigation Buttons */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">빠른 이동</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/">홈</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/game">게임 플레이</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">리뷰 ({reviews.length})</h2>
            {reviews.length > 0 && (
              <Select onValueChange={handleSortChange} defaultValue="newest">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="정렬 기준..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">최신순</SelectItem>
                  <SelectItem value="oldest">오래된순</SelectItem>
                  <SelectItem value="highest">높은 평점순</SelectItem>
                  <SelectItem value="lowest">낮은 평점순</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          <ReviewList reviews={reviews} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}
