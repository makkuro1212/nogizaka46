<template>
  <NFloatButton
    :left="position.left"
    :top="position.top"
    @touchstart.passive="dragItem"
    class="md:hidden"
  >
    <NImage preview-disabled lazy :src="menu" alt="menu" />
  </NFloatButton>
</template>

<script setup lang="ts">
import menu from '@/assets/menu.svg'
import { NFloatButton, NImage } from 'naive-ui'
import { reactive } from 'vue'

const position = reactive({
  left: 40,
  top: 0,
})

const dragItem = (event: TouchEvent) => {
  let offsetX = 0
  let offsetY = 0
  const touch = event.touches[0]
  offsetX = touch.clientX - position.left
  offsetY = touch.clientY - position.top
  const touchmove = (event: TouchEvent) => {
    event.preventDefault()
    const touch = event.touches[0]
    position.left = touch.clientX - offsetX
    position.top = touch.clientY - offsetY
  }
  const touchend = () => {
    document.removeEventListener('touchmove', touchmove)
    document.removeEventListener('touchend', touchend)
  }
  document.addEventListener('touchmove', touchmove, { passive: false })
  document.addEventListener('touchend', touchend)
}
</script>
