<template>
  <div class="loading">Loading...</div>
</template>

<style scoped>
.loading {
  position: fixed;
  z-index: 100000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  background: rgba(0, 0, 0, 0.90);
}
</style>