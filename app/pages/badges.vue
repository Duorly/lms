<script setup lang="ts">
import { ref, computed } from 'vue'

const activeTab = ref('all')

const tabs = [
  { label: 'All Badges', key: 'all' },
  { label: 'Unlocked', key: 'unlocked' },
  { label: 'Locked', key: 'locked' }
]

const badges = [
  {
    id: 1,
    name: 'First Lesson',
    description: 'Complete your very first lesson on the platform.',
    icon: 'i-lucide-star',
    tier: 'Bronze',
    unlocked: true,
    unlockedAt: '2023-10-15',
    iconBg: 'bg-amber-500/10 dark:bg-amber-400/10',
    iconText: 'text-amber-600 dark:text-amber-400',
    borderGlow: 'group-hover:border-amber-500/30'
  },
  {
    id: 2,
    name: '7-Day Streak',
    description: 'Log in and learn for 7 consecutive days.',
    icon: 'i-lucide-flame',
    tier: 'Silver',
    unlocked: true,
    unlockedAt: '2023-11-02',
    iconBg: 'bg-slate-400/10 dark:bg-slate-300/10',
    iconText: 'text-slate-600 dark:text-slate-300',
    borderGlow: 'group-hover:border-slate-400/30'
  },
  {
    id: 3,
    name: 'Code Warrior',
    description: 'Complete 10 interactive coding challenges.',
    icon: 'i-lucide-swords',
    tier: 'Gold',
    unlocked: true,
    unlockedAt: '2023-12-10',
    iconBg: 'bg-yellow-500/10 dark:bg-yellow-400/10',
    iconText: 'text-yellow-600 dark:text-yellow-400',
    borderGlow: 'group-hover:border-yellow-500/30'
  },
  {
    id: 4,
    name: 'Master Architect',
    description: 'Finish the advanced Vue.js architecture path.',
    icon: 'i-lucide-building-2',
    tier: 'Platinum',
    unlocked: false,
    unlockedAt: null,
    iconBg: 'bg-violet-500/10 dark:bg-violet-400/10',
    iconText: 'text-violet-600 dark:text-violet-400',
    borderGlow: 'group-hover:border-violet-500/30'
  },
  {
    id: 5,
    name: 'Social Butterfly',
    description: 'Help 5 different students in community forums.',
    icon: 'i-lucide-message-circle-heart',
    tier: 'Bronze',
    unlocked: false,
    unlockedAt: null,
    iconBg: 'bg-amber-500/10 dark:bg-amber-400/10',
    iconText: 'text-amber-600 dark:text-amber-400',
    borderGlow: 'group-hover:border-amber-500/30'
  },
  {
    id: 6,
    name: 'Speed Demon',
    description: 'Solve a timed challenge with 50% time remaining.',
    icon: 'i-lucide-timer',
    tier: 'Silver',
    unlocked: false,
    unlockedAt: null,
    iconBg: 'bg-slate-400/10 dark:bg-slate-300/10',
    iconText: 'text-slate-600 dark:text-slate-300',
    borderGlow: 'group-hover:border-slate-400/30'
  },
  {
    id: 7,
    name: 'Bug Hunter',
    description: 'Identify and fix 20 intentional bugs in practice repos.',
    icon: 'i-lucide-bug',
    tier: 'Gold',
    unlocked: true,
    unlockedAt: '2024-01-22',
    iconBg: 'bg-yellow-500/10 dark:bg-yellow-400/10',
    iconText: 'text-yellow-600 dark:text-yellow-400',
    borderGlow: 'group-hover:border-yellow-500/30'
  },
  {
    id: 8,
    name: 'Data Sci Prodigy',
    description: 'Rank Top 10 in a Data Science Hackathon.',
    icon: 'i-lucide-brain-circuit',
    tier: 'Platinum',
    unlocked: false,
    unlockedAt: null,
    iconBg: 'bg-violet-500/10 dark:bg-violet-400/10',
    iconText: 'text-violet-600 dark:text-violet-400',
    borderGlow: 'group-hover:border-violet-500/30'
  },
  {
    id: 9,
    name: 'Open Source Contributor',
    description: 'Merge 5 pull requests into public community repositories.',
    icon: 'i-lucide-git-merge',
    tier: 'Diamond',
    unlocked: true,
    unlockedAt: '2024-02-14',
    iconBg: 'bg-fuchsia-500/10 dark:bg-fuchsia-400/10',
    iconText: 'text-fuchsia-600 dark:text-fuchsia-400',
    borderGlow: 'group-hover:border-fuchsia-500/30'
  }
]

const filteredBadges = computed(() => {
  if (activeTab.value === 'unlocked') {
    return badges.filter(b => b.unlocked)
  }
  if (activeTab.value === 'locked') {
    return badges.filter(b => !b.unlocked)
  }
  return badges
})

