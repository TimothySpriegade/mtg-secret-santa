<script setup lang="ts">
import {ref, onMounted, watch} from 'vue'
import type {Player} from '../types/player'
import ManaSelector from '../components/ManaSelector.vue'
import PlayerAdder from '../components//PlayerAdder.vue'
import PlayerList from '../components//PlayerList.vue'
import type {ManaColor} from "../types/player";

interface AssignmentDebugInfo {
  timestamp: string;
  minColors: number;
  maxColors: number;
  assignments: Array<{
    player: string;
    colors: ManaColor[];
    giftRecipient: string;
  }>;
}

const min = ref(1)
const max = ref(1)
const players = ref<Player[]>([])
const debugInfo = ref<AssignmentDebugInfo | null>(null)
const showDebug = ref(false)

// Load players and settings from localStorage
onMounted(() => {
  const saved = localStorage.getItem('secret-santa-players')
  const savedMin = localStorage.getItem('minMana')
  const savedMax = localStorage.getItem('maxMana')
  if (saved) {
    players.value = JSON.parse(saved)
  }

  if (savedMin) {
    min.value = savedMin
  }

  if (savedMax) {
    max.value = savedMax
  }

})

// Save players and settings to localStorage
watch(players, (newPlayers) => {
  localStorage.setItem('secret-santa-players', JSON.stringify(newPlayers))
}, {deep: true})

watch(min, (minMana) => {
  localStorage.setItem('minMana', JSON.stringify(minMana))
})

watch(max, (maxMana) => {
  localStorage.setItem('maxMana', JSON.stringify(maxMana))
})


const assignManaAndGifts = (): void => {
  if (players.value.length < 2) {
    alert('Need at least 2 players');
    return;
  }

  const allColors: ManaColor[] = ['White', 'Blue', 'Black', 'Red', 'Green'];
  const generateCombinations = (): ManaColor[][] => {
    const combinations: ManaColor[][] = [];
    for (let size = min.value; size <= max.value; size++) {
      const generate = (start: number, current: ManaColor[]) => {
        if (current.length === size) {
          combinations.push([...current]);
          return;
        }
        for (let i = start; i < allColors.length; i++) {
          const color = allColors[i];
          if (color) {
            current.push(color);
            generate(i + 1, current);
            current.pop();
          }
        }
      };
      generate(0, []);
    }
    return combinations.sort(() => Math.random() - 0.5);
  };

  const availableCombos = generateCombinations();
  if (availableCombos.length < players.value.length) {
    alert('Not enough unique combinations for all players');
    return;
  }

  // Create a derangement a permutation where no element appears in its original position
  const createDerangement = (n: number): number[] => {
    let attempts = 0;
    const maxAttempts = 1000;

    while (attempts < maxAttempts) {
      const indices = [...new Array(n).keys()];
      // Fisher-Yates shuffle
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }

      // Check if it's a valid derangement (no player gets themselves)
      const isValid = indices.every((recipient, giver) => recipient !== giver);
      if (isValid) {
        return indices;
      }
      attempts++;
    }

    // Fallback: simple rotation
    return [...new Array(n).keys()].map(i => (i + 1) % n);
  };

  const recipientIndices = createDerangement(players.value.length);

  debugInfo.value = {
    timestamp: new Date().toISOString(),
    minColors: min.value,
    maxColors: max.value,
    assignments: []
  };

  players.value.forEach((player, index) => {
    const colors = availableCombos[index];
    const recipientIndex = recipientIndices[index];

    if (colors && recipientIndex !== undefined) {
      player.assignedColors = colors;
      player.giftRecipient = players.value[recipientIndex]?.name;

      if (player.giftRecipient) {
        debugInfo.value!.assignments.push({
          player: player.name,
          colors: [...colors],
          giftRecipient: player.giftRecipient
        });
      }
    }
  });
};

const handleAddPlayer = (player: Player) => {
  players.value.push(player)
}

const handleRemovePlayer = (index: number) => {
  players.value.splice(index, 1)
}
</script>

<template>
  <div class="centered-container">
    <div class="square-content">
      <div class="config-section">
        <ManaSelector v-model:min="min" v-model:max="max"/>
        <PlayerAdder @add-player="handleAddPlayer"/>
        <PlayerList :players="players" @remove-player="handleRemovePlayer"/>

        <div class="debug-toggle">
          <label>
            <input type="checkbox" v-model="showDebug"/>
            Show Debug Output
          </label>
        </div>

        <button @click="assignManaAndGifts" :disabled="players.length < 2">
          Assign Colors & Gifts
        </button>

        <div v-if="debugInfo && showDebug" class="debug-output">
          <h3>Debug Output</h3>
          <div class="assignment-list">
            <p v-for="assignment in debugInfo.assignments" :key="assignment.player" class="assignment-item">
              {{ assignment.player }}, you will build a deck for <strong>{{ assignment.giftRecipient }}</strong> with
              the colors: {{ assignment.colors.join(', ') }}
            </p>
          </div>
          <div class="raw-debug">
            <details>
              <summary>Raw JSON (for reference)</summary>
              <pre>{{ JSON.stringify(debugInfo, null, 2) }}</pre>
            </details>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
}

.square-content {
  width: 85vw;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
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

.debug-output {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #1a1a1a;
  border-radius: 4px;
  max-height: 400px;
  overflow-y: auto;
}

.debug-output h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #42b983;
}

.assignment-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.assignment-item {
  margin: 0;
  padding: 0.5rem;
  background-color: #2a2a2a;
  border-radius: 4px;
  line-height: 1.5;
}

.assignment-item strong {
  color: #42b983;
}

.raw-debug {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #333;
}

.raw-debug summary {
  cursor: pointer;
  color: #42b983;
  font-size: 0.9rem;
}

.raw-debug pre {
  margin-top: 0.5rem;
  font-size: 0.9rem;
}
</style>