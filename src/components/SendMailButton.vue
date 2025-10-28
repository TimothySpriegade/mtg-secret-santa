<script setup lang="ts">
import { ref } from 'vue'
import { EmailSender } from '../composables/useEmailSender.ts'
import type { Player } from '../types/player'

interface Props {
  players: Player[]
  hasAssignments: boolean
}

const props = defineProps<Props>()

const isSending = ref(false)
const error = ref<string | null>(null)
const success = ref(false)

const handleClick = async () => {
  if (!props.hasAssignments || props.players.length < 2) return

  isSending.value = true
  error.value = null
  success.value = false

  try {
    const emailSender = new EmailSender()

    const assignments = props.players
      .filter(player => player.giftRecipient)
      .map(player => ({
        player,
        recipient: props.players.find(p => p.name === player.giftRecipient)!
      }))

    await emailSender.sendBulkEmails(assignments)

    success.value = true
    console.log('All emails sent successfully')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to send emails'
    console.error('Email sending failed:', err)
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <div>
    <button
        @click="handleClick"
        :disabled="!hasAssignments || players.length < 2 || isSending"
        class="send-button"
    >
      <svg v-if="!isSending" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2">
        <path d="M22 2L11 13"></path>
        <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
      </svg>
      <span v-if="isSending">Sending...</span>
      <span v-else>Send Assignments</span>
    </button>
    <p v-if="error" class="error-message">{{ error }}</p>
    <p v-if="success" class="success-message">Emails sent successfully!</p>
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

.error-message {
  color: #ef4444;
  margin-top: 0.5rem;
  font-size: 0.875rem;
}

.success-message {
  color: #10b981;
  margin-top: 0.5rem;
  font-size: 0.875rem;
}
</style>