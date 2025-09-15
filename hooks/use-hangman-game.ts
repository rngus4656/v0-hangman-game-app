"use client"

import { useState, useCallback } from "react"

const WORD_LIST = ["python", "wassup", "apple", "google", "chicken", "summer"]

export interface GameState {
  gameWord: string
  guessedWord: string[]
  guessedLetters: string[]
  wrongGuesses: number
  maxWrongGuesses: number
  gameStatus: "playing" | "won" | "lost"
}

export function useHangmanGame() {
  const [gameState, setGameState] = useState<GameState>(() => initializeGame())

  function initializeGame(): GameState {
    const gameWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
    return {
      gameWord,
      guessedWord: Array(gameWord.length).fill("_"),
      guessedLetters: [],
      wrongGuesses: 0,
      maxWrongGuesses: 6,
      gameStatus: "playing",
    }
  }

  const resetGame = useCallback(() => {
    setGameState(initializeGame())
  }, [])

  const makeGuess = useCallback((letter: string) => {
    const normalizedLetter = letter.toLowerCase()

    setGameState((prevState) => {
      // Don't allow guesses if game is over
      if (prevState.gameStatus !== "playing") {
        return prevState
      }

      // Don't allow duplicate guesses
      if (prevState.guessedLetters.includes(normalizedLetter)) {
        return prevState
      }

      const newGuessedLetters = [...prevState.guessedLetters, normalizedLetter]
      const newGuessedWord = [...prevState.guessedWord]
      let newWrongGuesses = prevState.wrongGuesses

      // Check if the letter is in the word
      if (prevState.gameWord.includes(normalizedLetter)) {
        // Reveal all instances of the letter
        for (let i = 0; i < prevState.gameWord.length; i++) {
          if (prevState.gameWord[i] === normalizedLetter) {
            newGuessedWord[i] = normalizedLetter
          }
        }
      } else {
        // Wrong guess
        newWrongGuesses += 1
      }

      // Determine game status
      let newGameStatus: "playing" | "won" | "lost" = "playing"
      if (!newGuessedWord.includes("_")) {
        newGameStatus = "won"
      } else if (newWrongGuesses >= prevState.maxWrongGuesses) {
        newGameStatus = "lost"
      }

      return {
        ...prevState,
        guessedWord: newGuessedWord,
        guessedLetters: newGuessedLetters,
        wrongGuesses: newWrongGuesses,
        gameStatus: newGameStatus,
      }
    })
  }, [])

  const isLetterGuessed = useCallback(
    (letter: string) => {
      return gameState.guessedLetters.includes(letter.toLowerCase())
    },
    [gameState.guessedLetters],
  )

  return {
    gameState,
    makeGuess,
    resetGame,
    isLetterGuessed,
  }
}
