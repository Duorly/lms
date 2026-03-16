<script setup lang="ts">
import { ref, computed } from 'vue'

const activeLeague = ref('global')

const leagues = [
  { label: 'Global Ranking', key: 'global' },
  { label: 'My Cohort', key: 'cohort' },
  { label: 'Friends', key: 'friends' }
]

const currentUser = { id: 99, name: 'Alex R.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', xp: 8450, rank: 42, role: 'Student', trend: 'up' }

const users = [
  { id: 1, name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?u=sarah', xp: 14200, role: 'Mentor', trend: 'up' },
  { id: 2, name: 'David Kim', avatar: 'https://i.pravatar.cc/150?u=david', xp: 12850, role: 'Pro', trend: 'same' },
  { id: 3, name: 'Emily Watson', avatar: 'https://i.pravatar.cc/150?u=emily', xp: 11900, role: 'Pro', trend: 'up' },
  { id: 4, name: 'James Wilson', avatar: 'https://i.pravatar.cc/150?u=james', xp: 10500, role: 'Student', trend: 'down' },
  { id: 5, name: 'Sophia Lee', avatar: 'https://i.pravatar.cc/150?u=sophia', xp: 9800, role: 'Student', trend: 'up' },
  { id: 6, name: 'Lucas Scott', avatar: 'https://i.pravatar.cc/150?u=lucas', xp: 9550, role: 'Student', trend: 'up' },
  { id: 7, name: 'Mia Martinez', avatar: 'https://i.pravatar.cc/150?u=mia', xp: 9100, role: 'Student', trend: 'same' },
  { id: 8, name: 'Elias Thorne', avatar: 'https://i.pravatar.cc/150?u=elias', xp: 8900, role: 'Student', trend: 'down' },
  { id: 9, name: 'Olivia Brown', avatar: 'https://i.pravatar.cc/150?u=olivia', xp: 8600, role: 'Student', trend: 'up' },
  currentUser
].sort((a, b) => b.xp - a.xp).map((u, index) => ({ ...u, rank: index + 1 }))

const getRankColor = (rank: number) => {
  if (rank === 1) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-500/10'
  if (rank === 2) return 'text-slate-600 dark:text-slate-300 bg-slate-500/10'
  if (rank === 3) return 'text-amber-700 dark:text-amber-500 bg-amber-500/10'
  return 'text-slate-600 dark:text-slate-400 bg-transparent'
}

const getRankIcon = (rank: number) => {
  if (rank === 1) return 'i-lucide-trophy'
  if (rank === 2) return 'i-lucide-award'
  if (rank === 3) return 'i-lucide-medal'
  return null
}
</script>

<template>
  <div class="max-w-5xl mx-auto">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800/50 mb-8">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white capitalize">Leaderboard</h1>
        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">See how you stack up against top learners globally and within your cohort.</p>
      </div>

       <div class="flex gap-2 p-1 bg-slate-100 dark:bg-[#0A1220] rounded-xl border border-slate-200 dark:border-slate-800 w-fit">
        <button 
          v-for="league in leagues" 
          :key="league.key"
          @click="activeLeague = league.key"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-lg transition-all',
            activeLeague === league.key 
              ? 'bg-white dark:bg-[#1A2332] text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-700' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
          ]"
        >
          {{ league.label }}
        </button>
      </div>
    </div>

    <!-- Leaderboard Card -->
    <UCard class="bg-white dark:bg-[#0A1220] border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden" :ui="{ body: 'p-0 sm:p-0', ring: 'ring-1 ring-slate-200 dark:ring-slate-800' }">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr class="bg-slate-50 dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800">
              <th class="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider w-24 text-center">Rank</th>
              <th class="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Learner</th>
              <th class="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">XP Earned</th>
              <th class="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center w-24">Trend</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800/50">
            <tr 
              v-for="user in users" 
              :key="user.id" 
              :class="[
                'transition-all duration-300 group cursor-pointer relative', 
                user.id === currentUser.id ? 'bg-violet-50/50 dark:bg-violet-900/20' : 'hover:bg-slate-50 dark:hover:bg-[#121E32]'
              ]"
            >
              <!-- Rank -->
              <td class="py-4 px-6 text-center relative">
                <!-- Tech hover line -->
                <div class="absolute inset-y-0 left-0 w-1 bg-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
                
                <div :class="['inline-flex items-center justify-center w-8 h-8 rounded-full font-bold transition-transform group-hover:scale-110', getRankColor(user.rank)]">
                  <UIcon v-if="getRankIcon(user.rank)" :name="getRankIcon(user.rank)!" class="w-5 h-5" />
                  <span v-else>{{ user.rank }}</span>
                </div>
              </td>
              
              <!-- User Info -->
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="relative">
                    <UAvatar :src="user.avatar" :alt="user.name" size="md" class="group-hover:ring-2 ring-violet-500/50 transition-all duration-300" />
                    <div v-if="user.id === currentUser.id" class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-violet-500 border-2 border-white dark:border-[#0A1220] rounded-full shadow-[0_0_5px_rgba(6,182,212,0.8)]"></div>
                  </div>
                  <div>
                    <div class="font-bold text-slate-900 dark:text-white flex items-center gap-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {{ user.name }}
                      <span v-if="user.id === currentUser.id" class="text-xs font-medium px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800">You</span>
                    </div>
                    <div class="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">{{ user.role }}</div>
                  </div>
                </div>
              </td>

              <!-- XP Points -->
              <td class="py-4 px-6 text-right font-bold text-slate-700 dark:text-slate-300">
                {{ user.xp.toLocaleString() }} <span class="text-xs font-normal text-slate-400">XP</span>
              </td>

              <!-- Trend Arrow -->
              <td class="py-4 px-6 text-center">
                <UIcon 
                  v-if="user.trend === 'up'" 
                  name="i-lucide-arrow-up-right" 
                  class="w-5 h-5 text-emerald-500 inline-block" 
                />
                 <UIcon 
                  v-else-if="user.trend === 'down'" 
                  name="i-lucide-arrow-down-right" 
                  class="w-5 h-5 text-red-500 inline-block" 
                />
                 <UIcon 
                  v-else 
                  name="i-lucide-minus" 
                  class="w-5 h-5 text-slate-400 inline-block" 
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Current User Fixed Bottom (Simulated if they were not in top 10) -->
      <div v-if="currentUser.rank > 10" class="border-t-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0F172A] px-6 py-4 flex items-center justify-between">
         <div class="flex items-center gap-6">
             <div class="text-slate-600 dark:text-slate-400 font-bold w-12 text-center">#{{ currentUser.rank }}</div>
             <div class="flex items-center gap-3">
                <UAvatar :src="currentUser.avatar" :alt="currentUser.name" size="md" />
                <div class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  {{ currentUser.name }}
                  <span class="text-xs font-medium px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">You</span>
                </div>
             </div>
         </div>
         <div class="text-right font-bold text-slate-700 dark:text-slate-300">
             {{ currentUser.xp.toLocaleString() }} <span class="text-xs font-normal text-slate-400">XP</span>
         </div>
      </div>
    </UCard>
  </div>
</template>
