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
    <div class="inputs-row">
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
    </div>

    <button @click="addPlayer" class="add-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Add Player
    </button>
  </div>
</template>

<style scoped>
.player-adder {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.inputs-row {
  display: flex;
  gap: 1rem;
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
  color: #e0e0e0;
}

.text-input {
  padding: 0.625rem 1rem;
  font-size: 1rem;
  border: 1px solid #333333;
  border-radius: 0.5rem;
  background-color: #1a1a1a;
  color: #e0e0e0;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.text-input::placeholder {
  color: #888888;
}

.text-input:hover {
  border-color: #555555;
}

.text-input:focus {
  outline: none;
  border-color: #666666;
  box-shadow: 0 0 0 3px rgba(102, 102, 102, 0.2);
}

.add-button {
  padding: 0.625rem;
  background-color: #10b981;
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

.add-button:hover {
  background-color: #059669;
}

.add-button:active {
  background-color: #047857;
}
</style>
