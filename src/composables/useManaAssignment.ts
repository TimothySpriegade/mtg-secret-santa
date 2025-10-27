import type { ManaColor, Player } from '../types/player'

export function useManaAssignment() {
  const allColors: ManaColor[] = ['White', 'Blue', 'Black', 'Red', 'Green']

  const generateCombinations = (min: number, max: number): ManaColor[][] => {
    const combinations: ManaColor[][] = []

    for (let size = min; size <= max; size++) {
      const generate = (start: number, current: ManaColor[]) => {
        if (current.length === size) {
          combinations.push([...current])
          return
        }
        for (let i = start; i < allColors.length; i++) {
          const color = allColors[i]
          if (color) {
            current.push(color)
            generate(i + 1, current)
            current.pop()
          }
        }
      }
      generate(0, [])
    }

    return combinations.sort(() => Math.random() - 0.5)
  }

  const createDerangement = (n: number): number[] => {
    let attempts = 0
    const maxAttempts = 1000

    while (attempts < maxAttempts) {
      const indices = [...new Array(n).keys()]

      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]]
      }

      const isValid = indices.every((recipient, giver) => recipient !== giver)
      if (isValid) return indices

      attempts++
    }

    return [...new Array(n).keys()].map(i => (i + 1) % n)
  }

  const assignManaAndGifts = (
    players: Player[],
    min: number,
    max: number
  ) => {
    if (players.length < 2) {
      throw new Error('Need at least 2 players')
    }

    const availableCombos = generateCombinations(min, max)

    if (availableCombos.length < players.length) {
      throw new Error('Not enough unique combinations for all players')
    }

    const recipientIndices = createDerangement(players.length)
    const assignments: Array<{
      player: string
      colors: ManaColor[]
      giftRecipient: string
    }> = []

    players.forEach((player, index) => {
      const colors = availableCombos[index]
      const recipientIndex = recipientIndices[index]

      if (colors && recipientIndex !== undefined) {
        player.assignedColors = colors
        player.giftRecipient = players[recipientIndex]?.name

        if (player.giftRecipient) {
          assignments.push({
            player: player.name,
            colors: [...colors],
            giftRecipient: player.giftRecipient
          })
        }
      }
    })

    return assignments
  }

  return { assignManaAndGifts }
}