const formatDate = (dateString: string | null) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-8">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800/50">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white capitalize">Achievements</h1>
        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Track your progress and unlock prestigious badges as you learn.</p>
      </div>

      <div class="flex gap-2 p-1 bg-slate-100 dark:bg-[#0A1220] rounded-xl border border-slate-200 dark:border-slate-800 w-fit">
        <button 
          v-for="tab in tabs" 
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-lg transition-all',
            activeTab === tab.key 
              ? 'bg-white dark:bg-[#1A2332] text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-700' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Stats Overview (Optional, adds premium feel) -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white dark:bg-[#0A1220] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center">
        <span class="text-3xl font-bold text-slate-900 dark:text-white">{{ badges.filter(b => b.unlocked).length }}</span>
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1">Unlocked</span>
      </div>
      <div class="bg-white dark:bg-[#0A1220] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center">
        <span class="text-3xl font-bold text-slate-900 dark:text-white">{{ badges.filter(b => b.tier === 'Platinum').length }}</span>
        <span class="text-xs font-semibold uppercase tracking-wider text-violet-500 mt-1">Platinum Tier</span>
      </div>
       <div class="bg-white dark:bg-[#0A1220] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center">
        <span class="text-3xl font-bold text-slate-900 dark:text-white">{{ badges.filter(b => b.tier === 'Gold').length }}</span>
        <span class="text-xs font-semibold uppercase tracking-wider text-yellow-500 mt-1">Gold Tier</span>
      </div>
      <div class="bg-white dark:bg-[#0A1220] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center">
        <span class="text-3xl font-bold text-slate-900 dark:text-white">{{ badges.length }}</span>
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1">Total Badges</span>
      </div>
    </div>

    <!-- Badges Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        v-for="badge in filteredBadges" 
        :key="badge.id"
        :class="[
          'relative group overflow-hidden rounded-2xl bg-white dark:bg-[#0A1220] border border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center text-center transition-all duration-300',
          badge.unlocked ? 'hover:-translate-y-1 hover:shadow-lg' : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100'
        ]"
      >
        <!-- Icon Hexagon / Wrapper -->
        <div class="relative w-24 h-24 mb-6 flex items-center justify-center">
          <!-- Background Glow Effect behind the icon -->
          <div :class="['absolute inset-0 rounded-full blur-xl opacity-20 transition-opacity duration-300 group-hover:opacity-40', badge.unlocked ? badge.iconBg : 'bg-slate-500']"></div>
          
          <!-- Outer border -->
          <div :class="['absolute inset-0 rounded-full border-2 flex items-center justify-center transition-colors duration-300', badge.unlocked ? 'border-dashed border-slate-300 dark:border-slate-700' : 'border-dotted border-slate-200 dark:border-slate-800']">
            <!-- Inner Icon Background -->
            <div :class="['w-16 h-16 rounded-full flex items-center justify-center shadow-inner z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6', badge.unlocked ? badge.iconBg : 'bg-slate-100 dark:bg-slate-900']">
              <UIcon :name="badge.icon" :class="['w-8 h-8', badge.unlocked ? badge.iconText : 'text-slate-400']" />
            </div>
          </div>

           <!-- Lock overlay for locked items -->
           <div v-if="!badge.unlocked" class="absolute -bottom-2 right-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-white rounded-full p-1 border-2 border-white dark:border-[#0A1220] z-20">
             <UIcon name="i-lucide-lock" class="w-3.5 h-3.5" />
           </div>
        </div>

        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">{{ badge.name }}</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-3">{{ badge.description }}</p>

        <!-- Tier & Date Badge -->
        <div class="mt-auto w-full flex items-center justify-between">
           <span :class="['text-xs font-bold uppercase tracking-wider', 
                badge.tier === 'Bronze' ? 'text-amber-600 dark:text-amber-500' : 
                badge.tier === 'Silver' ? 'text-slate-600 dark:text-slate-400' : 
                badge.tier === 'Gold' ? 'text-yellow-600 dark:text-yellow-400' : 
                badge.tier === 'Platinum' ? 'text-violet-600 dark:text-violet-400' : 
                'text-fuchsia-600 dark:text-fuchsia-400'
           ]">
             {{ badge.tier }}
           </span>

           <span v-if="badge.unlocked" class="text-xs font-medium text-slate-400">
             {{ formatDate(badge.unlockedAt) }}
           </span>
        </div>

        <!-- Hover dynamic border -->
        <div :class="['absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 pointer-events-none', badge.unlocked ? badge.borderGlow : 'group-hover:border-slate-500/30']"></div>
      </div>
    </div>
  </div>
</template>
