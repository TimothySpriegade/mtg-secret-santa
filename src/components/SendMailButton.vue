<script setup lang="ts">
import type {Player} from '../types/player'

interface Props {
  players: Player[]
  hasAssignments: boolean
}

const props = defineProps<Props>()

const handleClick = () => {
  console.log("Button clicked - placeholder for now")
  console.debug({
    hasAssignments: props.hasAssignments,
    hasTwoPlayers: props.players.length >= 2,
    playersHaveRecipients: props.players.every(p => p.giftRecipient)
  })
}
</script>

<template>
  <div>
    <button
        @click="handleClick"
        :disabled="!hasAssignments || players.length < 2"
        class="send-button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2">
        <path d="M22 2L11 13"></path>
        <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
      </svg>
      Send Assignments
    </button>
  </div>
</template>

<style scoped>
.send-button {
  padding: 0.625rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.15s ease-in-out;
  width: 100%;
}

.send-button:hover:not(:disabled) {
  background-color: #2563eb;
}

.send-button:active:not(:disabled) {
  background-color: #1d4ed8;
}

.send-button:disabled {
  background-color: #4b5563;
  cursor: not-allowed;
  opacity: 0.5;
}
</style>