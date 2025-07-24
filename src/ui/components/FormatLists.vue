<template>
  <ul v-if="formats.length" @click="formatSelected">
    <li
      v-for="format in formats"
      :key="format.id"
      :data-itag="format.id"
      :class="{ active: selectedFormat === format.id }"
    >
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
const selectedFormat = ref("");
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

  if (li && li.dataset.itag) {
    const itag = li.dataset.itag;
    selectedFormat.value = itag;
    emit("format-selected", { itag });
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0 auto 1.5em auto;
  max-width: 340px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 8px #0001;
}

li {
  background: #fff;
  color: #232323;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  user-select: none;
  padding: 1.1em 1.5em;
  font-size: 1.08em;
  font-weight: 500;
  border-radius: 0;
  box-shadow: none;
}

li.active {
  background: #232323;
  color: #fafafa;
  border: 1.5px solid #4a6cff;
  box-shadow: 0 2px 8px #0002;
  border-radius: 8px;
  margin: 0.3em 0.5em;
}

li:last-child {
  border-bottom: none;
}

li:hover:not(.active) {
  background: #f5f6fa;
  color: #232323;
}
</style>
