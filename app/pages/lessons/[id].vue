<script setup lang="ts">
import { ref, computed } from 'vue'

const route = useRoute()
const lessonId = route.params.id

// Expand/Collapse state for mobile sidebar
const isMobileMenuOpen = ref(false)

// Mock Data
const moduleData = {
  title: 'JavaScript Fundamentals',
  progress: 60,
  completedLessons: 3,
  totalLessons: 5,
}

// Current Lesson Mock
const currentLesson = {
  id: lessonId,
  title: 'Introduction aux variables',
  duration: '15 min',
  content: `
    <h2>Bienvenue dans votre première leçon !</h2>
    <p>Dans cette leçon, nous allons découvrir ce qu'est une variable et comment l'utiliser en JavaScript.</p>
    
    <h3>Qu'est-ce qu'une variable ?</h3>
    <p>Une variable est comme une boîte dans laquelle vous pouvez stocker des informations. Plutôt que de retenir une valeur (comme un nombre ou un texte), vous donnez un nom à cette boîte et vous pouvez la réutiliser partout dans votre code.</p>
    
    <div class="bg-slate-900 border border-slate-700 p-4 rounded-lg my-6 font-mono text-sm text-slate-300">
      <span class="text-violet-400">let</span> age = <span class="text-emerald-400">25</span>;
      <br>
      <span class="text-violet-400">const</span> prenom = <span class="text-amber-400">"Alice"</span>;
    </div>

    <p>Il existe trois mots-clés principaux pour déclarer des variables en JavaScript :</p>
    <ul class="list-disc pl-6 space-y-2 mt-4 mb-8">
      <li><strong>let</strong> : Pour les variables qui vont changer.</li>
      <li><strong>const</strong> : Pour les variables constantes (qui ne changent pas).</li>
      <li><strong>var</strong> : L'ancienne façon (à éviter aujourd'hui).</li>
    </ul>

    <h3>Conclusion</h3>
    <p>Vous savez maintenant déclarer des variables ! Prenez le temps d'expérimenter dans votre console avant de passer à la suite.</p>
  `,
  hasPrevious: false,
  hasNext: true,
  isCompleted: false
}

// Sidebar Menu Mock
const moduleLessons = [
  { id: '1', title: 'Introduction aux variables', duration: '15 min', status: 'active', isCurrent: true },
  { id: '2', title: 'Les types de données', duration: '20 min', status: 'completed', isCurrent: false },
  { id: '3', title: 'Les opérateurs', duration: '18 min', status: 'completed', isCurrent: false },
  { id: '4', title: 'Les boucles et conditions', duration: '25 min', status: 'locked', isCurrent: false },
  { id: '5', title: 'Les fonctions', duration: '30 min', status: 'locked', isCurrent: false }
]

const markAsCompleted = () => {
  currentLesson.isCompleted = true
}

const accordionItems = [{
  label: 'Menu du module',
  icon: 'i-lucide-list',
  defaultOpen: false,
  slot: 'menu'
}]
</script>

