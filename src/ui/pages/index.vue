<script setup lang="ts">
usePageStore().pageData.title = "Home";
const url = ref("");
const status = ref("");
const download = async () => {
  if (url.value) {
    status.value = "Downloading...";
    try {
      await window.electronAPI.downloadVideo(url.value);
      status.value = "Download complete!";
    } catch (err) {
      status.value = "Error: " + err;
    }
  } else {
    status.value = "Please enter a valid YouTube URL";
  }
};
</script>

<template>
  <div class="home">
    <h1>YouTube Downloader</h1>
    <input v-model="url" placeholder="Paste YouTube URL..." />
    <button @click="download">Download</button>
    <p v-if="status">{{ status }}</p>
  </div>
</template>
