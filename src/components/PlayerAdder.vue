<script setup lang="ts">
import { ref } from 'vue'
import type { Player } from '../types/player'

const emit = defineEmits<{
  addPlayer: [player: Player]
}>()

const newPlayerName = ref('')
const newPlayerEmail = ref('')

const addPlayer = () => {
  if (newPlayerName.value.trim() && newPlayerEmail.value.trim()) {
    emit('addPlayer', {
      name: newPlayerName.value.trim(),
      email: newPlayerEmail.value.trim()
    })
    newPlayerName.value = ''
    newPlayerEmail.value = ''
  }
}
</script>

<template>
  <div class="player-adder">
    <div class="input-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="newPlayerName"
        type="text"
        class="text-input"
        placeholder="Enter name"
      />
    </div>

    <div class="input-group">
      <label for="email">Email</label>
      <input
        id="email"
        v-model="newPlayerEmail"
        type="email"
        class="text-input"
        placeholder="Enter email"
      />
    </div>

    <button @click="addPlayer" class="add-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.player-adder {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.input-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.text-input {
  padding: 0.625rem 1rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background-color: white;
  color: #000000;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.text-input:hover {
  border-color: #9ca3af;
}

.text-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.add-button {
  padding: 0.625rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease-in-out;
  flex-shrink: 0;
}

.add-button:hover {
  background-color: #2563eb;
}

.add-button:active {
  background-color: #1d4ed8;
}
</style>