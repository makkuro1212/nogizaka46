<template>
  <NBackTop ref="backToTop"></NBackTop>
  <FloatButton @click="active = !active"></FloatButton>
  <div class="diary-body grid grid-cols-12">
    <div class="diary-menu md:col-span-3 hidden md:block">
      <DiaryMenu placement="right" :items="diaries" @slect-item="handleSelectItem"></DiaryMenu>
    </div>

    <div class="diary-content col-span-12 md:col-span-9 mx-4">
      <div class="post-header max-w-fit border-2 border-purple-600 rounded-md flex">
        <div class="post-time w-32 p-2 bg-purple-600 text-white">
          <span class="year-month block text-sm">
            {{ formattedDate.getFullYear() }} / {{ formattedDate.getMonth() + 1 }}</span
          >
          <span class="date block text-4xl">
            {{ formattedDate.getDate() }}
          </span>
          <span class="week block text-sm">{{
            formattedDate.toLocaleString('en-US', {
              weekday: 'short',
            })
          }}</span>
        </div>
        <div class="post-info min-w-56 md:min-w-96 md:max-w-3xl p-2 text-purple-600 text-left">
          <span class="title block text-xl">{{ diary.title }}</span>
        </div>
      </div>
      <div
        class="post-content mt-12 text-left text-lg"
        v-if="!!diary.title"
        v-html="diary.content"
      ></div>
      <NSkeleton class="post-content mt-12 text-left text-lg" v-else text :repeat="73"></NSkeleton>
    </div>
  </div>
  <NDrawer v-model:show="active" :default-width="300" placement="left" class="diary-menu md:hidden">
    <NDrawerContent
      :native-scrollbar="false"
      :scrollbar-props="{
        themeOverrides: {
          common: {
            scrollbarColor: 'rgba(0, 0, 0, 0)',
          },
        },
      }"
    >
      <DiaryMenu placement="left" :items="diaries" @slect-item="handleSelectItem"></DiaryMenu>
    </NDrawerContent>
  </NDrawer>
</template>

<script setup lang="ts">
import FloatButton from '@/components/FloatButton.vue'
import DiaryMenu from '@/components/DiaryMenu.vue'
import { NDrawer, NDrawerContent, NBackTop, NSkeleton } from 'naive-ui'
import { ref, reactive, useTemplateRef, computed } from 'vue'
import { Get } from '../libs/http'
import type { Diary } from '@/libs/model'

const active = ref(false)
const diary = reactive<Diary>({
  datetime: '1993.02.20 00:00',
  title: '',
  content: '',
  url: '',
})

const formattedDate = computed(() => {
  return new Date(diary.datetime.replace(/\./g, '-'))
})

const diaries = reactive<Diary[]>([])

Get<Diary[]>('result.json')
  .then((data) => {
    Object.assign(diaries, data)
    Object.assign(diary, data[0])
  })
  .catch((error) => {
    console.error('Failed to load JSON', error)
  })

const backToTop = useTemplateRef('backToTop')

const handleSelectItem = (item: Diary) => {
  Object.assign(diary, item)
  active.value = false
  setTimeout(() => {
    if (backToTop.value) {
      backToTop.value.handleClick()
    }
  }, 300)
}
</script>
