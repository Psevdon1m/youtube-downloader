<script setup lang="ts">
import { extractBestAudioAndVideo } from "../utils/VideoAndAudioExtrator";
import type {
  ExtractedFormats,
  FormatInfo,
} from "../utils/VideoAndAudioExtrator";
usePageStore().pageData.title = "Home";
const url = ref("");
const status = ref("");
const formats = ref<ExtractedFormats | {}>();
const selectedFormat = ref("");
const download = async () => {
  if (url.value) {
    status.value = "Downloading...";
    try {
      let result = await window.electronAPI.downloadVideo(
        url.value,
        selectedFormat.value
      );
      console.log("result: ", result);

      status.value = "Download complete!";
    } catch (err) {
      status.value = "Error: " + err;
    }
  } else {
    status.value = "Please enter a valid YouTube URL";
  }
};
const handleUrlChange = async (url: string) => {
  if (url.length) {
    let rawData = await window.electronAPI.getVideoFormats(url);

    const parsedData = extractBestAudioAndVideo(rawData);

    formats.value = parsedData;
  } else {
    formats.value = {};
  }
};

const updateSelectedFormat = (format: string) => {
  if (formats.value && "audio" in formats.value) {
    selectedFormat.value =
      format.toString() + "+" + formats.value.audio.id.toString();
  } else {
    selectedFormat.value = format;
  }
};

const getAvailableFormats = computed((): FormatInfo[] => {
  if (formats.value && "video" in formats.value) {
    let res = Object.values(formats.value.video);
    console.log({ res });
    return res;
  }

  return [];
});

watch(url, (newVal) => {
  handleUrlChange(newVal);
});
</script>

<template>
  <div class="home">
    <h1>YouTube Downloader</h1>
    <input v-model="url" placeholder="Paste YouTube URL..." />
    <FormatLists
      :formats="getAvailableFormats"
      @format-selected="updateSelectedFormat"
    />
    <button @click="download">Download</button>
    <p v-if="status">{{ status }}</p>
  </div>
</template>
