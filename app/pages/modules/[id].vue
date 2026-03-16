<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const moduleId = route.params.id

// Mock data based on the structure provided in the image
const moduleData = {
  id: moduleId,
  title: moduleId === 'javascript-essentials' ? 'JavaScript Fundamentals' : 
         moduleId === 'html-css-basics' ? 'HTML / CSS Basics' : 'Advanced Vue.js',
  description: 'This module covers the core concepts of programming, javascript fundamentals, and advanced frontend techniques.',
  startDate: '15 février 2026',
  completedLessons: 3,
  totalLessons: 5,
  lessons: [
    { id: 1, title: 'Introduction aux variables', duration: '15 min', status: 'completed' },
    { id: 2, title: 'Les types de données', duration: '20 min', status: 'completed' },
    { id: 3, title: 'Les opérateurs', duration: '18 min', status: 'in_progress' },
    { id: 4, title: 'Les boucles et conditions', duration: '25 min', status: 'locked' },
    { id: 5, title: 'Les fonctions', duration: '30 min', status: 'locked' }
  ]
}

const progressPercentage = computed(() => {
  return Math.round((moduleData.completedLessons / moduleData.totalLessons) * 100)
})
</script>

<template>
  <div class="max-w-4xl mx-auto pb-12">
    <!-- Top Navigation -->
    <div class="mb-8 relative z-10">
      <NuxtLink to="/">
        <UButton 
          icon="i-lucide-arrow-left" 
          color="neutral" 
          variant="outline" 
          class="rounded-xl border-slate-700 hover:border-violet-500 hover:text-violet-400 text-slate-300 transition-colors bg-[#0A1220]/50 backdrop-blur"
        >
          Retour
        </UButton>
      </NuxtLink>
    </div>

    <!-- Module Header Section -->
    <div class="mb-12 relative">
      <div class="absolute -top-20 -left-20 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <p class="text-slate-500 font-medium mb-2 text-sm">Module Header Section</p>
      <h1 class="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">{{ moduleData.title }}</h1>
      <p class="text-lg text-slate-400 max-w-2xl leading-relaxed mb-8">
        {{ moduleData.description }}
      </p>

      <!-- Progress Section -->
      <div class="space-y-3">
        <div class="flex items-center justify-between text-base font-semibold">
          <span class="text-white">{{ moduleData.completedLessons }}/{{ moduleData.totalLessons }} leçons complétées</span>
          <span class="text-violet-400">{{ progressPercentage }}%</span>
        </div>
        
        <!-- Custom Progress Bar (Violet Theme) -->
        <div class="h-2 w-full bg-[#1A2536] rounded-full overflow-hidden border border-slate-800">
          <div 
            class="h-full bg-violet-500 rounded-full shadow-[0_0_12px_rgba(139,92,246,0.8)] relative" 
            :style="`width: ${progressPercentage}%`"
          >
            <!-- Highlight effect on the bar -->
            <div class="absolute inset-0 bg-white/20 w-1/3 blur-[2px] rounded-full"></div>
          </div>
        </div>
        
        <p class="text-xs font-medium text-slate-500 mt-2">
          Commencé le {{ moduleData.startDate }} <span class="text-slate-600">(optional)</span>
        </p>
      </div>
    </div>

    <!-- Main Content List -->
    <div>
      <h2 class="text-2xl font-bold text-white mb-6">Main Content</h2>
      
      <div class="space-y-4">
        <!-- Lesson Cards -->
        <div 
          v-for="(lesson, index) in moduleData.lessons" 
          :key="lesson.id"
          class="bg-[#0D1625] border border-slate-800 hover:border-violet-500/50 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-colors group"
        >
          <!-- Left Index Badge -->
          <div class="w-14 h-14 bg-[#141E30] rounded-xl flex items-center justify-center border border-slate-800 text-white font-bold text-lg shrink-0 group-hover:bg-violet-900/20 group-hover:border-violet-500/30 transition-colors">
            {{ String(index + 1).padStart(2, '0') }}
          </div>

          <!-- Lesson Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 text-slate-400 text-xs sm:text-sm font-medium mb-1">
              <span>Leçon {{ index + 1 }}</span>
              <UIcon name="i-lucide-clock" class="w-3.5 h-3.5" />
              <span>{{ lesson.duration }}</span>
            </div>
            <h3 class="text-white font-bold text-lg truncate">{{ lesson.title }}</h3>
          </div>

          <!-- Status & Action (Right Area) -->
          <div class="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 mt-2 sm:mt-0 w-full sm:w-auto">
            
            <!-- Status Badge -->
            <div v-if="lesson.status === 'completed'" class="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold">
              <UIcon name="i-lucide-check-circle-2" class="w-4 h-4" /> Complétée
            </div>
            
            <div v-else-if="lesson.status === 'in_progress'" class="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full text-sm font-semibold">
              <UIcon name="i-lucide-clock" class="w-4 h-4" /> En cours
            </div>
            
             <div v-else class="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 text-slate-500 rounded-full text-sm font-semibold">
              <UIcon name="i-lucide-lock" class="w-4 h-4" /> Verrouillé
            </div>

            <!-- Action Button -->
            <UButton 
              v-if="lesson.status === 'completed'"
              color="primary" 
              variant="soft" 
              class="w-full sm:w-28 justify-center font-bold"
              :to="`/lessons/${lesson.id}`"
            >
              Revoir
            </UButton>
            
            <UButton 
              v-else-if="lesson.status === 'in_progress'"
              color="primary" 
              variant="solid" 
              class="w-full sm:w-28 justify-center font-bold shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              :to="`/lessons/${lesson.id}`"
            >
              Continuer
            </UButton>
            
            <UButton 
              v-else
              color="neutral" 
              variant="ghost" 
              disabled
              class="w-full sm:w-28 justify-center opacity-50 font-bold"
            >
              Indisponible
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
