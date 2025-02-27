<template>
  <NTimeline v-if="!!items.length" :item-placement="placement">
    <NTimelineItem
      v-for="(item, index) in items"
      :type="timelineItemType[index % 5]"
      :key="item.url"
      :title="item.title"
      :time="item.datetime"
      @click="$emit('slectItem', item)"
    >
    </NTimelineItem>
  </NTimeline>
  <NTimeline v-else :item-placement="placement">
    <NTimelineItem v-for="index in 73" :type="timelineItemType[index % 5]" :key="index">
      <NSkeleton text></NSkeleton>
    </NTimelineItem>
  </NTimeline>
</template>
<script setup lang="ts">
import { NTimeline, NTimelineItem, NSkeleton } from 'naive-ui'
import type { TimelineProps, TimelineItemProps } from 'naive-ui'
import type { Diary } from '@/libs/model'

const timelineItemType: TimelineItemProps['type'][] = [
  'default',
  'success',
  'info',
  'warning',
  'error',
]

defineProps<{
  placement: TimelineProps['itemPlacement']
  items: Diary[]
}>()
</script>
