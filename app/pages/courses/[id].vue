<script setup lang="ts">
import { ref } from 'vue'

const route = useRoute()
const courseId = route.params.id

// Mock data based on the ID for presentation
const course = {
  id: courseId,
  title: 'Advanced Vue.js & Nuxt Architecture',
  description: 'Deep dive into reactive interfaces, state management, and SSR with Nuxt 3. Learn to build enterprise-grade applications from scratch with modern best practices.',
  icon: 'i-lucide-box',
  category: 'Web Development',
  lessons: 32,
  duration: '12h 00m',
  progress: 15,
  status: 'In Progress',
  level: 'Advanced',
  updates: 'Last updated 2 days ago',
  iconBg: 'bg-violet-500/10 dark:bg-violet-400/10',
  iconText: 'text-violet-700 dark:text-violet-400',
  instructor: {
    name: 'Sarah Chen',
    role: 'Senior Staff Engineer',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  }
}

const activeTab = ref('curriculum')

const tabs = [
  { label: 'Curriculum', key: 'curriculum', icon: 'i-lucide-list' },
  { label: 'Overview', key: 'overview', icon: 'i-lucide-info' },
  { label: 'Resources (4)', key: 'resources', icon: 'i-lucide-folder' },
  { label: 'Discussion', key: 'discussion', icon: 'i-lucide-message-circle' }
]

