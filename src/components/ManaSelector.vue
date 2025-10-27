<script setup lang="ts">
import { ref } from 'vue'

const min = defineModel<number>('min', { default: 1 })
const max = defineModel<number>('max', { default: 1 })
const options = [1, 2, 3, 4, 5]
</script>

<template>
  <div class="config-container">
    <div class="input-group">
      <label for="min">Minimum Mana</label>
      <select id="min" v-model="min" class="select-input">
        <option v-for="opt in options" :key="opt" :value="opt">
          {{ opt }}
        </option>
      </select>
    </div>

    <div class="input-group">
      <label for="max">Maximum Mana</label>
      <select id="max" v-model="max" class="select-input">
        <option v-for="opt in options" :key="opt" :value="opt">
          {{ opt }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.config-container {
  display: flex;
  gap: 2rem;
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

.select-input {
  padding: 0.625rem 2.5rem 0.625rem 1rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background-color: white;
  color: #000000;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23374151' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.select-input:hover {
  border-color: #9ca3af;
}

.select-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>