<template>
  <NCard
    :title="name"
    hoverable
    class="rounded-xl w-40 md:w-56 p-2 font-bold m-2"
    header-class="!pt-2 !pb-0 !px-2"
    footer-class="!pb-0 !px-2"
  >
    <template #cover>
      <NImage preview-disabled lazy :src="url" class="rounded-lg" />
    </template>
    <template #footer>
      {{ nameHiragana }}
    </template>
  </NCard>
</template>

<style scoped></style>

<script setup lang="ts">
import { NCard, NImage } from 'naive-ui'
defineProps<{
  name: string
  nameHiragana: string
  url: string
}>()
</script>
