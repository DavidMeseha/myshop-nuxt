<template>
  <div class="error-container">
    <h1>Server Maintenance</h1>
    <p>
      My server bill could not be verified, The server is currently down, please
      try again later. Thank you for your understanding!
    </p>
    <button @click="handleRetry">Retry</button>
  </div>
</template>

<script setup>
const handleRetry = () => {
  window.location.reload();
};
</script>

<style>
.error-container {
  text-align: center;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}
</style>
