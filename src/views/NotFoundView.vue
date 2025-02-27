<template>
  <NResult status="404" title="404 " description="not found">
    <template #footer>
      <RouterLink :to="{ name: 'home' }"> <NButton>back to Home</NButton> </RouterLink>
    </template>
  </NResult>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { NResult, NButton } from 'naive-ui'
</script>
