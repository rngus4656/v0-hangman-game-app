"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface GameResultModalProps {
  isOpen: boolean
  gameStatus: "won" | "lost"
  gameWord: string
  onNewGame: () => void
  onClose: () => void
}

export function GameResultModal({ isOpen, gameStatus, gameWord, onNewGame, onClose }: GameResultModalProps) {
  const isWin = gameStatus === "won"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className={`text-2xl text-center ${isWin ? "text-green-600" : "text-red-600"}`}>
            {isWin ? "🎉 Congratulations!" : "💀 Game Over"}
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            {isWin ? (
              <>
                You successfully guessed the word!
                <div className="text-2xl font-bold text-primary mt-2 font-mono">{gameWord.toUpperCase()}</div>
              </>
            ) : (
              <>
                Better luck next time! The word was:
                <div className="text-2xl font-bold text-primary mt-2 font-mono">{gameWord.toUpperCase()}</div>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-6">
          <Button onClick={onNewGame} size="lg" className="w-full">
            Play Again
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full bg-transparent">
            <Link href="/">Home</Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="w-full">
            <Link href="/reviews">Leave Review</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
