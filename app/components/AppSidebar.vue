<script setup lang="ts">
import { ref } from 'vue'

const isCollapsed = ref(false)
const isMobileMenuOpen = useState('isMobileMenuOpen', () => false)

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
  <!-- Desktop Sidebar -->
  <aside
    class="hidden lg:flex flex-shrink-0 h-screen border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#050C16] flex-col gap-8 transition-[width,padding] duration-300 relative"
    :class="isCollapsed ? 'w-20 px-3 py-4' : 'w-64 p-4'">
    
    <div class="flex items-center gap-3 overflow-hidden" :class="isCollapsed ? 'justify-center px-0' : 'px-2'">
      <div class="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-600 dark:text-violet-400 shrink-0 transition-transform duration-300"
           :class="isCollapsed ? 'scale-110' : ''">
        <UIcon name="i-lucide-shield" class="w-5 h-5" />
      </div>
      <span 
        v-if="!isCollapsed"
        class="font-bold tracking-tight text-slate-900 dark:text-white uppercase text-sm whitespace-nowrap transition-opacity duration-300">
        Praetoria Learning
      </span>
    </div>

    <UNavigationMenu 
      orientation="vertical" 
      :items="items" 
      :collapsed="isCollapsed"
      class="flex-1 mt-4 transition-all duration-300"
      :ui="{ list: 'space-y-1', link: `py-3 text-sm font-medium transition-colors ${isCollapsed ? 'justify-center' : ''}` }" 
    />

    <!-- Toggle Button -->
    <UButton
      color="neutral"
      variant="ghost"
      :icon="isCollapsed ? 'i-lucide-chevron-right' : 'i-lucide-chevron-left'"
      class="absolute -right-3.5 top-6 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#050C16] hover:bg-slate-50 dark:hover:bg-slate-900 shadow-sm z-10 transition-transform duration-300"
      size="xs"
      square
      @click="isCollapsed = !isCollapsed"
    />
  </aside>

  <!-- Mobile Sidebar -->
  <USlideover v-model:open="isMobileMenuOpen" side="left">
    <template #content>
      <div class="h-full bg-white dark:bg-[#050C16] flex flex-col gap-8 p-4">
        <div class="flex items-center gap-3 px-2">
          <div class="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-600 dark:text-violet-400 shrink-0">
            <UIcon name="i-lucide-shield" class="w-5 h-5" />
          </div>
          <span class="font-bold tracking-tight text-slate-900 dark:text-white uppercase text-sm whitespace-nowrap">
            Praetoria Learning
          </span>
        </div>

        <UNavigationMenu 
          orientation="vertical" 
          :items="items" 
          class="flex-1 mt-4"
          :ui="{ list: 'space-y-1', link: 'py-3 text-sm font-medium transition-colors' }" 
          @click="isMobileMenuOpen = false"
        />
      </div>
    </template>
  </USlideover>
</template>
