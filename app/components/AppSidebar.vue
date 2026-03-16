<script setup lang="ts">
const items = [
  {
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
    to: '/'
  },
  {
    label: 'Courses',
    icon: 'i-lucide-book-open',
    to: '/courses'
  },
  {
    label: 'Badges',
    icon: 'i-lucide-award',
    to: '/badges'
  },
  {
    label: 'Challenges',
    icon: 'i-lucide-target',
    to: '/challenges'
  },
  {
    label: 'Community',
    icon: 'i-lucide-users',
    to: '/community'
  },
  {
    label: 'Leaderboard',
    icon: 'i-lucide-trophy',
    to: '/leaderboard'
  },
  {
    label: 'Settings',
    icon: 'i-lucide-settings',
    to: '/settings'
  }
]
</script>

<template>
  <aside class="w-64 flex-shrink-0 min-h-screen border-r border-slate-800 bg-[#050C16] p-4 flex flex-col gap-8">
    <div class="flex items-center gap-3 px-2">
      <div class="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
        <UIcon name="i-lucide-shield" class="w-5 h-5" />
      </div>
      <span class="font-bold tracking-tight text-white uppercase text-sm">Praetoria Learning</span>
    </div>

    <UNavigationMenu orientation="vertical" :items="items" class="flex-1" />
  </aside>
</template>
