<script setup lang="ts">
const modules = [
  { title: 'HTML / CSS Basics', description: 'Master the foundation of the web.', progress: 100, locked: false },
  { title: 'JavaScript Essentials', description: 'Learn core programming concepts.', progress: 40, locked: false },
  { title: 'Advanced Vue.js', description: 'Deep dive into reactive interfaces.', progress: 0, locked: true }
]

const challenges = [
  { title: 'Speed Coder', remaining: '3 Days Left', reward: '+50 XP', progress: 2, total: 3 },
  { title: 'UI Master', remaining: '5 Days Left', reward: '+100 XP', progress: 1, total: 5 }
]

const recentBadges = [
  { title: 'First Lesson', icon: 'i-lucide-star', color: 'primary' },
  { title: '7-Day Streak', icon: 'i-lucide-flame', color: 'orange' },
  { title: 'Quiz Master', icon: 'i-lucide-award', color: 'green' }
]
</script>

<template>
  <div class="flex flex-col gap-8 max-w-6xl mx-auto">
    <!-- Top Stats Area -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <!-- Progress Card (Large) -->
      <UCard class="md:col-span-2 bg-[#0A1220] border-slate-800 relative overflow-hidden ring-1 ring-slate-800 shadow-[0_0_15px_rgba(0,218,255,0.05)]">
        <div class="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div class="h-24 w-24 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30 flex-shrink-0 relative shadow-[0_0_20px_rgba(0,218,255,0.2)]">
            <UIcon name="i-lucide-shield-check" class="w-12 h-12 text-cyan-400" />
            <div class="absolute -bottom-2 bg-cyan-500 text-[#050C16] text-xs font-bold px-2 py-0.5 rounded-full border-2 border-[#0A1220]">
              LVL 5
            </div>
          </div>
          <div class="flex-1 w-full relative z-10">
            <h2 class="text-2xl font-bold text-white mb-1">Level 5 Master</h2>
            <p class="text-sm text-slate-400 mb-4">You are making great progress! Keep it up.</p>
            
            <div class="flex items-center justify-between text-sm mb-2">
              <span class="font-bold text-cyan-400">450 <span class="text-slate-500">/ 500 XP</span></span>
              <span class="text-slate-400 text-xs">50 XP to next level</span>
            </div>
            
            <!-- Custom Progress Bar for Neon Glow -->
            <div class="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div class="h-full bg-cyan-400 rounded-full shadow-[0_0_12px_#00DAFF] relative" style="width: 90%">
                <div class="absolute inset-0 bg-white/20 w-1/3 blur-sm animate-pulse rounded-full"></div>
              </div>
            </div>
            
          </div>
          <div class="flex-shrink-0 mt-4 md:mt-0">
             <UButton label="NEXT LESSON" size="lg" trailing-icon="i-lucide-arrow-right" class="shadow-[0_0_15px_rgba(0,218,255,0.4)] hover:shadow-[0_0_25px_rgba(0,218,255,0.6)] font-bold tracking-wider" />
          </div>
        </div>
        
        <!-- Background decorative blob -->
        <div class="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      </UCard>

      <!-- Streak Card -->
      <UCard class="bg-[#0A1220] border-slate-800 flex flex-col justify-center text-center ring-1 ring-slate-800 relative overflow-hidden group">
        <div class="mb-4 relative mx-auto w-16 h-16 flex items-center justify-center">
            <div class="absolute inset-0 bg-orange-500/20 rounded-full blur-xl group-hover:bg-orange-500/30 transition-all"></div>
            <UIcon name="i-lucide-flame" class="w-10 h-10 text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] relative z-10 animate-pulse" />
        </div>
        <h3 class="text-3xl font-black tracking-tight text-white mb-1">7 DAYS</h3>
        <p class="text-sm font-medium tracking-widest text-orange-500 uppercase">Active Streak</p>
      </UCard>

    </div>

    <!-- Modules Grid -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <UIcon name="i-lucide-layers" class="text-cyan-400" />
          Learning Modules
        </h3>
        <UButton variant="ghost" color="neutral" label="View All" trailing-icon="i-lucide-arrow-right" size="sm" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UCard v-for="(mod, i) in modules" :key="i" 
          class="bg-[#0A1220] border-slate-800 transition-all duration-300"
          :class="{
            'opacity-60 grayscale-[50%]': mod.locked,
            'ring-1 ring-cyan-500/50 shadow-[0_0_20px_rgba(0,218,255,0.1)] hover:shadow-[0_0_30px_rgba(0,218,255,0.2)] hover:-translate-y-1': !mod.locked && mod.progress > 0 && mod.progress < 100,
            'ring-1 ring-emerald-500/30': mod.progress === 100
          }">
          <div class="flex items-start justify-between mb-4">
            <div class="w-12 h-12 rounded-lg flex items-center justify-center"
              :class="{
                'bg-slate-800 text-slate-500': mod.locked,
                'bg-emerald-500/10 text-emerald-400': mod.progress === 100,
                'bg-cyan-500/10 text-cyan-400': !mod.locked && mod.progress < 100
              }">
              <UIcon :name="mod.locked ? 'i-lucide-lock' : mod.progress === 100 ? 'i-lucide-check-circle' : 'i-lucide-book-open'" class="w-6 h-6" />
            </div>
            
            <UBadge v-if="mod.progress === 100" color="green" variant="subtle" size="sm">Completed</UBadge>
            <UBadge v-else-if="mod.locked" color="neutral" variant="subtle" size="sm">Locked</UBadge>
            <UBadge v-else color="primary" variant="subtle" size="sm">In Progress</UBadge>
          </div>
          
          <h4 class="font-bold text-white mb-2">{{ mod.title }}</h4>
          <p class="text-sm text-slate-400 mb-6 line-clamp-2 h-10">{{ mod.description }}</p>
          
          <div class="space-y-2">
             <div class="flex justify-between text-xs font-medium">
               <span :class="mod.progress === 100 ? 'text-emerald-400' : 'text-slate-400'">Progress</span>
               <span :class="mod.progress === 100 ? 'text-emerald-400' : 'text-cyan-400'">{{ mod.progress }}%</span>
             </div>
             <div class="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all duration-1000"
                  :class="{
                    'bg-slate-600': mod.locked,
                    'bg-emerald-400 shadow-[0_0_8px_#34d399]': mod.progress === 100,
                    'bg-cyan-400 shadow-[0_0_8px_#00DAFF]': !mod.locked && mod.progress < 100
                  }"
                  :style="`width: ${mod.progress}%`">
                </div>
             </div>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Bottom Row: Recent Badges & Challenges -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <!-- Recent Badges -->
      <div class="md:col-span-1 border border-slate-800 bg-[#0A1220] rounded-xl p-5">
        <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Recent Badges</h3>
        <div class="flex flex-col gap-3">
          <div v-for="(badge, i) in recentBadges" :key="i" class="flex items-center gap-4 bg-[#050C16] p-3 rounded-lg border border-slate-800/50"
            :class="i === 0 ? 'ring-1 ring-cyan-500/30' : ''">
            <div class="w-10 h-10 rounded-full flex items-center justify-center bg-slate-800">
               <UIcon :name="badge.icon" class="w-5 h-5 drop-shadow-md" :class="`text-${badge.color}-400`" />
            </div>
            <span class="font-medium text-sm text-white">{{ badge.title }}</span>
            <div v-if="i === 0" class="ml-auto w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_5px_#00DAFF] animate-pulse"></div>
          </div>
        </div>
      </div>

      <!-- Challenges -->
      <div class="md:col-span-2">
         <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 flex items-center justify-between">
            Challenges
            <span class="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">2 Active</span>
         </h3>
         
         <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UCard v-for="(task, i) in challenges" :key="i" class="bg-[#0A1220] border-slate-800 ring-1 ring-slate-800 hover:ring-slate-700 transition-colors">
              <div class="flex items-start justify-between mb-2">
                 <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-target" class="text-cyan-500" />
                    <h4 class="font-bold text-white text-sm">{{ task.title }}</h4>
                 </div>
                 <UBadge color="neutral" variant="subtle" size="sm" class="text-[10px]">{{ task.remaining }}</UBadge>
              </div>
              
              <div class="flex justify-between items-end mt-4">
                 <div>
                    <span class="text-xs text-slate-400 block mb-1">Reward</span>
                    <span class="text-sm font-bold text-orange-400">{{ task.reward }}</span>
                 </div>
                 <div class="text-right">
                    <span class="text-xs text-slate-400 block mb-1">Progress</span>
                    <span class="text-sm font-bold text-white">{{ task.progress }} / {{ task.total }}</span>
                 </div>
              </div>
              
              <div class="h-1.5 w-full bg-slate-800 rounded-full mt-3 overflow-hidden">
                <div class="h-full bg-cyan-400 rounded-full shadow-[0_0_5px_#00DAFF]" :style="`width: ${(task.progress/task.total)*100}%`"></div>
              </div>
            </UCard>
         </div>
      </div>
    </div>
    
  </div>
</template>
