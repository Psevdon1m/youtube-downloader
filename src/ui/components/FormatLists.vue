<template>
  <ul v-if="formats.length" @click="formatSelected">
    <li v-for="format in formats" :key="format.id" :data-itag="format.id">
      {{ format.resolution }} | {{ getSizeInMb(format.filesize) }} |
      {{ format.ext }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { FormatInfo } from "../utils/VideoAndAudioExtrator";
const { formats } = defineProps<{
  formats: FormatInfo[];
}>();
const emit = defineEmits<{
  (event: "format-selected", payload: { itag: string }): void;
}>();

const getSizeInMb = (bytes: number | null) => {
  if (!bytes) return `0 Mb`;
  let mb = Math.floor(bytes / 1024 / 1024);
  let gb = Number((mb / 1024).toFixed(2));
  if (gb >= 1) {
    return `${gb}Gb`;
  } else {
    return `${mb}Mb`;
  }
};

const formatSelected = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const li = target.closest("li");

  if (li && li.dataset.itag && li.dataset.ext) {
    const itag = li.dataset.itag;

    emit("format-selected", { itag });
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

li {
  padding: 10px 15px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s ease;
  user-select: none;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #f0f0f0;
}

li:active {
  background-color: #d0d0d0;
}
</style>
