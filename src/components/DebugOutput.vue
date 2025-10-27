<script setup lang="ts">
import type { ManaColor } from '../types/player'

interface Assignment {
  player: string
  colors: ManaColor[]
  giftRecipient: string
}

interface DebugInfo {
  timestamp: string
  minColors: number
  maxColors: number
  assignments: Assignment[]
}

defineProps<{
  debugInfo: DebugInfo | null
  showDebug: boolean
}>()

defineEmits<{
  'update:showDebug': [value: boolean]
}>()
</script>

<template>
  <div class="debug-section">
    <div class="debug-toggle">
      <label>
        <input
          type="checkbox"
          :checked="showDebug"
          @change="$emit('update:showDebug', ($event.target as HTMLInputElement).checked)"
        />
        Show Debug Output
      </label>
    </div>

    <div v-if="debugInfo && showDebug" class="debug-output">
      <h3>Debug Output</h3>
      <div class="assignment-list">
        <p
          v-for="assignment in debugInfo.assignments"
          :key="assignment.player"
          class="assignment-item"
        >
          {{ assignment.player }}, you will build a deck for
          <strong>{{ assignment.giftRecipient }}</strong> with the colors:
          {{ assignment.colors.join(', ') }}
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
</template>

<style scoped>
.debug-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.debug-toggle label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.debug-output {
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