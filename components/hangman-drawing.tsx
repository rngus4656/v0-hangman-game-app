interface HangmanDrawingProps {
  wrongGuesses: number
}

export function HangmanDrawing({ wrongGuesses }: HangmanDrawingProps) {
  const stages = [
    // Stage 0: Empty gallows
    `
     -------
     |      |
            |
            |
            |
            |
            |
            |
    =========`,
    // Stage 1: Head
    `
     -------
     |      |
     O      |
            |
            |
            |
            |
            |
    =========`,
    // Stage 2: Body
    `
     -------
     |      |
     O      |
     |      |
            |
            |
            |
            |
    =========`,
    // Stage 3: Left arm
    `
     -------
     |      |
     O      |
    /|      |
            |
            |
            |
            |
    =========`,
    // Stage 4: Right arm
    `
     -------
     |      |
     O      |
    /|\\     |
            |
            |
            |
            |
    =========`,
    // Stage 5: Left leg
    `
     -------
     |      |
     O      |
    /|\\     |
    /       |
            |
            |
            |
    =========`,
    // Stage 6: Right leg (game over)
    `
     -------
     |      |
     O      |
    /|\\     |
    / \\     |
            |
            |
            |
    =========`,
  ]

  return (
    <div className="font-mono text-sm leading-tight text-center bg-muted p-4 rounded-lg">
      <pre className="whitespace-pre text-foreground">{stages[wrongGuesses] || stages[0]}</pre>
    </div>
  )
}
