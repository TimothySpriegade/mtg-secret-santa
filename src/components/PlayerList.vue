<script setup lang="ts">
import type { Player } from '../types/player'

defineProps<{
  players: Player[]
}>()

const emit = defineEmits<{
  removePlayer: [index: number]
}>()
</script>

<template>
  <div v-if="players.length" class="players-list">
    <div v-for="(player, index) in players" :key="index" class="player-item">
      <div class="player-info">
        <span class="player-name">{{ player.name }}</span>
        <span class="player-email">{{ player.email }}</span>
      </div>
      <button @click="emit('removePlayer', index)" class="remove-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.players-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.player-item {
  padding: 1rem;
  background-color: #1a1a1a;
  border: 1px solid #333333;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.player-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.player-name {
  font-weight: 500;
  color: #e0e0e0;
}

.player-email {
  color: #888888;
  font-size: 0.875rem;
}

.remove-button {
  padding: 0.5rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease-in-out;
  flex-shrink: 0;
}

.remove-button:hover {
  background-color: #dc2626;
}

.remove-button:active {
  background-color: #b91c1c;
}
</style>