<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('All')

const categories = ['All', 'Web Development', 'Design', 'Data Science', 'Marketing']

const courses = [
  {
    id: 1,
    title: 'HTML & CSS Basics',
    description: 'Master the foundation of the web. Learn how to structure and style your websites.',
    icon: 'i-lucide-layout-template',
    category: 'Web Development',
    lessons: 12,
    duration: '4h 30m',
    progress: 100,
    status: 'Completed',
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-400/10',
    iconText: 'text-emerald-600 dark:text-emerald-400'
  },
  {
    id: 2,
    title: 'JavaScript Essentials',
    description: 'Learn core programming concepts, DOM manipulation, and modern ES6+ features.',
    icon: 'i-lucide-file-code-2',
    category: 'Web Development',
    lessons: 24,
    duration: '8h 15m',
    progress: 40,
    status: 'In Progress',
    iconBg: 'bg-violet-500/10 dark:bg-violet-400/10',
    iconText: 'text-violet-600 dark:text-violet-400'
  },
  {
    id: 3,
    title: 'Advanced Vue.js & Nuxt',
    description: 'Deep dive into reactive interfaces, state management, and SSR with Nuxt 3.',
    icon: 'i-lucide-box',
    category: 'Web Development',
    lessons: 32,
    duration: '12h 00m',
    progress: 0,
    status: 'Available',
    iconBg: 'bg-slate-500/10 dark:bg-slate-400/10',
    iconText: 'text-slate-600 dark:text-slate-400'
  },
  {
    id: 4,
    title: 'UI/UX Fundamentals',
    description: 'Understand user behavior, wireframing, and create stunning visual designs.',
    icon: 'i-lucide-pen-tool',
    category: 'Design',
    lessons: 18,
    duration: '6h 45m',
    progress: 0,
    status: 'Available',
    iconBg: 'bg-purple-500/10 dark:bg-purple-400/10',
    iconText: 'text-purple-600 dark:text-purple-400'
  },
  {
    id: 5,
    title: 'Python for Data Analysis',
    description: 'Analyze complex datasets using Pandas, NumPy, and create visualizations.',
    icon: 'i-lucide-bar-chart-3',
    category: 'Data Science',
    lessons: 40,
    duration: '15h 30m',
    progress: 15,
    status: 'In Progress',
    iconBg: 'bg-blue-500/10 dark:bg-blue-400/10',
    iconText: 'text-blue-600 dark:text-blue-400'
  },
  {
    id: 6,
    title: 'Digital Marketing Strategy',
    description: 'Learn SEO, SEM, content marketing, and how to measure your campaigns.',
    icon: 'i-lucide-megaphone',
    category: 'Marketing',
    lessons: 15,
    duration: '5h 20m',
    progress: 0,
    status: 'Available',
    iconBg: 'bg-orange-500/10 dark:bg-orange-400/10',
    iconText: 'text-orange-600 dark:text-orange-400'
  }
]
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-8">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white capitalize">Course Library</h1>
        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Explore our comprehensive catalog and start learning today.</p>
      </div>

      <!-- Search and Filters -->
      <div class="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
        <UInput
          v-model="searchQuery"
          icon="i-lucide-search"
          placeholder="Search courses..."
          class="w-full sm:w-64"
          size="lg"
          variant="outline"
        />
        <USelectMenu
          v-model="selectedCategory"
          :options="categories"
          class="w-full sm:w-48"
          size="lg"
          variant="outline"
        />
      </div>
    </div>

    <!-- Courses Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard 
        v-for="course in courses" 
        :key="course.id"
        class="flex flex-col h-full bg-white dark:bg-[#0A1220] border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow duration-300 relative group overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800"
        :ui="{ body: { padding: '', base: 'flex-1 flex flex-col p-6' } }"
      >
        <!-- Card Header -->
        <div class="flex justify-between items-start mb-4">
          <div :class="['h-12 w-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110', course.iconBg, course.iconText]">
            <UIcon :name="course.icon" class="w-6 h-6" />
          </div>
          <UBadge 
            :color="course.status === 'Completed' ? 'success' : course.status === 'In Progress' ? 'primary' : 'neutral'" 
            variant="subtle" 
            size="sm"
            class="capitalize font-medium"
          >
            {{ course.status }}
          </UBadge>
        </div>

        <!-- Card Content -->
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{{ course.category }}</span>
          </div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{{ course.title }}</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{{ course.description }}</p>
        </div>

        <!-- Card Footer (Progress & Meta) -->
        <div class="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/50 flex flex-col gap-4">
          
          <!-- Meta Info -->
          <div class="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
            <div class="flex items-center gap-1.5">
              <UIcon name="i-lucide-book-open" class="w-4 h-4" />
              <span>{{ course.lessons }} lessons</span>
            </div>
            <div class="flex items-center gap-1.5">
              <UIcon name="i-lucide-clock" class="w-4 h-4" />
              <span>{{ course.duration }}</span>
            </div>
          </div>

          <!-- Progress Bar or Action -->
          <div v-if="course.progress > 0" class="flex flex-col gap-2 mt-auto">
            <div class="flex justify-between text-xs font-semibold">
              <span :class="course.progress === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-violet-600 dark:text-violet-400'">
                Progress
              </span>
              <span class="text-slate-900 dark:text-white">{{ course.progress }}%</span>
            </div>
            <UMeter 
              :value="course.progress" 
              :color="course.progress === 100 ? 'success' : 'primary'" 
              size="sm" 
            />
          </div>
          <UButton 
            v-else
            block
            color="primary"
            variant="soft"
            class="mt-2 font-semibold tracking-wide dark:hover:bg-violet-400/20"
          >
            Start Course
          </UButton>
        </div>

        <!-- Hover glow effect (subtle) -> for premium feel -->
        <div class="absolute inset-0 border-2 border-transparent group-hover:border-violet-500/20 dark:group-hover:border-violet-400/20 rounded-xl transition-colors duration-300 pointer-events-none z-10"></div>
      </UCard>
    </div>
  </div>
</template>