<template>
  <div class="max-w-7xl mx-auto pb-12">
    <!-- Mobile Back Button -->
    <div class="mb-6 lg:mb-8 block">
      <NuxtLink to="/modules/javascript-essentials">
        <UButton 
          icon="i-lucide-arrow-left" 
          color="neutral" 
          variant="ghost" 
          class="text-slate-400 hover:text-white"
        >
          Retour au module
        </UButton>
      </NuxtLink>
    </div>

    <!-- Main 70/30 Layout -->
    <div class="flex flex-col lg:flex-row gap-8">
      
      <!-- LEFT COLUMN (70%) -->
      <div class="lg:w-[70%] flex flex-col gap-8 order-2 lg:order-1">
        
        <!-- Lesson Header -->
        <div>
          <div class="flex items-center gap-2 text-slate-400 text-sm font-medium mb-3">
            <UIcon name="i-lucide-clock" class="w-4 h-4" />
            <span>{{ currentLesson.duration }} de lecture</span>
          </div>
          <h1 class="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {{ currentLesson.title }}
          </h1>
        </div>

        <!-- Lesson Content -->
        <div class="bg-[#0A1220] border border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl overflow-hidden relative">
          <!-- Background Glow Effect -->
          <div class="absolute -top-32 -right-32 w-64 h-64 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div 
            class="prose prose-invert prose-lg max-w-none text-slate-300
                   prose-headings:text-white prose-headings:font-bold
                   prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-8
                   prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
                   prose-p:leading-relaxed prose-p:mb-6
                   prose-a:text-violet-400 hover:prose-a:text-violet-300
                   prose-strong:text-white"
            v-html="currentLesson.content"
          >
          </div>
        </div>

        <!-- Bottom Navigation Actions -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-4 bg-[#050C16] p-4 border border-slate-800 rounded-2xl">
          
          <UButton 
            icon="i-lucide-arrow-left" 
            color="neutral" 
            variant="soft" 
            class="justify-center py-3 font-semibold sm:w-1/4"
            :disabled="!currentLesson.hasPrevious"
          >
            Précédent
          </UButton>

          <UButton 
            v-if="!currentLesson.isCompleted"
            icon="i-lucide-check-circle-2" 
            color="primary" 
            variant="solid" 
            class="justify-center py-3 font-bold text-base shadow-[0_0_15px_rgba(139,92,246,0.3)] sm:w-2/4"
            @click="markAsCompleted"
          >
            Marquer comme complétée
          </UButton>
          
          <UButton 
            v-else
            icon="i-lucide-check-check" 
            color="success" 
            variant="soft" 
            class="justify-center py-3 font-bold text-base bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 sm:w-2/4 cursor-default border border-emerald-500/20"
          >
            Leçon Complétée
          </UButton>

          <UButton 
            trailing-icon="i-lucide-arrow-right" 
            color="primary" 
            variant="outline" 
            class="justify-center py-3 font-semibold sm:w-1/4 border-slate-700 hover:border-violet-500 hover:bg-violet-500/10 text-white"
            :disabled="!currentLesson.hasNext"
          >
            Suivante
          </UButton>
        </div>

      </div>

      <!-- RIGHT COLUMN (30%) -->
      <div class="lg:w-[30%] order-1 lg:order-2">
        <div class="sticky top-24 space-y-6">
          
          <!-- Sticky Module Info Card -->
          <div class="bg-[#0A1220] border border-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 class="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Module</h3>
            <h2 class="text-lg font-bold text-white mb-4 line-clamp-2">{{ moduleData.title }}</h2>
            
            <div class="flex items-center justify-between text-xs font-semibold mb-2">
              <span class="text-slate-400">{{ moduleData.completedLessons }}/{{ moduleData.totalLessons }} leçons</span>
              <span class="text-violet-400">{{ moduleData.progress }}%</span>
            </div>
            <!-- Progress Bar -->
            <div class="h-1.5 w-full bg-[#1A2536] rounded-full overflow-hidden border border-slate-800">
              <div 
                class="h-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]" 
                :style="`width: ${moduleData.progress}%`"
              ></div>
            </div>
          </div>

          <!-- Mobile Accordion specific wrapper -->
          <div class="lg:hidden">
            <UAccordion :items="accordionItems" class="bg-[#0A1220] border border-slate-800 rounded-2xl overflow-hidden">
              <template #menu>
                <div class="px-5 pb-5">
                  <div class="space-y-2">
                    <NuxtLink 
                      v-for="lesson in moduleLessons" 
                      :key="lesson.id"
                      :to="lesson.status === 'locked' ? '#' : `/lessons/${lesson.id}`"
                      :class="[
                        'flex items-center justify-between p-3 rounded-xl transition-all',
                        lesson.isCurrent 
                          ? 'bg-violet-500/10 border border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.15)]' 
                          : 'hover:bg-slate-800/50 border border-transparent'
                      ]"
                    >
                      <div class="flex items-center gap-3">
                        <!-- Icon indicator -->
                        <div 
                          :class="[
                            'w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-colors',
                            lesson.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/30' :
                            lesson.isCurrent ? 'bg-violet-500/20 border-violet-500/50' :
                            'bg-slate-800 border-slate-700'
                          ]"
                        >
                          <UIcon v-if="lesson.status === 'completed'" name="i-lucide-check" class="w-4 h-4 text-emerald-400" />
                          <UIcon v-else-if="lesson.status === 'locked'" name="i-lucide-lock" class="w-4 h-4 text-slate-500" />
                          <UIcon v-else-if="lesson.isCurrent" name="i-lucide-play" class="w-4 h-4 text-violet-400 ml-0.5" />
                          <span v-else class="text-xs font-bold text-slate-400">{{ lesson.id }}</span>
                        </div>
                        
                        <!-- Title -->
                        <span 
                          :class="[
                            'text-sm font-medium line-clamp-2',
                            lesson.isCurrent ? 'text-violet-300 font-bold' :
                            lesson.status === 'locked' ? 'text-slate-500' : 'text-slate-300 group-hover:text-white'
                          ]"
                        >
                          {{ lesson.title }}
                        </span>
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </template>
            </UAccordion>
          </div>

          <!-- Desktop Sticky Menu Wrapper -->
          <div class="hidden lg:block bg-[#0A1220] border border-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 class="text-sm font-bold text-slate-400 mb-4 pb-2 border-b border-slate-800 flex items-center gap-2">
              <UIcon name="i-lucide-list" class="w-4 h-4" /> Sommaire du module
            </h3>
            <div class="space-y-2">
              <NuxtLink 
                v-for="lesson in moduleLessons" 
                :key="lesson.id"
                :to="lesson.status === 'locked' ? '#' : `/lessons/${lesson.id}`"
                :class="[
                  'flex items-center justify-between p-3 rounded-xl transition-all',
                  lesson.isCurrent 
                    ? 'bg-violet-500/10 border border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.15)]' 
                    : 'hover:bg-slate-800/50 border border-transparent cursor-pointer'
                ]"
              >
                <div class="flex items-center gap-3">
                  <!-- Icon indicator -->
                  <div 
                    :class="[
                      'w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-colors',
                      lesson.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/30' :
                      lesson.isCurrent ? 'bg-violet-500/20 border-violet-500/50' :
                      'bg-slate-800 border-slate-700'
                    ]"
                  >
                    <UIcon v-if="lesson.status === 'completed'" name="i-lucide-check" class="w-4 h-4 text-emerald-400" />
                    <UIcon v-else-if="lesson.status === 'locked'" name="i-lucide-lock" class="w-4 h-4 text-slate-500" />
                    <UIcon v-else-if="lesson.isCurrent" name="i-lucide-play" class="w-4 h-4 text-violet-400 ml-0.5" />
                    <span v-else class="text-xs font-bold text-slate-400">{{ lesson.id }}</span>
                  </div>
                  
                  <!-- Title -->
                  <span 
                    :class="[
                      'text-sm font-medium line-clamp-2',
                      lesson.isCurrent ? 'text-violet-300 font-bold' :
                      lesson.status === 'locked' ? 'text-slate-500' : 'text-slate-300 group-hover:text-white'
                    ]"
                  >
                    {{ lesson.title }}
                  </span>
                </div>
              </NuxtLink>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>
