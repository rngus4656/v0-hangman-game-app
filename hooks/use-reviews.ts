"use client"

import { useState, useEffect } from "react"

export interface Review {
  id: string
  nickname: string
  rating: number
  content: string
  createdAt: string
}

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load reviews from localStorage on mount
  useEffect(() => {
    try {
      const savedReviews = localStorage.getItem("hangman-reviews")
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews))
      }
    } catch (error) {
      console.error("Failed to load reviews:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save reviews to localStorage whenever reviews change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem("hangman-reviews", JSON.stringify(reviews))
      } catch (error) {
        console.error("Failed to save reviews:", error)
      }
    }
  }, [reviews, isLoading])

  const addReview = (nickname: string, rating: number, content: string) => {
    const newReview: Review = {
      id: Date.now().toString(),
      nickname: nickname.trim(),
      rating,
      content: content.trim(),
      createdAt: new Date().toISOString(),
    }

    setReviews((prevReviews) => [newReview, ...prevReviews])
  }

  const sortReviews = (sortBy: "newest" | "oldest" | "highest" | "lowest") => {
    setReviews((prevReviews) => {
      const sorted = [...prevReviews]
      switch (sortBy) {
        case "newest":
          return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        case "oldest":
          return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        case "highest":
          return sorted.sort((a, b) => b.rating - a.rating)
        case "lowest":
          return sorted.sort((a, b) => a.rating - b.rating)
        default:
          return sorted
      }
    })
  }

  return {
    reviews,
    isLoading,
    addReview,
    sortReviews,
  }
}
