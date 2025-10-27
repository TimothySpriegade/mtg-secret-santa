<template>
  <header class="header">
    <img src="../assets/logo.png" alt="MTG Logo" class="logo" />
    <h1 class="title">MTG Secret Santa Generator</h1>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 0;
}

.logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.title {
  font-size: 2rem;
  font-weight: 600;
  color: #e0e0e0;
  margin: 0;
}
</style>