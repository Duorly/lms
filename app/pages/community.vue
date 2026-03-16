<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

const discussions = [
  {
    id: 1,
    title: 'How do you handle global state in Nuxt 3? Pinia vs useState?',
    author: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    timeAgo: '2 hours ago',
    replies: 14,
    upvotes: 32,
    tags: ['Vue.js', 'Nuxt 3', 'State Management'],
    isPinned: true
  },
  {
    id: 2,
    title: 'Showcase: Built a complete E-commerce dashboard in 48 hours',
    author: 'Michael Rodriguez',
    avatar: 'https://i.pravatar.cc/150?u=michael',
    timeAgo: '5 hours ago',
    replies: 8,
    upvotes: 45,
    tags: ['Showcase', 'Web Development'],
    isPinned: false
  },
  {
    id: 3,
    title: 'Stuck on the Advanced Algorithms quicksort challenge (Python)',
    author: 'Alex Rivera',
    avatar: 'https://i.pravatar.cc/150?u=alex',
    timeAgo: '1 day ago',
    replies: 3,
    upvotes: 12,
    tags: ['Data Science', 'Python', 'Algorithms'],
    isPinned: false
  },
  {
    id: 4,
    title: 'What are the best Figma plugins for UI/UX designers in 2024?',
    author: 'Emily Watson',
    avatar: 'https://i.pravatar.cc/150?u=emily',
    timeAgo: '2 days ago',
    replies: 24,
    upvotes: 89,
    tags: ['Design', 'Figma', 'Resources'],
    isPinned: false
  }
]

const trendingTags = [
  { name: 'Vue.js', count: 128 },
  { name: 'Python', count: 95 },
  { name: 'Showcase', count: 64 },
  { name: 'Career Advice', count: 42 },
  { name: 'Figma', count: 38 }
]

