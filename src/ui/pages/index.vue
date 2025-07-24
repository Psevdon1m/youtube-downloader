<script setup lang="ts">
import { extractBestAudioAndVideo } from "../utils/VideoAndAudioExtrator";
import { useDebounceFn } from "@vueuse/core";
import type {
  ExtractedFormats,
  FormatInfo,
} from "../utils/VideoAndAudioExtrator";
usePageStore().pageData.title = "Home";
const url = ref("");
const status = ref("");
const formats = ref<ExtractedFormats | {}>();
const selectedFormat = ref("");
const isDownloading = ref(false);

const download = async () => {
  if (url.value) {
    status.value = "Downloading...";
    isDownloading.value = true;
    try {
      let result = await window.electronAPI.downloadVideo(
        url.value,
        selectedFormat.value
      );

      isDownloading.value = false;
      selectedFormat.value = "";
      status.value = "Download complete!";
    } catch (err) {
      isDownloading.value = false;
      status.value = "Error: " + err;
    }
  } else {
    status.value = "Please enter a valid YouTube URL";
  }
};
const handleUrlChange = async (url: string) => {
  if (url.length) {
    try {
      let rawData = await window.electronAPI.getVideoFormats(url);

      const parsedData = extractBestAudioAndVideo(rawData);

      formats.value = parsedData;
      status.value = "Please select a format to download";
    } catch (error) {
      status.value = `Error: ${error}`;
    }
  } else {
    formats.value = {};
  }
};

const debounceUrlChange = useDebounceFn((url) => handleUrlChange(url), 500);

const updateSelectedFormat = ({ itag }: { itag: string }) => {
  if (formats.value && "audio" in formats.value) {
    selectedFormat.value =
      itag.toString() + "+" + formats.value.audio.id.toString();
  } else {
    selectedFormat.value = itag;
  }
  status.value = "";
};

const getAvailableFormats = computed((): FormatInfo[] => {
  if (formats.value && "video" in formats.value) {
    let res = Object.values(formats.value.video);

    return res;
  }

  return [];
});

watch(url, (newVal, oldVal) => {
  if (isDownloading.value && newVal !== oldVal) {
    status.value =
      "Downloading in process, please wait till first video is processed.";
    url.value = oldVal;
    return;
  }
  if (newVal && newVal.includes("https://") && newVal.includes("youtube")) {
    formats.value = {};
    status.value = "Fetching available formats...";
    debounceUrlChange(newVal);
  } else {
    status.value = "Enter a valid link";
  }
});
</script>

<template>
  <div class="home">
    <h1>YouTube Downloader</h1>
    <input
      v-model="url"
      placeholder="Paste YouTube URL..."
      class="main-input"
    />
    <FormatLists
      :formats="getAvailableFormats"
      @format-selected="updateSelectedFormat"
    />
    <button v-if="selectedFormat && !isDownloading" @click="download">
      Download
    </button>
    <p v-if="status">{{ status }}</p>
  </div>
</template>

<style scoped>
.main-input {
  width: 100%;
  max-width: 400px;
  display: block;
  margin: 0 auto 1.5em auto;
  padding: 1em 1.2em;
  font-size: 1.1em;
  border-radius: 8px;
  border: 1.5px solid #d1d5db;
  background: #fff;
  color: #232323;
  box-shadow: 0 1px 6px #0001;
  outline: none;
}
.main-input:focus {
  border-color: #4a6cff;
  background: #f0f1f5;
}
@media (prefers-color-scheme: dark) {
  .main-input {
    background: #232323;
    color: #fafafa;
    border: 1.5px solid #444;
  }
  .main-input:focus {
    background: #2d2d2d;
    border-color: #4a6cff;
  }
}
</style>
