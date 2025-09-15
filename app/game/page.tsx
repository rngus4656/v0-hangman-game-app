"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { HangmanDrawing } from "@/components/hangman-drawing"
import { GameResultModal } from "@/components/game-result-modal"
import { useHangmanGame } from "@/hooks/use-hangman-game"
import { useToast } from "@/hooks/use-toast"

export default function GamePage() {
  const { gameState, makeGuess, resetGame, isLetterGuessed } = useHangmanGame()
  const [currentGuess, setCurrentGuess] = useState("")
  const [showResultModal, setShowResultModal] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (gameState.gameStatus !== "playing") {
      setShowResultModal(true)
    }
  }, [gameState.gameStatus])

  const handleGuess = () => {
    if (!currentGuess) {
      toast({
        title: "잘못된 입력",
        description: "추측할 글자를 입력해주세요.",
        variant: "destructive",
      })
      return
    }

    if (currentGuess.length !== 1) {
      toast({
        title: "잘못된 입력",
        description: "한 번에 한 글자만 입력해주세요.",
        variant: "destructive",
      })
      return
    }

    if (!/^[a-zA-Z]$/.test(currentGuess)) {
      toast({
        title: "잘못된 입력",
        description: "영어 알파벳만 입력해주세요.",
        variant: "destructive",
      })
      return
    }

    if (isLetterGuessed(currentGuess)) {
      toast({
        title: "이미 추측한 글자",
        description: "이미 시도한 글자입니다!",
        variant: "destructive",
      })
      return
    }

    const wasCorrect = gameState.gameWord.includes(currentGuess.toLowerCase())
    makeGuess(currentGuess)
    setCurrentGuess("")

    // Show feedback
    if (wasCorrect) {
      toast({
        title: "정답!",
        description: "훌륭한 추측입니다! 그 글자가 단어에 있습니다.",
      })
    } else {
      toast({
        title: "틀렸습니다!",
        description: "그 글자는 단어에 없습니다.",
        variant: "destructive",
      })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleGuess()
    }
  }

  const handleNewGame = () => {
    resetGame()
    setShowResultModal(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">행맨 게임</h1>
        <p className="text-muted-foreground">글자 하나씩 추측해서 단어를 맞춰보세요!</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Game Area */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>게임 진행 상황</span>
              <Badge variant={gameState.wrongGuesses >= 4 ? "destructive" : "secondary"}>
                기회: {gameState.maxWrongGuesses - gameState.wrongGuesses}/{gameState.maxWrongGuesses}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Hangman Drawing */}
            <HangmanDrawing wrongGuesses={gameState.wrongGuesses} />

            {/* Word Display */}
            <div className="text-center">
              <div className="text-3xl font-mono font-bold tracking-wider mb-4">{gameState.guessedWord.join(" ")}</div>

              {/* Game Status */}
              {gameState.gameStatus === "won" && (
                <div className="text-green-600 font-bold text-xl mb-4">축하합니다! 승리했습니다!</div>
              )}
              {gameState.gameStatus === "lost" && (
                <div className="text-red-600 font-bold text-xl mb-4">게임 오버! 정답은: {gameState.gameWord}</div>
              )}
            </div>

            {/* Input Area */}
            {gameState.gameStatus === "playing" && (
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="글자를 입력하세요"
                  value={currentGuess}
                  onChange={(e) => setCurrentGuess(e.target.value)}
                  onKeyPress={handleKeyPress}
                  maxLength={1}
                  className="text-center text-lg"
                />
                <Button onClick={handleGuess} size="lg">
                  추측
                </Button>
              </div>
            )}

            {/* Guessed Letters */}
            {gameState.guessedLetters.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">추측한 글자들:</h4>
                <div className="flex flex-wrap gap-2">
                  {gameState.guessedLetters.map((letter) => (
                    <Badge key={letter} variant={gameState.gameWord.includes(letter) ? "default" : "destructive"}>
                      {letter.toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle>게임 컨트롤</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button onClick={resetGame} variant="outline" className="w-full bg-transparent" size="lg">
                새 게임
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent" size="lg">
                <Link href="/">홈</Link>
              </Button>
              <Button asChild variant="secondary" className="w-full" size="lg">
                <Link href="/reviews">리뷰 남기기</Link>
              </Button>
            </div>

            {/* Game Stats */}
            <div className="pt-4 border-t space-y-2">
              <div className="flex justify-between text-sm">
                <span>단어 길이:</span>
                <span className="font-mono">{gameState.gameWord.length} 글자</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>추측한 글자 수:</span>
                <span className="font-mono">{gameState.guessedLetters.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>틀린 추측:</span>
                <span className="font-mono">{gameState.wrongGuesses}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <GameResultModal
        isOpen={showResultModal}
        gameStatus={gameState.gameStatus}
        gameWord={gameState.gameWord}
        onNewGame={handleNewGame}
        onClose={() => setShowResultModal(false)}
      />
    </div>
  )
}