const modules = [
  {
    title: '1. Getting Started with Nuxt 3',
    duration: '1h 15m',
    lessons: [
      { title: 'Welcome to the Course', duration: '5:00', completed: true },
      { title: 'Project Structure & Setup', duration: '15:30', completed: true },
      { title: 'Understanding Auto-imports', duration: '12:45', completed: true },
      { title: 'Routing & Layouts', duration: '20:10', completed: false, active: true },
    ]
  },
  {
    title: '2. State Management & Data Fetching',
    duration: '2h 30m',
    lessons: [
      { title: 'Server vs Client Data Fetching', duration: '18:20', completed: false },
      { title: 'useFetch & useAsyncData', duration: '25:00', completed: false },
      { title: 'Global State Management', duration: '22:15', completed: false },
    ]
  },
  {
    title: '3. Advanced Patterns & Performance',
    duration: '3h 45m',
    lessons: [
      { title: 'Middleware & Route Rules', duration: '14:50', completed: false },
      { title: 'Server API Routes', duration: '30:00', completed: false },
      { title: 'Optimizing for Core Web Vitals', duration: '28:10', completed: false },
    ]
  }
]
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-6">
    <!-- Back Navigation -->
    <div class="mb-4">
      <NuxtLink to="/courses" class="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
        <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
        Back to Library
      </NuxtLink>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Main Content Area -->
      <div class="lg:col-span-2 space-y-8">
        
        <!-- Video Player Placeholder -->
        <div class="aspect-video bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden group shadow-lg flex items-center justify-center cursor-pointer">
          <!-- Abstract bg effect -->
          <div class="absolute inset-0 bg-gradient-to-br from-violet-900/40 to-slate-900 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
          
          <div class="relative z-10 flex flex-col items-center gap-4 transition-transform duration-500 group-hover:scale-110">
            <div class="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 shadow-xl">
              <UIcon name="i-lucide-play" class="w-10 h-10 text-white ml-2" />
            </div>
            <span class="font-bold text-white tracking-widest uppercase text-sm drop-shadow-md">Resume Lesson</span>
          </div>
          
          <!-- Bottom Controls Placeholder -->
          <div class="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/80 to-transparent flex items-end px-6 pb-4">
             <div class="w-full">
                <div class="flex items-center justify-between text-white text-xs font-semibold mb-2">
                   <span>Routing & Layouts</span>
                   <span>00:00 / 20:10</span>
                </div>
                <!-- Progress track -->
                <div class="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                   <div class="h-full bg-violet-500 w-0 relative">
                     <div class="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"></div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <!-- Course Header Info -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', course.iconBg]">
              <UIcon :name="course.icon" :class="['w-5 h-5', course.iconText]" />
            </div>
            <span class="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{{ course.category }}</span>
            <span class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
            <span class="text-sm font-medium text-slate-500 dark:text-slate-400">{{ course.level }}</span>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">{{ course.title }}</h1>
          <p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">{{ course.description }}</p>
        </div>

        <!-- Tabs Navigation -->
        <div class="flex gap-2 p-1 bg-slate-100 dark:bg-[#0A1220] rounded-xl border border-slate-200 dark:border-slate-800 w-fit overflow-x-auto max-w-full">
          <button 
            v-for="tab in tabs" 
            :key="tab.key"
            @click="activeTab = tab.key"
            :class="[
              'flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap',
              activeTab === tab.key 
                ? 'bg-white dark:bg-[#1A2332] text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-700' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            ]"
          >
            <UIcon :name="tab.icon" class="w-4 h-4" />
            {{ tab.label }}
          </button>
        </div>

        <!-- Curriculum Tab Content -->
        <div v-if="activeTab === 'curriculum'" class="space-y-4 animate-fade-in">
          <div v-for="(mod, index) in modules" :key="index" class="bg-white dark:bg-[#0A1220] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            
            <!-- Module Header -->
            <div class="p-6 bg-slate-50 dark:bg-slate-800/20 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
               <h3 class="font-bold text-slate-900 dark:text-white text-lg">{{ mod.title }}</h3>
               <span class="text-sm font-semibold text-slate-500">{{ mod.duration }}</span>
            </div>
            
            <!-- Lessons List -->
            <div class="p-2">
              <div 
                v-for="(lesson, lIdx) in mod.lessons" 
                :key="lIdx"
                :class="[
                  'flex items-center justify-between p-4 rounded-xl transition-colors cursor-pointer group',
                  lesson.active ? 'bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-800/50' : 'hover:bg-slate-50 dark:hover:bg-slate-800/30 border border-transparent'
                ]"
              >
                <div class="flex items-center gap-4">
                   <div 
                    :class="[
                      'w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors',
                      lesson.completed ? 'bg-emerald-50 border-emerald-500 dark:bg-emerald-500/10 dark:border-emerald-500/50' :
                      lesson.active ? 'bg-violet-50 border-violet-500 dark:bg-violet-500/10 dark:border-violet-500/50' :
                      'border-slate-300 dark:border-slate-700 text-slate-400'
                    ]"
                   >
                     <UIcon v-if="lesson.completed" name="i-lucide-check" class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                     <UIcon v-else-if="lesson.active" name="i-lucide-play" class="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 ml-0.5" />
                     <span v-else class="text-xs font-bold">{{ lIdx + 1 }}</span>
                   </div>
                   
                   <div>
                     <div :class="['font-medium', lesson.active ? 'text-violet-700 dark:text-violet-400 font-bold' : 'text-slate-700 dark:text-slate-300 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors']">
                       {{ lesson.title }}
                     </div>
                     <div v-if="lesson.active" class="text-xs text-violet-600 dark:text-violet-500 font-semibold mt-0.5">Playing Next</div>
                   </div>
                </div>
                
                <div class="text-sm font-medium text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                  {{ lesson.duration }}
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Placeholder for other tabs -->
        <div v-else class="p-12 text-center bg-white dark:bg-[#0A1220] border border-slate-200 dark:border-slate-800 rounded-2xl border-dashed">
          <UIcon name="i-lucide-construction" class="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Content Unavailable</h3>
          <p class="text-slate-500">This section is currently being updated by the instructor.</p>
        </div>

      </div>

      <!-- Right Sidebar Area -->
      <div class="lg:col-span-1 space-y-6">
        
        <!-- Action Card -->
        <UCard class="bg-white dark:bg-[#0A1220] border-slate-200 dark:border-slate-800 shadow-sm sticky top-24 ring-1 ring-slate-200 dark:ring-slate-800" :ui="{ body: 'p-6' }">
           
           <div v-if="course.progress > 0" class="mb-6">
             <div class="flex justify-between text-sm font-bold mb-2">
                <span class="text-slate-900 dark:text-white">Your Progress</span>
                <span class="text-violet-600 dark:text-violet-400">{{ course.progress }}%</span>
             </div>
             <UMeter :value="course.progress" size="md" color="primary" />
             <p class="text-xs text-slate-500 mt-2 text-center font-medium">You've completed 4 of {{ course.lessons }} lessons</p>
           </div>
           
           <UButton 
              block 
              size="lg" 
              color="primary" 
              variant="solid" 
              class="font-bold text-md mb-4"
           >
             {{ course.progress > 0 ? 'Resume Course' : 'Start Course Now' }}
           </UButton>

           <ul class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/50">
              <li class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <div class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-video" class="w-4 h-4 text-slate-500" />
                </div>
                <div><span class="font-bold">{{ course.duration }}</span> of on-demand video</div>
              </li>
              <li class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <div class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-file-text" class="w-4 h-4 text-slate-500" />
                </div>
                <div><span class="font-bold">{{ course.lessons }}</span> structured lessons</div>
              </li>
              <li class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <div class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-award" class="w-4 h-4 text-slate-500" />
                </div>
                <div>Certificate of completion</div>
              </li>
              <li class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <div class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-infinity" class="w-4 h-4 text-slate-500" />
                </div>
                <div>Full lifetime access</div>
              </li>
           </ul>
        </UCard>
        
        <!-- Instructor Card -->
        <UCard class="bg-white dark:bg-[#0A1220] border-slate-200 dark:border-slate-800 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800" :ui="{ body: 'p-6' }">
           <h3 class="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
             <UIcon name="i-lucide-graduation-cap" class="text-violet-600 dark:text-violet-500" /> Your Instructor
           </h3>
           <div class="flex items-center gap-4 mb-4">
             <UAvatar :src="course.instructor.avatar" :alt="course.instructor.name" size="lg" class="ring-2 ring-slate-100 dark:ring-slate-800" />
             <div>
               <div class="font-bold text-slate-900 dark:text-white">{{ course.instructor.name }}</div>
               <div class="text-xs font-semibold text-violet-600 dark:text-violet-500">{{ course.instructor.role }}</div>
             </div>
           </div>
           <p class="text-sm text-slate-500 leading-relaxed mb-4">
             Author of 5 bestselling courses. Specializes in scalable architecture and modern frontend frameworks. Active community mentor.
           </p>
           <UButton variant="soft" color="neutral" block size="sm" class="font-semibold">View Profile</UButton>
        </UCard>

      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
