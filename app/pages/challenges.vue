<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('active')

const tabs = [
  { label: 'Active', key: 'active' },
  { label: 'Upcoming', key: 'upcoming' },
  { label: 'Completed', key: 'completed' }
]

const challenges = [
  {
    id: 1,
    title: 'Speed Coder: Vue Edition',
    description: 'Build a fully functional to-do app in less than 30 minutes using the Composition API.',
    rewardXP: 50,
    rewardBadge: 'Speed Demon',
    timeLeft: '3 Days Left',
    progress: 2,
    total: 3,
    status: 'active',
    iconBg: 'bg-cyan-500/10 dark:bg-cyan-400/10',
    iconText: 'text-cyan-600 dark:text-cyan-400',
    borderGlow: 'group-hover:border-cyan-500/20'
  },
  {
    id: 2,
    title: 'UI Master: Flexbox Layouts',
    description: 'Recreate a complex dashboard layout using only CSS flexbox properties. No grid allowed!',
    rewardXP: 100,
    rewardBadge: null,
    timeLeft: '5 Days Left',
    progress: 1,
    total: 5,
    status: 'active',
    iconBg: 'bg-purple-500/10 dark:bg-purple-400/10',
    iconText: 'text-purple-600 dark:text-purple-400',
    borderGlow: 'group-hover:border-purple-500/20'
  },
  {
    id: 3,
    title: 'Algorithm Hero: Sorting',
    description: 'Implement Quick Sort and Merge Sort from scratch and benchmark their performance.',
    rewardXP: 150,
    rewardBadge: 'Algorithm Master',
    timeLeft: '12 Days Left',
    progress: 0,
    total: 5,
    status: 'upcoming',
    iconBg: 'bg-blue-500/10 dark:bg-blue-400/10',
    iconText: 'text-blue-600 dark:text-blue-400',
    borderGlow: 'group-hover:border-blue-500/20'
  },
  {
    id: 4,
    title: 'Backend Basics: JWT Auth',
    description: 'Set up a secure Node.js backend with JWT authentication and secure cookie storage.',
    rewardXP: 200,
    rewardBadge: 'Secure Auth',
    timeLeft: 'Starts next week',
    progress: 0,
    total: 8,
    status: 'upcoming',
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-400/10',
    iconText: 'text-emerald-600 dark:text-emerald-400',
    borderGlow: 'group-hover:border-emerald-500/20'
  },
   {
    id: 5,
    title: 'CSS Battle: Neon Glow',
    description: 'Create a glowing neon button effect without using images or SVG filters.',
    rewardXP: 25,
    rewardBadge: 'Neon Artist',
    timeLeft: 'Ended',
    progress: 1,
    total: 1,
    status: 'completed',
    iconBg: 'bg-amber-500/10 dark:bg-amber-400/10',
    iconText: 'text-amber-600 dark:text-amber-400',
    borderGlow: 'group-hover:border-amber-500/20'
  }
]
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-8">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800/50">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white capitalize">Challenges</h1>
        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Push your limits with timed missions and earn massive XP and exclusive badges.</p>
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

    <!-- Challenges Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <template v-for="challenge in challenges" :key="challenge.id">
        <UCard 
          v-if="challenge.status === activeTab"
          :class="['flex flex-col h-full bg-white dark:bg-[#0A1220] border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300 relative group', 
            challenge.status === 'completed' ? 'opacity-70 grayscale hover:grayscale-0 transition-all duration-500' : 'hover:-translate-y-1 hover:shadow-lg'
          ]"
          :ui="{ body: 'flex-1 flex flex-col p-6', ring: 'ring-1 ring-slate-200 dark:ring-slate-800' }"
        >
          <!-- Top Row: Icon & Time Left -->
          <div class="flex justify-between items-start mb-6">
             <div class="flex items-center gap-4">
                <div :class="['h-12 w-12 rounded-xl flex items-center justify-center shrink-0', challenge.iconBg, challenge.iconText]">
                  <UIcon name="i-lucide-target" class="w-6 h-6" />
                </div>
                <div>
                   <h3 class="text-xl font-bold text-slate-900 dark:text-white">{{ challenge.title }}</h3>
                   <div class="flex flex-wrap items-center gap-3 mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                      <span class="flex items-center gap-1">
                          <UIcon name="i-lucide-zap" :class="[challenge.iconText, 'w-4 h-4']" />
                          <span :class="[challenge.iconText, 'font-bold']">+{{ challenge.rewardXP }} XP</span>
                      </span>
                      <span v-if="challenge.rewardBadge" class="flex items-center gap-1 pl-3 border-l border-slate-300 dark:border-slate-700">
                          <UIcon name="i-lucide-award" class="text-amber-500 w-4 h-4" />
                          <span>{{ challenge.rewardBadge }}</span>
                      </span>
                   </div>
                </div>
             </div>
             
             <UBadge 
                :color="challenge.status === 'active' ? 'primary' : challenge.status === 'upcoming' ? 'neutral' : 'success'" 
                variant="subtle" 
                size="sm"
                class="whitespace-nowrap ml-4"
              >
                {{ challenge.timeLeft }}
              </UBadge>
          </div>

          <!-- Description -->
          <p class="text-slate-600 dark:text-slate-400 mb-8 flex-1">
             {{ challenge.description }}
          </p>

          <!-- Progress or Call to Action -->
          <div v-if="challenge.status === 'active'" class="flex flex-col gap-3">
             <div class="flex justify-between text-sm font-semibold">
                <span class="text-slate-900 dark:text-white">Milestones</span>
                <span class="text-slate-500">{{ challenge.progress }} / {{ challenge.total }}</span>
             </div>
             <UMeter 
                :value="(challenge.progress / challenge.total) * 100" 
                size="sm" 
              />
              <UButton 
                block 
                color="primary"
                variant="solid" 
                class="mt-4 font-bold"
              >
                Continue Challenge
              </UButton>
          </div>

          <div v-else-if="challenge.status === 'upcoming'" class="mt-auto">
             <UButton block color="neutral" variant="soft" class="font-bold">Remind Me</UButton>
          </div>

           <div v-else class="mt-auto">
             <UButton block color="neutral" variant="ghost" class="font-bold pointer-events-none">Challenge Completed</UButton>
          </div>
          
          <!-- Hover Effect Border -->
          <div v-if="challenge.status === 'active'" :class="['absolute inset-0 rounded-xl border-2 border-transparent transition-colors duration-300 pointer-events-none', challenge.borderGlow]"></div>
        </UCard>
      </template>
    </div>
  </div>
</template>
