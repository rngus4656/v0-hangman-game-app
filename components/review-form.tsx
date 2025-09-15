"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { StarRating } from "@/components/star-rating"
import { useToast } from "@/hooks/use-toast"

interface ReviewFormProps {
  onSubmit: (nickname: string, rating: number, content: string) => void
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [nickname, setNickname] = useState("")
  const [rating, setRating] = useState(0)
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!nickname.trim()) {
      toast({
        title: "Nickname Required",
        description: "Please enter your nickname.",
        variant: "destructive",
      })
      return
    }

    if (nickname.trim().length < 2 || nickname.trim().length > 16) {
      toast({
        title: "Invalid Nickname",
        description: "Nickname must be between 2 and 16 characters.",
        variant: "destructive",
      })
      return
    }

    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating.",
        variant: "destructive",
      })
      return
    }

    if (!content.trim()) {
      toast({
        title: "Review Required",
        description: "Please write your review.",
        variant: "destructive",
      })
      return
    }

    if (content.trim().length > 300) {
      toast({
        title: "Review Too Long",
        description: "Review must be 300 characters or less.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      onSubmit(nickname.trim(), rating, content.trim())

      // Reset form
      setNickname("")
      setRating(0)
      setContent("")

      toast({
        title: "Review Submitted!",
        description: "Thank you for your feedback!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nickname">Nickname *</Label>
            <Input
              id="nickname"
              type="text"
              placeholder="Enter your nickname (2-16 characters)"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={16}
              required
            />
            <p className="text-xs text-muted-foreground">{nickname.length}/16 characters</p>
          </div>

          <div className="space-y-2">
            <Label>Rating *</Label>
            <div className="flex items-center gap-2">
              <StarRating rating={rating} onRatingChange={setRating} size="lg" />
              <span className="text-sm text-muted-foreground">
                {rating > 0 ? `${rating}/5 stars` : "Select rating"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Review *</Label>
            <Textarea
              id="content"
              placeholder="Share your thoughts about the game..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={300}
              rows={4}
              required
            />
            <p className="text-xs text-muted-foreground">{content.length}/300 characters</p>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
