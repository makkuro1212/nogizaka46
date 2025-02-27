<template>
  <NBackTop></NBackTop>
  <div class="flex flex-wrap" id="members">
    <RouterLink
      v-for="member in members"
      :key="member.link"
      :to="{
        name: 'diary',
        params: { romaji: member.link },
      }"
    >
      <MemberProfile
        :name="member.name"
        :nameHiragana="member.nameHiragana"
        :url="'/diary/' + member.url"
      ></MemberProfile>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import MemberProfile from '@/components/MemberProfile.vue'
import { Get } from '@/libs/http'
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { NBackTop } from 'naive-ui'
import type { Member } from '@/libs/model'

const members = reactive<Member[]>([])

Get<Member[]>('memberlist.json')
  .then((data) => {
    Object.assign(members, data)
  })
  .catch((error) => {
    console.error('Failed to load JSON', error)
  })
</script>