const topContributors = [
  { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?u=sarah', points: '14.2k', role: 'Mentor' },
  { name: 'David Kim', avatar: 'https://i.pravatar.cc/150?u=david', points: '12.8k', role: 'Pro' },
  { name: 'Emily Watson', avatar: 'https://i.pravatar.cc/150?u=emily', points: '10.5k', role: 'Pro' }
]
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800/50 mb-8">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white capitalize">Community Forum</h1>
        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Connect, share, and learn with thousands of developers worldwide.</p>
      </div>
      <div class="flex items-center gap-4">
        <UInput
          v-model="searchQuery"
          icon="i-lucide-search"
          placeholder="Search discussions..."
          class="w-full sm:w-64"
          variant="outline"
        />
        <UButton color="primary" variant="solid" icon="i-lucide-plus" class="font-bold">
          New Post
        </UButton>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Main Feed -->
      <div class="lg:col-span-8 flex flex-col gap-4">
        <div class="flex items-center justify-between mb-2">
           <h2 class="font-bold text-slate-900 dark:text-white">Recent Discussions</h2>
           <USelectMenu :options="['Latest', 'Top', 'Unanswered']" model-value="Latest" variant="ghost" color="neutral" size="sm" class="w-32" />
        </div>

        <UCard 
          v-for="post in discussions" 
          :key="post.id"
          class="bg-white dark:bg-[#0A1220] border-slate-200 dark:border-slate-800 shadow-sm hover:border-cyan-500/50 dark:hover:border-cyan-400/50 transition-colors duration-300 group cursor-pointer ring-1 ring-slate-200 dark:ring-slate-800"
          :ui="{ body: 'p-5' }"
        >
          <div class="flex gap-4 sm:gap-6">
            <!-- Upvotes (Desktop) -->
            <div class="hidden sm:flex flex-col items-center gap-1 min-w-[3rem]">
              <UButton icon="i-lucide-chevron-up" color="neutral" variant="ghost" class="text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400" />
              <span class="font-bold text-slate-700 dark:text-slate-300">{{ post.upvotes }}</span>
              <UButton icon="i-lucide-chevron-down" color="neutral" variant="ghost" class="text-slate-400 hover:text-red-600 dark:hover:text-red-500" />
            </div>

            <div class="flex-1">
              <!-- Meta Row -->
              <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                <UAvatar :src="post.avatar" :alt="post.author" size="2xs" />
                <span class="font-medium text-slate-700 dark:text-slate-300">{{ post.author }}</span>
                <span>•</span>
                <span>{{ post.timeAgo }}</span>
                <UBadge v-if="post.isPinned" color="warning" variant="subtle" size="xs" class="ml-2 scale-90">
                  <UIcon name="i-lucide-pin" class="w-3 h-3 mr-1" /> Pinned
                </UBadge>
              </div>

              <!-- Title -->
              <h3 class="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-3">
                {{ post.title }}
              </h3>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="tag in post.tags" :key="tag" class="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md">
                  {{ tag }}
                </span>
              </div>

              <!-- Mobile Upvotes & Replies -->
              <div class="flex items-center justify-between sm:justify-start sm:gap-6">
                <div class="flex sm:hidden items-center gap-2">
                   <UButton icon="i-lucide-arrow-up" color="neutral" variant="ghost" size="xs" class="text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400" />
                   <span class="text-sm font-bold">{{ post.upvotes }}</span>
                </div>
                <div class="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  <UIcon name="i-lucide-message-square" class="w-4 h-4" />
                  <span>{{ post.replies }} replies</span>
                </div>
              </div>
            </div>
          </div>
        </UCard>
        
        <UButton block variant="soft" color="neutral" class="mt-4">Load More Discussions</UButton>
      </div>

      <!-- Sidebar Container -->
      <div class="lg:col-span-4 flex flex-col gap-6 w-full max-w-sm mx-auto lg:mx-0">
        <!-- Top Contributors -->
        <UCard class="bg-white dark:bg-[#0A1220] border-slate-200 dark:border-slate-800 ring-1 ring-slate-200 dark:ring-slate-800" :ui="{ header: 'px-5 py-4', body: 'px-5 pb-5 pt-0' }">
          <template #header>
            <h3 class="font-bold flex items-center gap-2 text-slate-900 dark:text-white">
              <UIcon name="i-lucide-star" class="text-amber-500 dark:text-amber-400" /> Top Contributors
            </h3>
          </template>
          <div class="flex flex-col gap-4 mt-2">
            <div v-for="(contributor, index) in topContributors" :key="contributor.name" class="flex items-center gap-3">
               <div class="w-6 text-center text-sm font-bold text-slate-400">#{{ index + 1 }}</div>
               <UAvatar :src="contributor.avatar" :alt="contributor.name" size="sm" />
               <div class="flex-1 overflow-hidden">
                 <div class="font-semibold text-sm text-slate-900 dark:text-white truncate">{{ contributor.name }}</div>
                 <div class="text-xs text-slate-500 flex items-center gap-1">
                    <span :class="contributor.role === 'Mentor' ? 'text-amber-600 dark:text-amber-500' : 'text-cyan-600 dark:text-cyan-500'">{{ contributor.role }}</span>
                 </div>
               </div>
               <div class="text-sm font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                 {{ contributor.points }}
               </div>
            </div>
          </div>
        </UCard>

        <!-- Trending Tags -->
        <UCard class="bg-white dark:bg-[#0A1220] border-slate-200 dark:border-slate-800 ring-1 ring-slate-200 dark:ring-slate-800" :ui="{ header: 'px-5 py-4', body: 'px-5 pb-5 pt-0' }">
          <template #header>
            <h3 class="font-bold flex items-center gap-2 text-slate-900 dark:text-white">
              <UIcon name="i-lucide-trending-up" class="text-cyan-600 dark:text-cyan-500" /> Trending Topics
            </h3>
          </template>
          <div class="flex flex-wrap gap-2 mt-2">
            <div v-for="tag in trendingTags" :key="tag.name" class="flex items-center justify-between w-full p-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg cursor-pointer transition-colors group">
              <span class="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-500 transition-colors"># {{ tag.name }}</span>
              <span class="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{{ tag.count }}</span>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
