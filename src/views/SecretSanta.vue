<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Player } from '../types/player'
import type { ManaColor } from '../types/player'
import ManaSelector from '../components/ManaSelector.vue'
import PlayerAdder from '../components/PlayerAdder.vue'
import PlayerList from '../components/PlayerList.vue'
import DebugOutput from '../components/DebugOutput.vue'
import { useLocalStorage } from '../composables/useLocalStorage'
import { useManaAssignment } from '../composables/useManaAssignment'
import Header from "../components/Header.vue";
import SendMailButton from "../components/SendMailButton.vue";

interface AssignmentDebugInfo {
  timestamp: string
  minColors: number
  maxColors: number
  assignments: Array<{
    player: string
    colors: ManaColor[]
    giftRecipient: string
  }>
}

const min = useLocalStorage('minMana', 1)
const max = useLocalStorage('maxMana', 1)
const players = useLocalStorage<Player[]>('secret-santa-players', [])
const debugInfo = ref<AssignmentDebugInfo | null>(null)
const showDebug = ref(false)

const { assignManaAndGifts: performAssignment } = useManaAssignment()

const canAssign = computed(() => players.value.length >= 2)

const assignManaAndGifts = (): void => {
  try {
    const assignments = performAssignment(players.value, min.value, max.value)

    debugInfo.value = {
      timestamp: new Date().toISOString(),
      minColors: min.value,
      maxColors: max.value,
      assignments
    }
  } catch (error) {
    alert(error instanceof Error ? error.message : 'An error occurred')
  }
}

const handleAddPlayer = (player: Player) => {
  players.value.push(player)
}

const handleRemovePlayer = (index: number) => {
  players.value.splice(index, 1)
}

const hasAssignments = computed(() => debugInfo.value !== null)
</script>

<template>
  <div class="centered-container">
    <div class="square-content">
      <div class="config-section">
        <Header></Header>
        <ManaSelector v-model:min="min" v-model:max="max" />
        <PlayerAdder @add-player="handleAddPlayer" />
        <PlayerList :players="players" @remove-player="handleRemovePlayer" />
        <button @click="assignManaAndGifts" :disabled="!canAssign">
          Assign Colors & Gifts
        </button>
        <SendMailButton
          :players="players"
          :has-assignments="hasAssignments"
        />
        <DebugOutput
            :debug-info="debugInfo"
            v-model:show-debug="showDebug"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  width: 100%;
  padding: 2rem 0;
}

.square-content {
  width: 85vw;
  min-height: 85vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.config-section {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  max-width: 600px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>